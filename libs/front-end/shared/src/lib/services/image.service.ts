import { inject, Injectable } from '@angular/core';
import { APP_CONFIG_TOKEN } from '../tokens/config.token';

import { Image, ImageType } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  public defaultImageUrl = inject(APP_CONFIG_TOKEN).defaultImageUrl;

  defaultImage: Image = {
    id: 'default',
    src: this.defaultImageUrl,
    alt: 'AI Houses',
    type: ImageType.OGImage,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  findImage =
    (imageType: string) =>
    (defaultImg = this.defaultImage) =>
    (images: Image[]): Image =>
      (images && images.find((image) => image.type === imageType)) ||
      defaultImg;

  findOGImage = this.findImage(ImageType.OGImage)();
  findTWImage = this.findImage(ImageType.TWImage)();
}
