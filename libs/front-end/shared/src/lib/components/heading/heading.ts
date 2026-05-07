import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type HeadingVariant = 'primary' | 'secondary' | 'tertiary';
export type HeadingSize = 'lg' | 'md' | 'sm';
export type HeadingTag = 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

@Component({
  selector: 'lib-heading',
  imports: [NgTemplateOutlet],
  templateUrl: './heading.html',
  styleUrl: './heading.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Heading {
  variant = input<HeadingVariant>('primary');
  size = input<HeadingSize>('lg');
  tagName = input<HeadingTag>('h2');

  protected readonly _variantClasses = computed(() => {
    const variantMap: Record<HeadingVariant, string> = {
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      tertiary: 'bg-white text-black',
    };
    const sizeMap: Record<HeadingSize, string> = {
      lg: 'leading-[1.28] text-[2.25rem] xl:text-[2.5rem]',
      md: 'leading-[1.27] text-[1.625rem] xl:text-[1.875rem]',
      sm: 'leading-[1.5] text-[1.25rem] xl:text-[1.5rem]',
    };
    return `w-fit px-[7px] inline box-decoration-clone rounded-[7px] ${variantMap[this.variant()]} ${sizeMap[this.size()]}`.trim();
  });
}
