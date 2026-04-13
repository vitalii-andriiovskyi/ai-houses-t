export interface Image {
  id: string;
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  type?: ImageType;
  caption?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum ImageType {
  HeroImage = 'HeroImage',
  PreviewImage = 'PreviewImage',
  ThumbnailImage = 'ThumbnailImage',
  OGImage = 'OpenGraphImage',
  TWImage = 'TwitterImage',
  RegularImage = 'RegularImage',
}

export type ImageBasic = Omit<Image, 'createdAt' | 'updatedAt'>;
