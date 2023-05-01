/** 検索バー */
export const SEARCH_BAR_HIGHT = 40;

/** フォントサイズ
 * @param {number} SEARCH_BAR_TEXT 検索バーのフォントサイズ
 */
export const SEARCH_BAR_TEXT = 20;

/** 詳細画面のヘッダーの高さ */
export const BANNER_HEIGHT = 130;

/** 詳細画面の画像の高さ */
export const DETAIL_IMAGE_HEIGHT = 224;

/** 保存方法のデータ */
export const keepData = [
  {
    text: '冷凍',
    image: require('../images/snow.png'),
    selectColor: 'rgb(79, 199, 214)',
  },
  {
    text: '冷蔵',
    image: require('../images/fridge.png'),
    selectColor: 'rgb(79, 131, 214)',
  },
  {
    text: '常温',
    image: require('../images/salt.png'),
    selectColor: 'rgb(232, 154, 98)',
  },
];
