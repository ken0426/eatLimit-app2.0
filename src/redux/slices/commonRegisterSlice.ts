import { createSlice } from '@reduxjs/toolkit';

const commonRegisterState = {
  registerData: {
    eatName: '',
    image: '',
    date: '',
    price: undefined,
    placeOfPurchase: undefined,
    management: '',
    preservation: '',
  },
  updateRegisterData: {
    eatName: '',
    image: '',
    date: '',
    price: undefined,
    placeOfPurchase: undefined,
    management: '',
    preservation: '',
    count: '',
  },
  tagSelected: [],
};

export const commonRegisterSlice = createSlice({
  name: 'commonRegister',
  initialState: commonRegisterState,
  reducers: {
    /** 登録やコピーで項目のデータを保持 */
    setRegisterData: (state, { payload }) => {
      state.registerData = payload;
    },
    /** 変更で項目のデータを保持 */
    setUpdateRegisterData: (state, { payload }) => {
      state.updateRegisterData = payload;
    },
    /** タグ選択で選択したタグのデータを保持 */
    setTagSelected: (state, { payload }) => {
      state.tagSelected = payload;
    },
  },
});

export const { setRegisterData, setUpdateRegisterData, setTagSelected } =
  commonRegisterSlice.actions;
