import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const { userData, accessToken } = action.payload;
      state.userData = userData;
      state.accessToken = accessToken;
    },
    setLogout: (state, action) => {
      state.userData = null;
      state.accessToken = null;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;