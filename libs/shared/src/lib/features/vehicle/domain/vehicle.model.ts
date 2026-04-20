/* eslint-disable @typescript-eslint/no-explicit-any */

import { Image } from '../../image/domain/image.model';
import { SEO } from '../../seo/domain/seo.model';
import { User } from '../../user/domain/user.model';

export enum FuelType {
  Petrol = 'petrol',
  Diesel = 'diesel',
  Electric = 'electric',
  Hybrid = 'hybrid',
  Hydrogen = 'hydrogen',
}

export enum TransmissionType {
  Manual = 'manual',
  Automatic = 'automatic',
  SemiAutomatic = 'semi-automatic',
}

export enum DriveType {
  Fwd = 'fwd',
  Rwd = 'rwd',
  Awd = 'awd',
  FourWd = '4wd',
}

export enum BodyType {
  Sedan = 'sedan',
  Suv = 'suv',
  Hatchback = 'hatchback',
  Coupe = 'coupe',
  Convertible = 'convertible',
  Wagon = 'wagon',
  Van = 'van',
  Truck = 'truck',
  Minivan = 'minivan',
}

export interface VehicleEngine {
  displacement: number; // in liters, e.g. 2.0
  horsepower: number; // in HP
  torque: number; // in Nm
  fuelType: FuelType;
  cylinders?: number;
}

export interface VehicleSpecs {
  make: string; // e.g. Toyota
  model: string; // e.g. Camry
  year: number;
  bodyType: BodyType;
  doors: number;
  seats: number;
  wheels: number;
  engine: VehicleEngine;
  transmission: TransmissionType;
  drive: DriveType;
  mileage?: number; // in km
  color?: string;
}

// for test case it's ok
export interface Vehicle {
  id: string;
  url: string;
  name: string; // max 255 characters
  description: string; // max 1000 characters
  previewImage: Image; // one-to-one relation with Image, one vehicle has one preview image, but one image can be used for many vehicles (if they have the same preview image)
  // here we have many-to-many relation, so we need to have an array of images, but in the db we will have a separate table for this relation
  images: Image[];

  doors: number;
  seats: number;
  year: number;
  mileage?: number; // in km
  color: string;
  model: string;

  price: number;
  available: boolean;
  owner: User; // one-to-many relation with User, one user can have many vehicles, but one vehicle has only one owner
  // ownerId: string; // db sets it, but we need to have it in the model for the relation
  seo: SEO; // one-to-one relation with SEO, one vehicle has one seo, but one seo can be used for many vehicles (if they have the same seo data)
  createdAt: Date;
  updatedAt: Date;
}

export type KeysFromVehicle<
  Fields extends keyof Vehicle,
  Extra = object,
> = Pick<Vehicle, Fields> & Extra;

export type VehicleBasic = Pick<
  Vehicle,
  | 'id'
  | 'name'
  | 'description'
  | 'url'
  | 'price'
  | 'previewImage'
  | 'images'
  | 'year'
  | 'doors'
  | 'seats'
  | 'mileage'
  | 'available'
  | 'owner'
>;

export type VehicleCreate = Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'> & {
  ownerId: string;
};
export type VehicleUpdate = Omit<Vehicle, 'createdAt' | 'updatedAt'> & {
  ownerId: string;
};

export type CreateVehicleResponse = {
  success: boolean;
  data: Vehicle;
  message: string;
};
