import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  InjectionToken,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  Button,
  ButtonModule,
  ButtonPassThrough,
  ButtonStyle,
} from 'primeng/button';
import { Bind } from 'primeng/bind';
import { PARENT_INSTANCE } from 'primeng/basecomponent';

const BUTTON_INSTANCE = new InjectionToken<Button>('BUTTON_INSTANCE');

const CUSTOM_VARIANTS: Record<string, string> = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  ACCENT: 'accent',
  REGULAR: 'regular',
};

// every prop in [CUSTOM_VARIANTS['KEY']] is one of the Button component props
const CUSTOM_VARIANTS_PROPS = {
  [CUSTOM_VARIANTS['PRIMARY']]: {
    pt: {
      root: 'ring-offset-background focus-visible:ring-ring focus-visible:ring-offset-primary-900 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground cta from-primary-500 to-primary-700 transition-400 hover:from-primary-700 hover:to-primary-500 outline-primary-700 focus:from-primary-700 focus:to-primary-500 relative inline-flex h-12 min-w-[240px] items-center justify-center rounded-full bg-linear-to-br px-6 shadow-xl shadow-black/50 outline-2 outline-offset-2 transition-colors duration-300 hover:cursor-pointer hover:bg-linear-to-tr hover:shadow-xl hover:shadow-black/30 focus:bg-linear-to-tr focus:shadow-black/30 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 md:h-14 md:min-w-[260px]',
      label:
        'font-primary text-primary-foreground text-[22px] font-bold tracking-wide uppercase md:text-[26px]',
    },
  },
  [CUSTOM_VARIANTS['SECONDARY']]: {
    variant: 'outlined',
    size: 'small',
    styleClass:
      'font-primary text-primary-700 border-primary-700 bg-primary-100/40 h-9 rounded-lg border-1 px-2 py-0 text-lg font-normal hover:cursor-pointer md:h-10 md:text-2xl',
  },
  [CUSTOM_VARIANTS['REGULAR']]: {
    pt: {
      root: 'inline-flex gap-2 items-center justify-center flex-row-reverse bg-linear-to-br from-primary to-primary-700 rounded-full hover:bg-linear-to-tr focus:bg-linear-to-tr transition-400 hover:from-primary-700 hover:to-primary outline-primary-700 outline-offset-2 outline-2 focus:from-primary-700 focus:to-primary h-10 md:h-12 px-6 min-w-[160px] md:min-w-[180px] hover:cursor-pointer text-primary-foreground hover:disabled:cursor-not-allowed disabled:opacity-50',
      label:
        'font-primary text-primary-foreground uppercase font-bold tracking-wide text-[22px] md:text-[26px]',
    },
  },
};
/**
 * It recreates the Button component from PrimeNG with the same input props, outputs. It adds some custom variants (prop: `variantCustom`),
 * and the ability to use it as a link with `routerLink` prop.
 * Examples of usage:
 *
 *  1. As Button Link
 *  ```html
 *    <lib-custom-button
 *      label="Explore AI Houses"
 *      [routerLink]="'/ai-houses'"
 *    ></lib-custom-button>
 * ```
 *  ```html
 *    <lib-custom-button
 *      class="mt-5"
 *      variantCustom="primary"
 *      routerLink="https://angular.io"
 *      target="_blank"
 *      rel="noopener noreferrer"
 *    >Explore Now</lib-custom-button
 * ```
 * 2. As Primary Custom Button
 * ```html
 *    <lib-custom-button
 *      label="Upload Custom:)"
 *      variantCustom="primary"
 *    ></lib-custom-button>
 * ```
 * 3. As Secondary Custom Button
 * ```html
 *    <lib-custom-button variantCustom="secondary">
 *      <span>Hello, Sign in:)</span>
 *    </lib-custom-button>
 * ```
 */
@Component({
  selector: 'lib-custom-button',
  imports: [NgTemplateOutlet, ButtonModule, Bind, RouterLink],
  templateUrl: './custom-button.html',
  styleUrl: './custom-button.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    ButtonStyle,
    { provide: BUTTON_INSTANCE, useExisting: Button },
    { provide: PARENT_INSTANCE, useExisting: Button },
  ],
})
export class CustomButton extends Button {
  routerLink = input<string>(); // `routerLink` has to be the full route path without domain of course
  innerContent = contentChild('innerContent'); // always undefined | cannot remove bug when there's html passed and label is not empty
  variantCustom = input<'primary' | 'secondary' | 'accent' | 'regular'>();
  isUnstyled = computed(
    () =>
      this.unstyled() ||
      [CUSTOM_VARIANTS['PRIMARY'], CUSTOM_VARIANTS['REGULAR']].some(
        (el: string) => this.variantCustom() === el,
      ),
  );
  clabel = computed(() => (this.innerContent() ? '' : this.label));
  cbadge = computed(() => (this.innerContent() ? '' : this.badge));
  cpt = computed<ButtonPassThrough>(
    () => CUSTOM_VARIANTS_PROPS[this.variantCustom() || '']?.pt || this.pt(),
  );
  cptLabel = computed(() => ({
    root: (this.cpt() as unknown as { label?: string })?.label || '',
  }));
  cvariant = computed(
    () =>
      (CUSTOM_VARIANTS_PROPS[this.variantCustom() || '']?.variant as
        | 'outlined'
        | 'text'
        | undefined) || this.variant,
  );
  csize = computed(
    () =>
      (CUSTOM_VARIANTS_PROPS[this.variantCustom() || '']?.size as
        | 'small'
        | 'large'
        | undefined) || this.size,
  );
  cstyleClass = computed(
    () =>
      `${CUSTOM_VARIANTS_PROPS[this.variantCustom() || '']?.styleClass || ''} ${this.styleClass || ''}`,
  );
  target = input<string>();
  rel = input<string>();

  constructor() {
    super();
    // effect(() => {
    //   console.log("Feature: ",
    //     this.innerContent());
    // });
  }

  onClickFn = (event: MouseEvent): boolean | void => {
    this.onClick.emit(event);
  };
  onFocusFn = (event: FocusEvent) => {
    this.onFocus.emit(event);
  };
  onBlurFn = (event: FocusEvent) => {
    this.onBlur.emit(event);
  };

  protected isExternalLink(str?: string): boolean {
    if (!str) return false;
    return /^(http|https):/.test(str);
  }
}
