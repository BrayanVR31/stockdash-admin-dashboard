import { TimeStamps } from "./stockdash";

type Avatar = {
  _id: string;
  path: string;
  extension: string;
  size: string;
} & Omit<TimeStamps, "deletedAt">;

type Address = {
  city: string;
  state: string;
  street: string;
  zipCode: number;
  country: string;
};

type Profile = {
  avatar: Avatar;
  name: string;
  lastName: string;
  phoneNumber: string;
  address: Address;
  username: string;
};

export type Account = {
  username: string;
  email: string;
  rol: string;
  status: boolean;
  profile: Profile;
} & Omit<TimeStamps, "deletedAt">;
