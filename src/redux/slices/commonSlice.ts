import { createSlice } from '@reduxjs/toolkit';
import { MemoTemplateData } from '../../types';

type CommonState = {
  imageId: number;
  dateFormatDisplayId: number;
  dateDisplayId: number;
  dayOfWeekId: number;
  selectMemoTemplate: MemoTemplateData;
  selectMemoTemplateData: {
    data: MemoTemplateData[] | [];
    isTemplate: true;
  };
  tagList: { id: string; name: string }[];
  tagsOrderId: string;
};

const commonState: CommonState = {
  imageId: 1,
  dateFormatDisplayId: 3,
  dateDisplayId: 1,
  dayOfWeekId: 1,
  selectMemoTemplate: { label: 'テンプレートなし', id: '0', text: '' },
  selectMemoTemplateData: { data: [], isTemplate: true },
  tagList: [],
  tagsOrderId: '',
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
    /** 選択中メモのテンプレート */
    setSelectMemoTemplate: (state, { payload }) => {
      state.selectMemoTemplate = payload;
    },
    /** すべてのメモのテンプレートデータ */
    setSelectMemoTemplateData: (state, { payload }) => {
      state.selectMemoTemplateData = payload;
    },
    /** ユーザーが保存しているタグ情報 */
    setTagList: (state, { payload }) => {
      state.tagList = payload;
    },
    /** ユーザーが保存しているタグの並び順を保持するfirebaseのID */
    setTagsOrderId: (state, { payload }) => {
      state.tagsOrderId = payload;
    },
  },
});

export const {
  setImageId,
  setDateFormatDisplayId,
  setDateDisplayId,
  setDayOfWeekId,
  setSelectMemoTemplate,
  setSelectMemoTemplateData,
  setTagList,
  setTagsOrderId,
} = commonSlice.actions;
