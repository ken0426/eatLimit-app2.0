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
      [LABEL_NAME.DATE]: '',
      [LABEL_NAME.ASCENDING_DESCENDING]: '',
      [LABEL_NAME.BEFORE_DATE]: '',
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
          [LABEL_NAME.DATE]:
            payload?.single?.date ?? state.filterSelectedData.single.date,
          /** 昇順/降順 */
          [LABEL_NAME.ASCENDING_DESCENDING]:
            payload?.single?.ascendingDescending ??
            state.filterSelectedData.single.ascendingDescending,
          [LABEL_NAME.BEFORE_DATE]:
            payload?.single?.beforeDate ??
            state.filterSelectedData.single.beforeDate,
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
        },
      };
    },
  },
});

export const { setFilterSelectedData } = filterModalSlice.actions;
