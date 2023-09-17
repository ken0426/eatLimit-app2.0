/** 絞り込み画面のボタンデータ */
export const FILTER_MODAL_SELECT_BUTTON_DATA = [
  {
    /** フィルター画面用 */
    FILTER: [
      {
        LABEL: '画像の表示',
        DATA: [
          { text: 'あり', id: '1' },
          { text: 'なし', id: '2' },
        ],
      },
      {
        LABEL: '管理方法',
        DATA: [
          { text: '消費期限', id: '1' },
          { text: '賞味期限', id: '2' },
          { text: '購入日', id: '3' },
          { text: '登録日', id: '4' },
        ],
      },
      {
        LABEL: '保存方法',
        DATA: [
          { text: '冷蔵', id: '1' },
          { text: '冷凍', id: '2' },
          { text: '常温', id: '3' },
        ],
      },
    ],
    /** 並び替えの画面用 */
    SORT: [
      {
        LABEL: 'テスト',
        DATA: [
          { text: 'あり', id: '1' },
          { text: 'なし', id: '2' },
        ],
      },
    ],
  },
];
