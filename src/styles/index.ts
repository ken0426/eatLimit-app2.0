import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';

/** グローバルで使用する色 */
export const color = {
  /** アプリのメインカラー */
  mainColor: '#f9f9f9', // rgba: 217, 184, 155
  /** アプリのテキスト入力 */
  mainTextColor: '#434343',
  /** 戻るボタンやリンクなどの色 */
  blue: '#007AFF',
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
};

export const SIZE = {
  BASE_HP: hp('1%'),
  BASE_WP: wp('1%'),
};

export const FONTSIZE = {
  SIZE20PX: RFPercentage(2.6),
};

/** 入力項目の高さ */
export const INPUT_HEIGHT = 50;
