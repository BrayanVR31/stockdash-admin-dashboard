import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import CryptoJS from "crypto-js";
import { UserProfile } from "@/models";

interface ProfileState {
  userProfile: UserProfile;
  updateProfile: (info: UserProfile) => void;
}

interface SerializedState {
  state: ProfileState;
  version: number;
}

const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      userProfile: {
        email: "",
        username: null,
        profile: null,
        roles: null,
        status: false,
        createdAt: null,
        updatedAt: null,
      },
      updateProfile: (info) =>
        set((state) => ({
          ...state,
          userProfile: { ...state.userProfile, ...info },
        })),
    }),
    {
      name: "info",
      storage: createJSONStorage(() => localStorage, {
        replacer: (key, value) => {
          console.log({ key, value });
        },
      }),
    },
  ),
);

export { useProfileStore };
