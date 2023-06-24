import { combineReducers } from '@reduxjs/toolkit';
import { commonRegisterSlice } from './slices/commonRegisterSlice';

export const rootReducer = combineReducers({
  /** 登録系のデータ */
  commonRegister: commonRegisterSlice.reducer,
});
