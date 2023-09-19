import { LABEL_NAME } from '.';

/** 絞り込み画面のボタンデータ */
export const FILTER_MODAL_SELECT_BUTTON_DATA = [
  {
    /** フィルター画面用 */
    FILTER: [
      {
        ELEMENT_NAME: LABEL_NAME.IMAGE,
        LABEL: '画像の表示',
        DATA: [
          { text: 'あり', id: '1' },
          { text: 'なし', id: '2' },
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
        LABEL: '期限切れの表示',
        DATA: [
          { text: 'する', id: '1' },
          { text: 'しない', id: '2' },
        ],
      },
    ],
    /** 並び替えの画面用 */
    SORT: [
      {
        ELEMENT_NAME: 'test',
        LABEL: '単数選択',
        DATA: [
          { text: 'あり', id: '1' },
          { text: 'なし', id: '2' },
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
