import { Results, TimeStamps } from "./stockdash";

export type Supplier = {
  name: string;
  address: {
    street?: string;
    state?: string;
    zipCode?: number;
    neighborhood?: string;
  };
  contact: {
    phoneNumber?: string;
    email?: string;
  };
  image: string | null;
} & TimeStamps;

export type Suppliers = Results<Supplier>;
