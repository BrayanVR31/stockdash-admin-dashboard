interface UserProfile {
  username: string | null;
  email: string;
  profile: Profile | null;
  roles: string[] | null;
  status: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
}

interface Profile {
  name: string;
  lastName: string;
  avatar: string | null;
  phoneNumber: string | null;
  address: Address | null;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: number;
  country: string;
}

export type { UserProfile };
