import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';

/** グローバルで使用する色 */
export const COLORS = {
  /** アプリのメインカラー */
  mainColor: '#f9f9f9', // rgba: 217, 184, 155
  /** アプリのテキスト入力 */
  mainTextColor: '#434343',
  /** 戻るボタンやリンクなどの色 */
  BLUE: '#007AFF',
  /** 検索バーのテキストカラー */
  TextInput: '#e0e0e0',
  /** 検索バーの虫眼鏡のカラー */
  searchIcon: '#c6c6c6',
  /** 一覧画面の線のカラー */
  borderLine: '#c2c2c2',
  /** 詳細画面の戻るボタンやハンバーガーメニューの背景色 */
  detailHeaderButton: 'rgba(45, 45, 45, 0.7)',
  /** アプリで使用するメインのテキストカラー */
  textColor: '#373737',
  /** 詳細画面で使用するボーダーの線の色 */
  detailBorderColor: '#696969',
  /** 登録画面などで使用するラベルカラー */
  textLabel: '#787878',
  /** フッターモーダルのテキストエリアの色 */
  modalFooterTextArea: '#eeeeee',
  /** 削除ボタン */
  RED: '#ff1414',
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
