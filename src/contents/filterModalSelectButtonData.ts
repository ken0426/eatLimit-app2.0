import { LABEL_NAME } from '.';
import { FilterData } from '../types';

/** 絞り込み画面のボタンデータ */
export const FILTER_MODAL_SELECT_BUTTON_DATA: FilterData[] = [
  {
    /** フィルター画面用 */
    FILTER: [
      {
        ELEMENT_NAME: LABEL_NAME.IMAGE,
        LABEL: '画像のみの表示',
        DATA: [
          { text: 'しない', id: '1' },
          { text: 'する', id: '2' },
        ],
      },
      {
        ELEMENT_NAME: LABEL_NAME.MANAGEMENT,
        LABEL: '管理方法',
        DATA: [
          { text: '消費期限', id: '1' },
          { text: '賞味期限', id: '2' },
          { text: '購入日', id: '3' },
          { text: '登録日', id: '4' },
        ],
      },
      {
        ELEMENT_NAME: LABEL_NAME.PRESERVATION,
        LABEL: '保存方法',
        DATA: [
          { text: '冷蔵', id: '1' },
          { text: '冷凍', id: '2' },
          { text: '常温', id: '3' },
        ],
      },
      {
        ELEMENT_NAME: 'isBeforeDate',
        LABEL: '期限切れのみの表示',
        DATA: [
          { text: 'しない', id: '1' },
          { text: 'する', id: '2' },
        ],
      },
    ],
    /** 並び替えの画面用 */
    SORT: [
      {
        ELEMENT_NAME: 'date',
        LABEL: '日付',
        DATA: [
          { text: '登録日順', id: '1' },
          { text: '消費期限順', id: '2' },
        ],
      },
      {
        ELEMENT_NAME: 'AscendingDescending',
        LABEL: '昇順/降順',
        DATA: [
          { text: '新しい順', id: '1' },
          { text: '古い順', id: '2' },
        ],
      },
      {
        ELEMENT_NAME: 'test2',
        LABEL: '複数選択',
        DATA: [
          { text: '選択1', id: '1' },
          { text: '選択2', id: '2' },
          { text: '選択3', id: '3' },
        ],
      },
    ],
  },
];
