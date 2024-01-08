import { createSlice } from '@reduxjs/toolkit';

type MemoState = {
  saveTemplateMemoId: string;
  templateMemoData: { label: string; id: string; text: string }[];
  selectedTemplateId: string;
};

const memoState: MemoState = {
  saveTemplateMemoId: '',
  templateMemoData: [],
  selectedTemplateId: '',
};

export const memoSlice = createSlice({
  name: 'memo',
  initialState: memoState,
  reducers: {
    /** ユーザーが保存しているテンプレートメモのID */
    setSavedTemplateMemoId: (state, { payload }) => {
      state.saveTemplateMemoId = payload;
    },
    /** テンプレートメモのデータ */
    setTemplateMemoData: (state, { payload }) => {
      state.templateMemoData = payload;
    },
    /** 選択しているテンプレートメモのID */
    setSelectedTemplateMemoId: (state, { payload }) => {
      state.selectedTemplateId = payload;
    },
  },
});

export const {
  setSavedTemplateMemoId,
  setTemplateMemoData,
  setSelectedTemplateMemoId,
} = memoSlice.actions;
