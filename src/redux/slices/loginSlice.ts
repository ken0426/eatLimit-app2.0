import { createSlice } from '@reduxjs/toolkit';

const loginState = {
  userEmail: '',
};

export const loginSlice = createSlice({
  name: 'login',
  initialState: loginState,
  reducers: {
    /** ログインしているユーザーのメアドを管理 */
    setUserEmail: (state, { payload }) => {
      state.userEmail = payload;
    },
  },
});

export const { setUserEmail } = loginSlice.actions;
