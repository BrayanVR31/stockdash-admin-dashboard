import { Image } from "./image";

type Address = {
  street: string;
  state: string;
  zipCode: number;
  neighborhood: string;
};

type Contact = {
  email: string;
  phoneNumber: string;
};

export type URLAddress = {
  url: string;
};

export type Supplier = {
  _id: string;
  name: string;
  image: Image | null;
  address: Address;
  contact: Contact;
  createdAt: Date;
  deletedAt: Date | null;
  socialMedia: URLAddress[] | null;
};
