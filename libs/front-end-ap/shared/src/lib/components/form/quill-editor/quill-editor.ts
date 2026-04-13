import {
  Component,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { map, merge, Subscription, tap } from 'rxjs';
import { QuillModule } from 'ngx-quill';
import QuillType from 'quill';
import { TooltipModule } from 'primeng/tooltip';
import { SpanLHBlot } from './span-lh-blots';

const allInternalImports = [
  'blots/block',
  'blots/break',
  'blots/container',
  'blots/cursor',
  'blots/inline',
  'blots/scroll',
  'blots/text',
  'attributors/attribute/direction',
  'attributors/class/align',
  'attributors/class/background',
  'attributors/class/color',
  'attributors/class/direction',
  'attributors/class/font',
  'attributors/class/size',
  'attributors/style/align',
  'attributors/style/background',
  'attributors/style/color',
  'attributors/style/direction',
  'attributors/style/font',
  'attributors/style/size',
  'formats/align',
  'formats/direction',
  'formats/indent',
  'formats/background',
  'formats/color',
  'formats/font',
  'formats/size',
  'formats/blockquote',
  'formats/code-block',
  'formats/code-block-container',
  'formats/header',
  'formats/list',
  'formats/list-container',
  'formats/bold',
  'formats/code',
  'formats/italic',
  'formats/link',
  'formats/script',
  'formats/strike',
  'formats/underline',
  'formats/formula',
  'formats/image',
  'formats/code-token',
  'formats/table',
  'formats/table-row',
  'formats/table-body',
  'formats/table-container',
];
const allInternals: any[] = allInternalImports.map((el: string) =>
  QuillType.import(el),
);
const Parchment = QuillType.import('parchment');

const fontWeightConfig = {
  scope: Parchment.Scope.INLINE,
  whitelist: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
};

const fontWeightClass = new Parchment.ClassAttributor(
  'fontweight',
  'ql-font-weight',
  fontWeightConfig,
);
const fontWeightStyle = new Parchment.StyleAttributor(
  'fontweight',
  'font-weight',
  fontWeightConfig,
);

// const fontSizeRange = new Array(90).fill('px').map((item, i) => `${i}${item}`);
const fontSizeRange = [
  8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72,
].map((el) => `${el}px`);
const fontSizeConfig = {
  scope: Parchment.Scope.INLINE,
  whitelist: ['small', 'normal', 'large', 'huge', ...fontSizeRange],
};
const fontSizeStyle = new Parchment.StyleAttributor(
  'size',
  'font-size',
  fontSizeConfig,
);

const registry = new Parchment.Registry();
registry.register(
  ...allInternals,
  fontWeightClass,
  fontWeightStyle,
  fontSizeStyle,
  SpanLHBlot as any,
);

/**
 * `!!!` All text (HTML) typed in the editor is changed and emited to parent form in the method `registerOnChange`
 */
@Component({
  selector: 'lib-quill-editor',
  imports: [QuillModule, ReactiveFormsModule, TooltipModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: QuillEditor,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: QuillEditor,
    },
  ],
  templateUrl: './quill-editor.html',
  styleUrl: './quill-editor.css',
})
export class QuillEditor implements ControlValueAccessor, Validator, OnDestroy {
  nameStart = input.required<string>();
  quillStyle = input({ minHeight: '80px' });
  fieldEditor = new FormControl<string>('');
  fontSizeControl = new FormControl<number | null>(null);
  lineHeightControl = new FormControl<number | null>(null);

