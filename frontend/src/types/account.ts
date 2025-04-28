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
  zipCode: string;
  country: string;
};

type Profile = {
  avatar: Avatar | null;
  name: string;
  lastName: string;
  phoneNumber: string | null;
  address: Address;
};

export type Account = {
  username: string | null;
  email: string;
  rol: string;
  status: boolean;
  profile: Profile;
} & Omit<TimeStamps, "deletedAt">;

export type ProfileForm = Omit<Account, "profile"> & {
  profile: Omit<Profile, "avatar"> & {
    avatar: string | null;
  };
};
