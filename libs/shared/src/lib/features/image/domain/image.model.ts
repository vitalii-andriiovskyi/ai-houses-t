export interface Image {
  id: string;
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  createdAt?: Date;
  updatedAt?: Date;
  type?: string;
  caption?: string;
  description?: string;
}

export enum ImageType {
  HeroImage = 'HeroImage',
  PreviewImage = 'PreviewImage',
  ThumbnailImage = 'ThumbnailImage',
  OGImage = 'OpenGraphImage',
  TWImage = 'TwitterImage',
}