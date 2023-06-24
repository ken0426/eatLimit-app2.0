import { combineReducers } from '@reduxjs/toolkit';
import { commonRegisterSlice } from './slices/commonRegisterSlice';
import { commonSlice } from './slices/commonSlice';

export const rootReducer = combineReducers({
  /** 共通系 */
  common: commonSlice.reducer,
  /** 登録系のデータ */
  commonRegister: commonRegisterSlice.reducer,
});
