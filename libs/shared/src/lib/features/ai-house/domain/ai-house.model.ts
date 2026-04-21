/* eslint-disable @typescript-eslint/no-explicit-any */

import { Address } from '../../address/domain/address.model';
import { Image } from '../../image/domain/image.model';
import { SEO } from '../../seo/domain/seo.model';
import { User } from '../../user/domain/user.model';

export interface AIHouse {
  id: string;
  name: string;
  description: string;
  address: Address;
  // addressId: string; // db sets it, but we need to have it in the model for the relation
  owner: User;
  // ownerId: string; // db sets it, but we need to have it in the model for the relation
  rooms: number;
  area: number;
  price: number;
  available: boolean;
  features?: string[];
  // here we have many-to-many relation, so we need to have an array of images, but in the db we will have a separate table for this relation
  images: Image[];
  builtYear: Date;
  lastRenovation?: Date;
  rating: number;
  metadata?: any;
  // here we have many-to-many relation, so we need to have an array of users, but in the db we will have a separate table for this relation
  likes?: User[]; // implement likes table for that later
  likesCount?: number; // for easier access to the number of likes, we can store it in the db and update it when we like/unlike a house
  url: string;
  seo: SEO;
  createdAt: Date;
  updatedAt: Date;
}

export type KeysFromAIHouse<
  Fields extends keyof AIHouse,
  Extra = object,
> = Pick<AIHouse, Fields> & Extra;

export type AIHouseBasic = Pick<
  AIHouse,
  | 'id'
  | 'name'
  | 'description'
  | 'address'
  | 'price'
  | 'rooms'
  | 'area'
  | 'images'
  | 'rating'
  | 'available'
  | 'url'
  | 'likes'
  | 'likesCount'
  | 'seo' // should be removed later
  | 'owner'
>;

export type AIHouseCreate = Omit<
  AIHouse,
  'id' | 'createdAt' | 'updatedAt' | 'rating' | 'likes' | 'likesCount'
> & { ownerId: string };
export type AIHouseUpdate = Omit<
  AIHouse,
  'createdAt' | 'updatedAt' | 'rating' | 'likes' | 'likesCount'
> & { ownerId: string };

export type CreateAIHouseResponse = {
  success: boolean;
  data: AIHouse;
  message: string;
};
