import { createSlice } from '@reduxjs/toolkit';

type MemoState = {
  saveTemplateMemoId: string;
  templateMemoData: { label: string; id: string; text: string }[];
};

const memoState = {
  saveTemplateMemoId: '',
  templateMemoData: [],
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
  },
});

export const { setSavedTemplateMemoId, setTemplateMemoData } =
  memoSlice.actions;
