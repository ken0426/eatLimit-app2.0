import { KeepData, ManagementData } from '../types';

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

/** カメラへの権限メッセージ */
export const CAMERA_ERROR_MESSAGE =
  'カメラの起動に失敗しました。\n設定からカメラへの権限を許可してください';

/** 管理方法のデータ */
export const managementData: ManagementData[] = [
  {
    text: '消費期限',
    image: undefined,
    selectColor: undefined,
  },
  {
    text: '賞味期限',
    image: undefined,
    selectColor: undefined,
  },
  {
    text: '購入日',
    image: undefined,
    selectColor: undefined,
  },
  {
    text: '登録日',
    image: undefined,
    selectColor: undefined,
  },
];

/** 保存方法のデータ */
export const keepData: KeepData[] = [
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

/** 画像追加のボタン */
export const ACTION_SHEET = {
  CAN_SELL: 0,
  CAMERA: 1,
  LIBRARY: 2,
  DELETE: 3,
};
