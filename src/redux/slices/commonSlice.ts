import { createSlice } from '@reduxjs/toolkit';

const commonState = {
  isImage: true,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState: commonState,
  reducers: {
    setIsImage: (state, { payload }) => {
      state.isImage = payload;
    },
  },
});

export const { setIsImage } = commonSlice.actions;
