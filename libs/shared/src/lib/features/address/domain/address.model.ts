export interface Address {
  id: string; // db sets it
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  apt: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AddressBasic = Omit<Address, 'id' | 'createdAt' | 'updatedAt'>;