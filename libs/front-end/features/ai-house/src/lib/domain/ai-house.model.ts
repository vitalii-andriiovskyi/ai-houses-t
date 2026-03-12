export interface Image {
  id: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface AIHouse {
  _id: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: number;
    country: string;
    apt?: string;
  };
  ownerId: string;
  rooms: number;
  area: number;
  price: number;
  available: boolean;
  features?: string[];
  images: Image[];
  builtYear: Date;
  lastRenovation?: Date;
  rating: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
  url: string;
  likes?: string[];
}

export type KeysFromAIHouse<Fields extends keyof AIHouse, Extra = object> =
  Pick<AIHouse, Fields> & Extra;

export type AIHouseBasic = Pick<AIHouse, '_id' | 'name' | 'address' | 'price' | 'rooms' | 'area' | 'images' | 'rating' | 'available' | 'likes' | 'url'>;

export type AIHouseCreate = Omit<AIHouse, '_id' | 'createdAt' | 'updatedAt' | 'rating' | 'likes'> & { ownerId: string };
export type AIHouseUpdate = Omit<AIHouse, 'createdAt' | 'updatedAt' | 'rating' | 'likes'> & { ownerId: string };

export type CreateAIHouseResponse = {
  success: boolean;
  data: AIHouse;
  message: string;
};

