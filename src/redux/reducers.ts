import { combineReducers } from '@reduxjs/toolkit';
import { commonRegisterSlice } from './slices/commonRegisterSlice';

export const rootReducer = combineReducers({
  /** クイズ系のデータ */
  commonRegister: commonRegisterSlice.reducer,
});
