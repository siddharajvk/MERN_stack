import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userName: null,
  },
  reducers: {
    login: (state, action) => {
      const {userName} = action.payload;

      state.user={
        userName
      };
    },
  },
});

export const { login } = userSlice.actions;
export const selectUser = (state) => state.user;

// export default userSlice.reducer; // Corrected the export
export const userReducer=userSlice.reducer;
export default userReducer;
