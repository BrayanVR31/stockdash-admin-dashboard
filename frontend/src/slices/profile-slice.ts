import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app";

// Types
interface ProfileState {
  email: string;
  username: string;
  info: Info | null;
}

interface Info {
  name: string;
  lastName: string;
  avatar: string;
  phoneNumber: string;
}

// Initialize profile state
const initialState: ProfileState = {
  email: "",
  username: "",
  info: null,
};

// Slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: reducer,
  },
});

// Reducers
function reducer(state: ProfileState, action: PayloadAction<ProfileState>) {
  state.email = action.payload.email;
  state.info = action.payload.info;
  state.username = action.payload.username;
}

// Actions
export const { updateProfile } = profileSlice.actions;

// Selected state
export const selectProfile = (state: RootState) => state.profile;

export default profileSlice.reducer;
