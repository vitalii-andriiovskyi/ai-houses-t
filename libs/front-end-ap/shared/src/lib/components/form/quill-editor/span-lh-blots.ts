import QuillType from 'quill';

const Inline: any = QuillType.import('blots/inline');

export class SpanLHBlot extends Inline {
  static create(value: any) {
    const node = super.create();
    if (value) {
      node.style.lineHeight = value;
    }
    return node;
  }

  static formats(node: any) {
    // We will only be called with a node already
    // determined to be a Link blot, so we do
    // not need to check ourselves
    return node.style.lineHeight;
  }

  static value(node: any) {
    return node.style.lineHeight;
  }

  format(name: string, value: any) {
    if (name === 'spanLineHeight') {
      if (value) {
        this['domNode'].style.lineHeight = value;
      } else {
        this['domNode'].style.lineHeight = '';
      }
    }
    super.format(name, value);
  }
}
SpanLHBlot['blotName'] = 'spanLineHeight';
SpanLHBlot['tagName'] = 'span';
// SpanFWBlot['className'] = 'ql-spanLineHeight';
