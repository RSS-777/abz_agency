import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSuccess: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSuccess: (state) => {
      state.isSuccess = true;
    },
    clearSuccess: (state) => {
      state.isSuccess = false;
    },
  },
});

export const { setSuccess, clearSuccess } = authSlice.actions;
export default authSlice.reducer;