  defaultColors = [
    '#000000',
    '#e60000',
    '#ff9900',
    '#ffff00',
    '#008a00',
    '#0066cc',
    '#9933ff',
    '#ffffff',
    '#facccc',
    '#ffebcc',
    '#ffffcc',
    '#cce8cc',
    '#cce0f5',
    '#ebd6ff',
    '#bbbbbb',
    '#f06666',
    '#ffc266',
    '#ffff66',
    '#66b966',
    '#66a3e0',
    '#c285ff',
    '#888888',
    '#a10000',
    '#b26b00',
    '#b2b200',
    '#006100',
    '#0047b2',
    '#6b24b2',
    '#444444',
    '#5c0000',
    '#663d00',
    '#666600',
    '#003700',
    '#002966',
    '#3d1466',
  ];
  customColors = [];
  fontWeights = fontWeightConfig.whitelist;
  allColors = this.defaultColors.concat(this.customColors);
  textCustomColors = [];
  allTextColors = this.defaultColors.concat(this.textCustomColors);
  fontSizeRange = fontSizeRange;
  lineHeightRange = [];
  defaultFontSize = '16px';
  quillEditor: QuillType | null = null;
  registry = registry;
  editorOptions = {
    placeholder: 'Write your text here...',
    modules: {
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'code-block'],

          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
          [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
          [{ direction: 'rtl' }], // text direction

          // custom dropdown
          [{ size: ['small', false, 'large', 'huge', ...fontSizeRange] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: this.allTextColors }, { background: this.allColors }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],

          ['clean'], // remove formatting button
          ['link', 'image', 'video'],
          ['spanHighlighted'],
        ],
      },
      clipboard: {
        matchVisual: false,
      },
    },
    customOptions: [
      {
        import: 'attributors/style/size',
        whitelist: fontSizeRange,
      },
    ],
  };

  onEditorCreated = (editor: QuillType) => {
    this.quillEditor = editor;
    this.addSizeHandler(editor);
    this.addLineHeightHandler(editor);
  };

  addSizeHandler = (editor: QuillType) => {
    const toolbar: any = editor.getModule('toolbar');
    toolbar?.addHandler('size', this.onToolbarSizeChange);
  };

  onToolbarSizeChange = (e: string) => {
    this.quillEditor?.format('size', e);
    this.setFontSizeControl(e);
  };

  onFontSizeChange = (event: Event): boolean => {
    if (this.quillEditor) {
      this.quillEditor.format(
        'size',
        `${(event.target as HTMLInputElement).value}px`,
      );
    }
    return false;
  };

  onFontSizeKeyDown = (event: KeyboardEvent): boolean | void => {
    if ((event as KeyboardEvent).code === 'Enter') {
      return false;
    }
  };

  setFontSizeControl = (value: string) => {
    if (!value || value === `${this.fontSizeControl}px`) {
      return;
    }
    this.fontSizeControl.setValue(+value.replace('px', ''));
  };

  addLineHeightHandler = (editor: QuillType) => {
    const toolbar: any = editor.getModule('toolbar');
    toolbar?.addHandler('spanLineHeight', this.onToolbarLineHeightChange);
  };

  onToolbarLineHeightChange = (e: string) => {
    if (!this.quillEditor) {
      return;
    }
    this.quillEditor.format('spanLineHeight', e);
    this.setLineHeightControl(e);
  };

  onLineHeightChange = (event: Event): boolean => {
    if (this.quillEditor) {
      this.quillEditor.format(
        'spanLineHeight',
        `${(event.target as HTMLInputElement).value}px`,
      );
    }
    return false;
  };

  onLineHeightKeyDown = (event: KeyboardEvent): boolean | void => {
    if ((event as KeyboardEvent).code === 'Enter') {
      return false;
    }
  };

  setLineHeightControl = (value: string) => {
    if (!value || value === `${this.lineHeightControl}px`) {
      return;
    }
    this.lineHeightControl.setValue(+value.replace('px', ''));
  };

  onColorChanged = (color: string) => {
    if (this.quillEditor) {
      this.quillEditor.format('background', color);
    }
    return false;
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};

  onChangeSubs: Subscription[] = [];

  touched = signal(false);

  ngOnDestroy() {
    for (const sub of this.onChangeSubs) {
      sub.unsubscribe();
    }
  }

  // ************* ControlValueAccessor implementation *************
  writeValue(value: any) {
    this.fieldEditor?.setValue(value || '');
  }

  registerOnChange(onChange: any) {
    const sub = this.fieldEditor.valueChanges
      .pipe(
        map((value) =>
          value?.replace(/&nbsp;/g, ' ')?.replace(/<p><\/p>/g, '<p><br /></p>'),
        ),
      )
      .subscribe(onChange);
    this.onChangeSubs.push(sub);
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched; // then use onTouched on every control for (blur) event
  }

  setDisabledState(disabled: boolean) {
    if (disabled) {
      this.fieldEditor.disable();
    } else {
      this.fieldEditor.enable();
    }
  }

  // ************* Validator implementation *************
  validate(control: AbstractControl) {
    if (this.fieldEditor.valid) {
      return null;
    }

    return this.fieldEditor.errors || {};
  }
}
