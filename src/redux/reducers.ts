import { combineReducers } from '@reduxjs/toolkit';
import { commonRegisterSlice } from './slices/commonRegisterSlice';
import { commonSlice } from './slices/commonSlice';
import { loginSlice } from './slices/loginSlice';

export const rootReducer = combineReducers({
  /** ログイン系 */
  login: loginSlice.reducer,
  /** 共通系 */
  common: commonSlice.reducer,
  /** 登録系のデータ */
  commonRegister: commonRegisterSlice.reducer,
});
