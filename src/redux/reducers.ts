import { combineReducers } from '@reduxjs/toolkit';
import { commonRegisterSlice } from './slices/commonRegisterSlice';
import { commonSlice } from './slices/commonSlice';
import { loginSlice } from './slices/loginSlice';
import { filterModalSlice } from './slices/filterModalSlice';
import { memoSlice } from './slices/memoSlice';

export const rootReducer = combineReducers({
  /** ログイン系 */
  login: loginSlice.reducer,
  /** 共通系 */
  common: commonSlice.reducer,
  /** 登録系のデータ */
  commonRegister: commonRegisterSlice.reducer,
  /** 絞り込みの選択したデータを保存 */
  filterModal: filterModalSlice.reducer,
  /** メモ系 */
  memo: memoSlice.reducer,
});
