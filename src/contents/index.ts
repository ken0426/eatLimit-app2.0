import moment from 'moment';
import {
  KeepData,
  ManagementData,
  MemoTemplateData,
  SettingData,
} from '../types';

/** 9月 */
export const SEPTEMBER = 9;

/** 検索バー */
export const SEARCH_BAR_HIGHT = 40;

/** 検索バーのフォントサイズ */
export const SEARCH_BAR_TEXT = 20;

/** カメラへの権限メッセージ */
export const CAMERA_ERROR_MESSAGE =
  'カメラの起動に失敗しました。\n設定からカメラへの権限を許可してください';

/** 登録画面の項目定義 */
export const LABEL_NAME = {
  /** 画像 */
  IMAGE: 'image',
  /** 商品名 */
  PRODUCT: 'product',
  /** 個数 */
  QUANTITY: 'quantity',
  /** 管理方法 */
  MANAGEMENT: 'management',
  /** 保存方法 */
  PRESERVATION: 'preservation',
  /** 日付 */
  DATE: 'date',
  /** 期限目安 */
  APPROXIMATE_DEADLINE: 'approximateDeadline',
  /** 購入場所 */
  PLACE_OF_PURCHASE: 'placeOfPurchase',
  /** 金額 */
  AMOUNT_OF_MONEY: 'amountOfMoney',
  /** メモ */
  MEMO: 'memo',
};

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

/** 登録変更画面での日付のエラーメッセージ */
export const DATE_ERROR_MESSAGE = {
  DATE: '日付は期限目安より前の日付にしてください',
  APPROXIMATE_DEADLINE: '期限目安は日付より後の日付にしてください',
};

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

/** 設定項目の各項目名 */
export const LABEL = {
  /** 画像表示 */
  IMAGE_DISPLAY: '画像表示',
  /** 年月日のフォーマット表示 */
  DATE_FORMAT_DISPLAY: '年月日のフォーマット表示',
  /** 年月日の表示 */
  DATE_DISPLAY: '年月日の表示',
  /** 曜日の表示 */
  DAY_OF_THE_WEEK_DISPLAY: '曜日の表示',
  /** メモのテンプレート */
  MEMO_TEMPLATE: 'メモのテンプレート',
};

/** 設定項目で選択するID */
export const SETTING_ITEM_ID = {
  /** 画像あり */
  IMAGE_DISPLAY: 1,
  /** 画像なし */
  IMAGE_NOT_DISPLAY: 2,
  /** YYYY年MM月DD日 */
  FORMAT_JP: 1,
  /** YYYY/MM/DD */
  FORMAT_SLASH: 2,
  /** YYYY-MM-DD */
  FORMAT_HYPHEN: 3,
  /** 年＋月＋日 */
  FORMAT_YYYY_MM_DD: 1,
  /** 月＋日 */
  FORMAT_MM_DD: 2,
  /** 曜日表示なし */
  DATE_NOT_DISPLAY: 1,
  /** 曜日表示あり */
  DATE_DISPLAY: 2,
};

export const BUTTON_TEXT = {
  CANCEL: 'キャンセル',
  OK: 'OK',
  CLOSE: '閉じる',
};
export const LOG_AUTO = 'ログアウト';

/** 設定の情報 */
export const settingData: SettingData[] = [
  {
    list: {
      headline: '一覧リスト',
      item: [
        {
          label: LABEL.IMAGE_DISPLAY,
          data: [
            { text: 'あり', id: SETTING_ITEM_ID.IMAGE_DISPLAY },
            { text: 'なし', id: SETTING_ITEM_ID.IMAGE_NOT_DISPLAY },
          ],
        },
        {
          label: LABEL.DATE_FORMAT_DISPLAY,
          data: [
            {
              text: moment().format('YYYY年MM月DD日'),
              id: SETTING_ITEM_ID.FORMAT_JP,
            },
            {
              text: moment().format('YYYY/MM/DD'),
              id: SETTING_ITEM_ID.FORMAT_SLASH,
            },
            {
              text: moment().format('YYYY-MM-DD'),
              id: SETTING_ITEM_ID.FORMAT_HYPHEN,
            },
          ],
        },
        // 年月日の表示はフォーマットに依存する設定にする
        {
          label: LABEL.DATE_DISPLAY,
          data: [
            {
              text: moment().format('YYYY-MM-DD'),
              id: SETTING_ITEM_ID.FORMAT_YYYY_MM_DD,
            },
            {
              text: moment().format('MM-DD'),
              id: SETTING_ITEM_ID.FORMAT_MM_DD,
            },
          ],
        },
        {
          label: LABEL.DAY_OF_THE_WEEK_DISPLAY,
          data: [
            { text: 'なし', id: SETTING_ITEM_ID.DATE_NOT_DISPLAY },
            { text: 'あり', id: SETTING_ITEM_ID.DATE_DISPLAY },
          ],
        },
      ],
    },
  },
  {
    register: {
      headline: '登録',
      item: [
        {
          label: LABEL.MEMO_TEMPLATE,
          data: [],
        },
      ],
    },
  },
  {
    account: {
      headline: 'アカウント',
      item: [
        {
          label: LOG_AUTO,
          data: [],
        },
      ],
    },
  },
];

export const settingMemoData: MemoTemplateData[] = [
  {
    label: 'テンプレートAAA',
    id: 1,
    text: '【メモ】これはテストメモです',
  },
  {
    label: 'テンプレートB',
    id: 2,
    text: `【改行メモ】改行しました。\n\n\n改行しました。`,
  },
  {
    label: 'テンプレートC',
    id: 3,
    text: `【改行メモ】改行しました。\n\n\n改行しました。\n\n\n\n改行しました。`,
  },
  {
    label: 'テンプレートD',
    id: 4,
    text: `【改行メモ】改行しました。\n\n\n改行しました。\n\n\n\n改行しました。`,
  },
];
