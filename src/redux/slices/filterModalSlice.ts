import { createSlice } from '@reduxjs/toolkit';
import { LABEL_NAME } from '../../contents';

type FilterSelectedData = {
  filterSelectedData: {
    single: {
      [key: string]: string;
    };
    multi: {
      [key: string]: string[];
    };
  };
};

const filterModalState: FilterSelectedData = {
  filterSelectedData: {
    single: {
      [LABEL_NAME.IMAGE]: '',
      date: '',
      AscendingDescending: '',
      isBeforeDate: '',
    },
    multi: {
      [LABEL_NAME.MANAGEMENT]: [],
      [LABEL_NAME.PRESERVATION]: [],
      test2: [],
    },
  },
};

/** 絞り込み検索の選択したボタンのデータを保存するRedux */
export const filterModalSlice = createSlice({
  name: 'filterModal',
  initialState: filterModalState,
  reducers: {
    setFilterSelectedData: (state, { payload }) => {
      state.filterSelectedData = {
        /** 単数選択 */
        single: {
          /** 画像の表示 */
          [LABEL_NAME.IMAGE]:
            payload?.single?.[LABEL_NAME.IMAGE] ??
            state.filterSelectedData.single[LABEL_NAME.IMAGE],
          /** 日付 */
          date: payload?.single?.date ?? state.filterSelectedData.single.date,
          /** 昇順/降順 */
          AscendingDescending:
            payload?.single?.AscendingDescending ??
            state.filterSelectedData.single.AscendingDescending,
          isBeforeDate:
            payload?.single?.isBeforeDate ??
            state.filterSelectedData.single.isBeforeDate,
        },
        /** 複数選択 */
        multi: {
          /** 管理方法 */
          [LABEL_NAME.MANAGEMENT]:
            payload?.multi?.[LABEL_NAME.MANAGEMENT] ??
            state.filterSelectedData.multi[LABEL_NAME.MANAGEMENT],
          /** 保存方法 */
          [LABEL_NAME.PRESERVATION]:
            payload?.multi?.[LABEL_NAME.PRESERVATION] ??
            state.filterSelectedData.multi[LABEL_NAME.PRESERVATION],
          /** テスト2 */
          test2: payload?.multi?.test2 ?? state.filterSelectedData.multi.test2,
        },
      };
    },
  },
});

export const { setFilterSelectedData } = filterModalSlice.actions;