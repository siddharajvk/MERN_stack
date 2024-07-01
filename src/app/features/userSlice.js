// userSlice.js

import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
  name: "user",
  initialState: {
    userName: null,
    userPassword: null,
  },
  reducers: {
    login: (state, action) => {
      console.log("Action payload:", action.payload);

      // Assuming action.payload has the structure { userName, userPassword }
      const { userName, userPassword } = action.payload;

      // Update the user state with the provided data
      state.user = {
        userName,
        userPassword,
  
      };
    },
  },
});

export const { login } = userSlice.actions;
export const selectUser = (state) => state.user;

export default userSlice.reducer;
