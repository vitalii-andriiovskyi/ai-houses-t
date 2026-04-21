import { Component, ChangeDetectionStrategy, inject, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Image } from '@shared';
import { APP_CONFIG_TOKEN } from '../../tokens/config.token';

@Component({
  selector: 'lib-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImgComponent {
  image = input<Image>();
  showWH = input<boolean>();
  loading = input<string | null>();
  showCaption = input<boolean>();
  src = computed(() => this.image() ? `${this.imagesUrl}${(this.image() || { src: '' }).src.split('.')[0]}` : '');
  srcSetWebP = computed(() => this.defineSrcSetWebP(this.src()));
  srcSetJPG = computed(() => this.defineSrcSetJPG(this.src()));

  private readonly imagesUrl = inject(APP_CONFIG_TOKEN).imagesUrl;

  defineSrcSet = (imgFormat: string) => (src: string) => {
    return `${src}-180x101.${imgFormat} 180w,
            ${src}-300x169.${imgFormat} 300w,
            ${src}-450x253.${imgFormat} 450w,
            ${src}-600x337.${imgFormat} 600w,
            ${src}-700x394.${imgFormat} 700w,
            ${src}-750x422.${imgFormat} 750w,
            ${src}-900x506.${imgFormat} 900w,
            ${src}-1050x590.${imgFormat} 1050w,
            ${src}-1200x675.${imgFormat} 1200w,
            ${src}-1400x787.${imgFormat} 1400w,
            ${src}-1750x984.${imgFormat} 1750w`
  }

  defineSrcSetWebP = this.defineSrcSet('webp');
  defineSrcSetJPG = this.defineSrcSet('jpg');
}
