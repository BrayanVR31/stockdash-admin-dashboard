import { DataResponse } from "@types";

// Base types
export interface Address {
  street: string;
  state: string;
  neighborhood: string;
  zipCode: number;
}

export interface Contact {
  phoneNumber: number;
  email: string;
}

export interface SocialMedia {
  facebook: string;
  tiktok: string;
  twitter: string;
}

export interface Supplier {
  _id: string;
  name: string;
  image: string | null;
  address: Partial<Address> | null;
  contact: Partial<Contact> | null;
  socialMedia: Partial<SocialMedia> | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

// Input data
type BaseFields = Pick<Supplier, "name" | "image">;

export interface SupplierInput extends BaseFields {
  address: Address | null;
  contact: Contact | null;
  socialMedia: SocialMedia | null;
}

// Response
export type SupplierResponse = DataResponse<Supplier>;
