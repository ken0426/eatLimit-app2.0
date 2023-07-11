import { createSlice } from '@reduxjs/toolkit';

const commonState = {
  imageId: 1,
  dateFormatDisplayId: 3,
  dateDisplayId: 1,
  dayOfWeekId: 1,
  selectMemoTemplateId: 0,
  selectMemoTemplateName: 'テンプレートなし', // 固定では入らないため修正が必要（一旦固定でデータをセット）
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
    /** メモのテンプレートID */
    setSelectMemoTemplateId: (state, { payload }) => {
      state.selectMemoTemplateId = payload;
    },
    /** メモのテンプレート名 */
    setSelectMemoTemplateName: (state, { payload }) => {
      state.selectMemoTemplateName = payload;
    },
  },
});

export const {
  setImageId,
  setDateFormatDisplayId,
  setDateDisplayId,
  setDayOfWeekId,
  setSelectMemoTemplateId,
  setSelectMemoTemplateName,
} = commonSlice.actions;
