import { ImageBasic, ImageType } from '@shared';
import { getId } from './getId';

export const getDefaultImage = (): ImageBasic => ({
  id: getId(),
  src: '',
  alt: '',
  title: '',
  width: 0,
  height: 0,
  type: ImageType.RegularImage,
  caption: '',
  description: '',
});
