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

import { ArrowRightUp } from '../svgs/arrow-right-up/arrow-right-up';

const BUTTON_INSTANCE = new InjectionToken<Button>('BUTTON_INSTANCE');

const CUSTOM_VARIANTS: Record<string, string> = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  ACCENT: 'accent',
  REGULAR: 'regular',
  LINK_PRIMARY: 'linkPrimary',
  LINK_SECONDARY: 'linkSecondary',
  LINK_TERTIARY: 'linkTertiary',
  LINK_PRIMARY_FULL: 'linkPrimaryFull',
  LINK_PRIMARY_FULL_ACCENT: 'linkPrimaryFullAccent',
  LINK_SECONDARY_FULL: 'linkSecondaryFull',
  LINK_SECONDARY_FULL_LIGHT: 'linkSecondaryFullLight',
  LINK_TERTIARY_FULL: 'linkTertiaryFull',
  LINK_TERTIARY_FULL_ACCENT: 'linkTertiaryFullAccent',
};

const CUSTOM_VARIANTS_PROPS: { [key in keyof typeof CUSTOM_VARIANTS]?: any } = {
  [CUSTOM_VARIANTS['PRIMARY']]: {
    pt: {
      root: 'inline-flex items-center justify-center rounded-[10px] md:rounded-[14px] bg-primary h-[50px] md:h-[68px] px-3 py-1 md:px-5 md:py-3 transition-colors duration-300 hover:cursor-pointer disabled:pointer-events-none disabled:opacity-50 font-primary text-[20px] leading-7 font-normal text-primary-foreground text-center whitespace-nowrap hover:bg-primary-700 focus:bg-primary-700',
      label:
        'font-primary md:text-[1.25rem] leading-7 font-normal text-primary-foreground text-center whitespace-nowrap',
    },
  },
  [CUSTOM_VARIANTS['SECONDARY']]: {
    pt: {
      root: 'inline-flex items-center justify-center rounded-[10px] md:rounded-[14px] bg-secondary h-[50px] md:h-[68px] px-3 py-1 md:px-5 md:py-3 transition-colors duration-300 hover:cursor-pointer disabled:pointer-events-none disabled:opacity-50 font-primary text-[20px] leading-7 font-normal text-secondary-foreground text-center whitespace-nowrap hover:bg-secondary-600 focus:bg-secondary-600',
      label:
        'font-primary md:text-[1.25rem] leading-7 font-normal text-secondary-foreground text-center whitespace-nowrap',
    },
  },
  [CUSTOM_VARIANTS['TERTIARY']]: {
    pt: {
      root: 'inline-flex items-center justify-center rounded-[10px] md:rounded-[14px] border border-primary bg-tertiary h-[50px] md:h-[68px] px-3 py-1 md:px-5 md:py-3 transition-colors duration-300 hover:cursor-pointer disabled:pointer-events-none disabled:opacity-50 font-primary text-[20px] leading-7 font-normal text-tertiary-foreground text-center whitespace-nowrap hover:bg-tertiary-600 focus:bg-tertiary-600',
      label:
        'font-primary md:text-[1.25rem] leading-7 font-normal text-tertiary-foreground text-center whitespace-nowrap',
    },
  },
  [CUSTOM_VARIANTS['REGULAR']]: {
    pt: {
      root: 'inline-flex gap-2 items-center justify-center flex-row-reverse bg-linear-to-br from-primary to-primary-700 rounded-full hover:bg-linear-to-tr focus:bg-linear-to-tr transition-400 hover:from-primary-700 hover:to-primary outline-primary-700 outline-offset-2 outline-2 focus:from-primary-700 focus:to-primary h-10 md:h-12 px-6 min-w-[160px] md:min-w-[180px] hover:cursor-pointer text-primary-foreground hover:disabled:cursor-not-allowed disabled:opacity-50',
      label:
        'font-primary text-primary-foreground uppercase font-bold tracking-wide text-[22px] md:text-[26px]',
    },
  },
  // Links
  [CUSTOM_VARIANTS['LINK_PRIMARY']]: {
    variant: 'text',
    text: 'text',
    styleClass:
      'inline-flex hover:bg-transparent focus:bg-transparent flex-row-reverse items-center gap-[15px] p-0 font-primary text-[20px] leading-7 [&_.p-button-label]:font-normal text-primary hover:cursor-pointer underline decoration-transparent hover:decoration-primary underline-offset-4 transition-all duration-300',
    iconStyleClass: 'text-tertiary-foreground',
    iconPos: 'right',
  },
  [CUSTOM_VARIANTS['LINK_SECONDARY']]: {
    variant: 'text',
    text: 'text',
    styleClass:
      'inline-flex hover:bg-transparent focus:bg-transparent flex-row-reverse items-center gap-[15px] p-0 font-primary text-[20px] leading-7 [&_.p-button-label]:font-normal text-secondary hover:cursor-pointer underline decoration-transparent hover:decoration-secondary underline-offset-4 transition-all duration-300',
    iconStyleClass: 'text-secondary',
    iconPos: 'right',
  },
  [CUSTOM_VARIANTS['LINK_TERTIARY']]: {
    variant: 'text',
    text: 'text',
    styleClass:
      'inline-flex hover:bg-transparent focus:bg-transparent flex-row-reverse items-center gap-[15px] p-0 font-primary text-[20px] leading-7 [&_.p-button-label]:font-normal text-primary-foreground hover:cursor-pointer underline decoration-transparent hover:decoration-primary-foreground underline-offset-4 transition-all duration-300',
    iconStyleClass: 'text-primary-foreground',
    iconPos: 'right',
  },
  [CUSTOM_VARIANTS['LINK_PRIMARY_FULL']]: {
    variant: 'text',
    text: 'text',
    styleClass:
      'inline-flex hover:bg-transparent focus:bg-transparent min-h-[41px] items-center gap-[15px] p-0 font-primary text-[20px] leading-7 font-normal [&_.p-button-label]:font-normal text-tertiary-foreground hover:cursor-pointer underline hover:underline decoration-transparent hover:decoration-tertiary-foreground underline-offset-4 transition-all duration-300',
    iconStyleClass:
      'inline-flex h-[41px] w-[41px] items-center justify-center rounded-full bg-primary text-[20px] text-primary-foreground',
  },
  [CUSTOM_VARIANTS['LINK_PRIMARY_FULL_ACCENT']]: {
    variant: 'text',
    text: 'text',
    styleClass:
      'inline-flex hover:bg-transparent focus:bg-transparent min-h-[41px] items-center gap-[15px] p-0 font-primary text-[20px] leading-7 font-normal [&_.p-button-label]:font-normal text-tertiary-foreground hover:cursor-pointer underline hover:underline decoration-transparent hover:decoration-tertiary-foreground underline-offset-4 transition-all duration-300',
    iconStyleClass:
      'inline-flex h-[41px] w-[41px] items-center justify-center rounded-full bg-primary text-[20px] text-secondary',
  },
  [CUSTOM_VARIANTS['LINK_SECONDARY_FULL']]: {
    variant: 'text',
    text: 'text',

    styleClass:
      'inline-flex hover:bg-transparent focus:bg-transparent min-h-[41px] items-center gap-[15px] p-0 font-primary text-[20px] leading-7 font-normal [&_.p-button-label]:font-normal text-tertiary-foreground hover:cursor-pointer underline hover:underline decoration-transparent hover:decoration-tertiary-foreground underline-offset-4 transition-all duration-300',
    iconStyleClass:
      'inline-flex h-[41px] w-[41px] items-center justify-center rounded-full bg-secondary text-[20px] text-tertiary-foreground',
  },
  [CUSTOM_VARIANTS['LINK_SECONDARY_FULL_LIGHT']]: {
    variant: 'text',
    text: 'text',
    styleClass:
      'inline-flex hover:bg-transparent focus:bg-transparent min-h-[41px] items-center gap-[15px] p-0 font-primary text-[20px] leading-7 font-normal [&_.p-button-label]:font-normal text-primary-foreground hover:cursor-pointer underline hover:underline decoration-transparent hover:decoration-primary-foreground underline-offset-4 transition-all duration-300',
    iconStyleClass:
      'inline-flex h-[41px] w-[41px] items-center justify-center rounded-full bg-secondary text-[20px] text-primary-foreground',
  },
  [CUSTOM_VARIANTS['LINK_TERTIARY_FULL']]: {
    variant: 'text',
    text: 'text',
    styleClass:
      'inline-flex hover:bg-transparent focus:bg-transparent min-h-[41px] items-center gap-[15px] p-0 font-primary text-[20px] leading-7 font-normal [&_.p-button-label]:font-normal text-primary-foreground hover:cursor-pointer underline hover:underline decoration-transparent hover:decoration-primary-foreground underline-offset-4 transition-all duration-300',
    iconStyleClass:
      'inline-flex h-[41px] w-[41px] items-center justify-center rounded-full bg-primary-foreground text-[20px] text-tertiary-foreground',
  },
  [CUSTOM_VARIANTS['LINK_TERTIARY_FULL_ACCENT']]: {
    variant: 'text',
    text: 'text',
    styleClass:
      'inline-flex hover:bg-transparent focus:bg-transparent min-h-[41px] items-center gap-[15px] p-0 font-primary text-[20px] leading-7 font-normal [&_.p-button-label]:font-normal text-primary-foreground hover:cursor-pointer underline hover:underline decoration-transparent hover:decoration-primary-foreground underline-offset-4 transition-all duration-300',
    iconStyleClass:
      'inline-flex h-[41px] w-[41px] items-center justify-center rounded-full bg-primary-foreground text-[20px] text-secondary',
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
  imports: [NgTemplateOutlet, ButtonModule, Bind, RouterLink, ArrowRightUp],
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
  routerLink = input<string | any[]>(); // `routerLink` has to be the full route path without domain of course
  innerContent = contentChild('innerContent'); // always undefined | cannot remove bug when there's html passed and label is not empty
  variantCustom = input<keyof typeof CUSTOM_VARIANTS>();
  isUnstyled = computed(
    () =>
      this.unstyled() ||
      [
        CUSTOM_VARIANTS['PRIMARY'],
        CUSTOM_VARIANTS['REGULAR'],
        CUSTOM_VARIANTS['TERTIARY'],
      ].some((el: keyof typeof CUSTOM_VARIANTS) => this.variantCustom() === el),
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
      CUSTOM_VARIANTS_PROPS[this.variantCustom() || '']?.variant ||
      this.variant,
  );
  ctext = computed(
    () => CUSTOM_VARIANTS_PROPS[this.variantCustom() || '']?.text || this.text,
  );
  csize = computed(
    () => CUSTOM_VARIANTS_PROPS[this.variantCustom() || '']?.size || this.size,
  );
  cstyleClass = computed(
    () =>
      `${CUSTOM_VARIANTS_PROPS[this.variantCustom() || '']?.styleClass || ''} ${this.styleClass || ''}`,
  );
  cIconStyleClass = computed(
    () =>
      CUSTOM_VARIANTS_PROPS[this.variantCustom() || '']?.iconStyleClass || '',
  );
  target = input<string>();
  rel = input<string>();
  isCustomLink = computed(() =>
    [
      CUSTOM_VARIANTS['LINK_PRIMARY'],
      CUSTOM_VARIANTS['LINK_SECONDARY'],
      CUSTOM_VARIANTS['LINK_TERTIARY'],
      CUSTOM_VARIANTS['LINK_PRIMARY_FULL'],
      CUSTOM_VARIANTS['LINK_PRIMARY_FULL_ACCENT'],
      CUSTOM_VARIANTS['LINK_SECONDARY_FULL'],
      CUSTOM_VARIANTS['LINK_SECONDARY_FULL_LIGHT'],
      CUSTOM_VARIANTS['LINK_TERTIARY_FULL'],
      CUSTOM_VARIANTS['LINK_TERTIARY_FULL_ACCENT'],
    ].some((el: keyof typeof CUSTOM_VARIANTS) => this.variantCustom() === el),
  );

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

  protected isExternalLink(str?: string | any[]): boolean {
    if (!str) return false;
    if (Array.isArray(str)) return false;
    return /^(http|https):/.test(str);
  }
}
