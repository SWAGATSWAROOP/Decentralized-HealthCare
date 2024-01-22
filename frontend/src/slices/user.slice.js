import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  signedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSignedIn: (state) => {
      state.signedIn = true;
    },
    setSignedOut: (state) => {
      state.signedIn = false;
    },
  },
});

export const { setSignedIn, setSignedOut } = userSlice.actions;

export default userSlice.reducer;
