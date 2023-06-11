import { createSlice } from '@reduxjs/toolkit';

const commonRegisterState = {
  registerData: {
    eatName: '',
    image: '',
    date: '',
    price: undefined,
    placeOfPurchase: undefined,
  },
  updateRegisterData: {
    eatName: '',
    image: '',
    date: '',
    price: undefined,
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
    setUpdateRegisterData: (state, { payload }) => {
      state.updateRegisterData = payload;
    },
  },
});

export const { setRegisterData, setUpdateRegisterData } =
  commonRegisterSlice.actions;
