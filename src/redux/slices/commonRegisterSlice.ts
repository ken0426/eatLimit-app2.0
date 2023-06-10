import { createSlice } from '@reduxjs/toolkit';

const commonRegisterState = {
  registerData: {
    eatName: '',
    image: '',
    date: '',
    place: undefined,
    placeOfPurchase: undefined,
  },
};

export const commonRegisterSlice = createSlice({
  name: 'commonRegister',
  initialState: commonRegisterState,
  reducers: {
    setRegisterData: (state, { payload }) => {
      state.registerData = payload;
    },
  },
});

export const { setRegisterData } = commonRegisterSlice.actions;
