import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/user.slice.js'; // Rename to userReducer

export const store = configureStore({
  reducer: {
    user: userReducer, // Use the reducer function, not the instance
  },
});
