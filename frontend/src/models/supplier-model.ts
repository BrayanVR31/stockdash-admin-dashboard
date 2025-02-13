import { PaginatedResponse, SingleResponse } from "./response-model";

interface Supplier {
  name: string;
  address: Address;
  contact: Contact;
  socialMedia: SocialMedia;
  image: string;
}

interface SocialMedia {
  facebook: string;
  tiktok: string;
  twitter: string;
}

interface Contact {
  phoneNumber: number;
  email: string;
}

interface Address {
  street: string;
  state: string;
  zipCode: number;
  neighborhood: string;
}

type SupplierList = PaginatedResponse<Supplier>;
type SupplierItem = SingleResponse<Supplier>;

export type { Supplier, SupplierList, SupplierItem };
