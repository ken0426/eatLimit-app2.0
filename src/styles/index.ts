import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';

/** グローバルで使用する色 */
export const COLORS = {
  /** アプリのメインカラー */
  MAIN_COLOR: '#f9f9f9', // rgba: 217, 184, 155
  /** アプリのテキスト入力 */
  MAIN_TEXT_COLOR: '#434343',
  /** 戻るボタンやリンクなどの色 */
  BLUE: '#007AFF',
  /** 検索バーのテキストカラー */
  TEXT_INPUT: '#e0e0e0',
  /** 検索バーの虫眼鏡のカラー */
  SEARCH_ICON: '#c6c6c6',
  /** 一覧画面の線のカラー */
  BORDER_LINE: '#c2c2c2',
  /** 詳細画面の戻るボタンやハンバーガーメニューの背景色 */
  DETAIL_HEADER_BUTTON: 'rgba(45, 45, 45, 0.7)',
  /** アプリで使用するメインのテキストカラー */
  TEXT_COLOR: '#373737',
  /** 詳細画面で使用するボーダーの線の色 */
  DETAIL_BORDER: '#696969',
  /** 登録画面などで使用するラベルカラー */
  TEXT_LABEL: '#787878',
  /** フッターモーダルのテキストエリアの色 */
  MODAL_FOOTER: '#eeeeee',
  /** 削除ボタン */
  RED: '#ff1414',
  /** 背景色などで使う白色 */
  WHITE: '#f8f8f8',
  /** 設定画面のラベルカラー */
  SETTING_LABEL: '#c8c8c8',
  /** ログイン画面の新規登録ボタンやログインボタンの色 */
  LOGIN_BUTTON: '#1797ec',
  /** トップ画面の新規登録ボタンの色 */
  SIGN_IN_BUTTON: '#fcfcfc',
  /** 警告の色 */
  CAVEAT: '#ff9191',
  /** コピーボタンの色 */
  ORANGE: '#ee7800',
  /** タグの色 */
  TAG: '#dadada',
  /** 影の色 */
  BLACK: '#000000',
};

export const SIZE = {
  BASE_HP: hp('1%'),
  BASE_WP: wp('1%'),
};

export const FONTSIZE = {
  SIZE15PX: RFPercentage(2.0),
  SIZE18PX: RFPercentage(2.4),
  SIZE20PX: RFPercentage(2.6),
  SIZE24PX: RFPercentage(3.3),
  SIZE25PX: RFPercentage(3.5),
  SIZE30PX: RFPercentage(3.9),
};

/** 入力項目の高さ */
export const INPUT_HEIGHT = 50;
/** 詳細画面のヘッダーの高さ */
export const BANNER_HEIGHT = SIZE.BASE_HP * 15;
/** 詳細画面の画像の高さ */
export const DETAIL_IMAGE_HEIGHT = SIZE.BASE_HP * 28;
