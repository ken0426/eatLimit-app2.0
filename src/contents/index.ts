import moment from 'moment';
import { KeepData, ManagementData, ModalButton, SettingData } from '../types';

/** 検索バー */
export const SEARCH_BAR_HIGHT = 40;

/** 検索バーのフォントサイズ */
export const SEARCH_BAR_TEXT = 20;

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

/** モーダルのボタン */
export const SINGLE_MODAL_BUTTON: ModalButton[] = [{ text: '閉じる' }];
export const DOUBLE_MODAL_BUTTON: ModalButton[] = [
  {
    text: 'キャンセル',
  },
  {
    text: 'OK',
  },
];

/** 画像追加のボタン */
export const ACTION_SHEET = {
  CAN_SELL: 0,
  CAMERA: 1,
  LIBRARY: 2,
  DELETE: 3,
};

/** 設定の情報 */
export const settingData: SettingData[] = [
  {
    list: {
      headline: '一覧リスト',
      item: [
        {
          label: '画像表示',
          data: [
            { text: '画像表示あり', id: 1 },
            { text: '画像表示なし', id: 2 },
          ],
        },
        {
          label: '年月日のフォーマット表示',
          data: [
            { text: moment().format('YYYY年MM月DD日'), id: 1 },
            { text: moment().format('YYYY/MM/DD'), id: 2 },
            { text: moment().format('YYYY-MM-DD'), id: 3 },
          ],
        },
        // 年月日の表示はフォーマットに依存する設定にする
        {
          label: '年月日の表示',
          data: [
            { text: moment().format('YYYY/MM/DD'), id: 1 },
            { text: moment().format('MM/DD'), id: 2 },
          ],
        },
      ],
    },
  },
  {
    user: {
      headline: 'ユーザー未実装設定（この項目はエラーになります）',
      item: [
        {
          label: 'A設定',
          data: [
            { text: '項目1', id: 1 },
            { text: '項目2', id: 2 },
          ],
        },
        {
          label: 'B設定',
          data: [
            { text: '項目1', id: 1 },
            { text: '項目2', id: 2 },
            { text: '項目3', id: 3 },
          ],
        },
      ],
    },
  },
];
