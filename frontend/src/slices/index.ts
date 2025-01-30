export * from "./profile-slice";
// Reducers
import profileReducer from "./profile-slice";

const reducer = {
  profile: profileReducer,
};

export { reducer };
