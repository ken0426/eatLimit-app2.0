import { createSlice } from '@reduxjs/toolkit';

const commonState = {
  imageId: 1,
  dateFormatDisplayId: 3,
  dateDisplayId: 1,
  dayOfWeekId: 1,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState: commonState,
  reducers: {
    /** 画像の表示非表示 */
    setImageId: (state, { payload }) => {
      state.imageId = payload;
    },
    /** 年月日のフォーマット表示 */
    setDateFormatDisplayId: (state, { payload }) => {
      state.dateFormatDisplayId = payload;
    },
    /** 年月日の表示 */
    setDateDisplayId: (state, { payload }) => {
      state.dateDisplayId = payload;
    },
    /** 曜日の表示 */
    setDayOfWeekId: (state, { payload }) => {
      state.dayOfWeekId = payload;
    },
  },
});

export const {
  setImageId,
  setDateFormatDisplayId,
  setDateDisplayId,
  setDayOfWeekId,
} = commonSlice.actions;
