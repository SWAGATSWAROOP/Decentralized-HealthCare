import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  signedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signedIn: (state) => {
      state.signedIn = true;
    },
    signedOut: (state) => {
      state.signedIn = false;
    },
  },
});

export const { signedIn, signedOut } = userSlice.actions;

export default userSlice.reducer;
