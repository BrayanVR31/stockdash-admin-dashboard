import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "@/slices";

export const store = configureStore({
  reducer,
});

// Type definitions
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
