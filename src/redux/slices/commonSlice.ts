import { createSlice } from '@reduxjs/toolkit';

const commonState = {
  imageId: 1,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState: commonState,
  reducers: {
    /** 画像の表示非表示 */
    setImageId: (state, { payload }) => {
      state.imageId = payload;
    },
  },
});

export const { setImageId } = commonSlice.actions;
