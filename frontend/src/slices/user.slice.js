import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signedIn: false,
  email: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSignedIn: (state) => {
      state.signedIn = true;
    },
    setSignedOut: (state) => {
      state.signedIn = false;
    },
    setEmail: (state, actions) => {
      state.email = actions.payload.email;
    },
    clearEmail: (state) => {
      state.email = null;
    },
  },
});

export const { setSignedIn, setSignedOut } = userSlice.actions;

export default userSlice.reducer;
