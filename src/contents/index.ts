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

/** 必須項目です */
export const REQUIRED_ITEM = '必須項目です';

/** パスワード再設定用のメッセージ */
export const MAIL_ADDRESS_VALIDATION_MESSAGE = {
  NO_TEXT: 'メールアドレスを入力してください',
  INVALID_EMAIL: 'メールアドレスを正しく入力してください',
  INVALID_EMAIL_ADDRESS: 'メールアドレスが正しくありません',
  SUCCESS:
    'メールを送信しました\nメール内のリンクからパスワードの再設定を行ってください。',
};

/** パスワード変更のエラーメッセージ */
export const PASSWORD_CHANGE_MESSAGE = {
  /** パスワードを入力してください */
  NO_TEXT: 'パスワードを入力してください',
  /** パスワードが正しくありません */
  INVALID_PASSWORD: 'パスワードが正しくありません',
  /** パスワードには大文字と小文字を含める必要があります */
  INVALID_CASE: 'パスワードには大文字と小文字を含める必要があります',
  /** パスワードは半角英数字にしてください\nまた記号を含める場合は「@」「-」「_」となります */
  INVALID_SYMBOL:
    'パスワードは半角英数字にしてください\nまた記号を含める場合は「@」「-」「_」となります',
  /** パスワードには半角英数字を組み合わせてください */
  INVALID_LENGTH: 'パスワードには半角英数字を組み合わせてください',
  /** パスワードが一致しません */
  INVALID_MATCH: 'パスワードが一致しません',
  /** パスワードは7文字以上にしてください */
  INVALID_SEVEN_LENGTH: 'パスワードは7文字以上にしてください',
};

export const HEADER_TYPE = {
  DEFAULT: 'default',
  DETAIL: 'detail',
  PASSWORD_RESET: 'password_reset',
  MAIL_ADDRESS_UPDATE: 'mail_address_update',
} as const;

/** 画像の表示がある場合 */
export const DISPLAY_IMAGE_ID = 1;

/** 管理方法の文字列のデータ */
export const managementTextData = [
  '消費期限',
  '賞味期限',
  '購入日',
  '登録日',
] as const;

/** 保存方法の文字列のデータ */
export const preservationTextData = ['冷蔵', '冷凍', '常温'] as const;

/** 登録画面や絞り込み検索のモーダルで使用する項目の定義 */
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
  /** 期限切れのみ表示 */
  BEFORE_DATE: 'beforeDate',
  /** 昇順/降順 */
  ASCENDING_DESCENDING: 'ascendingDescending',
  /** タグ */
  TAG: 'tag',
  /** 画像を保存する時に使用するID */
  IMAGE_ID: 'imageId',
};

/** 登録画面に表示するラベルのテキスト */
export const LABEL_TEXT = {
  /** 商品名 */
  PRODUCT: '商品名',
  /** 個数 */
  QUANTITY: '個数',
  /** 管理方法 */
  MANAGEMENT: '管理方法',
  /** 日付 */
  DATE: '日付',
  /** 期限目安 */
  APPROXIMATE_DEADLINE: '期限目安',
  /** 保存方法 */
  PRESERVATION: '保存方法',
  /** 購入場所 */
  PLACE_OF_PURCHASE: '購入場所',
  /** 金額 */
  AMOUNT_OF_MONEY: '金額',
};

/** 管理方法の選択するテキスト */
export const MANAGEMENT_SELECTED_TEXT = {
  /** 消費期限 */
  USE_BY_DATE: '消費期限',
  /** 賞味期限 */
  BEST_BEFORE_DATE: '賞味期限',
  /** 購入日 */
  PURCHASE_DATE: '購入日',
  /** 登録日 */
  REGISTRATION_DATE: '登録日',
} as const;

export const SAVE_TYPE = {
  ADD: 'add',
  UPDATE: 'update',
} as const;

/** メールアドレス変更画面で使用するインプットのキー */
export const MAIL_ADDRESS_UPDATE_INPUT_KEY = {
  MAIL_ADDRESS: 'mailAddress',
  NEW_MAIL_ADDRESS: 'newMailAddress',
} as const;

/** パスワード変更画面で使用するインプットのキー */
export const PASSWORD_UPDATE_INPUT_KEY = {
  PASSWORD: 'password',
  NEW_PASSWORD: 'newPassword',
  NEW_PASSWORD_CONFIRMATION: 'newPasswordConfirmation',
} as const;

/** 管理方法のデータ */
export const managementData: ManagementData[] = [
  {
    text: MANAGEMENT_SELECTED_TEXT.USE_BY_DATE,
    image: undefined,
    selectColor: undefined,
  },
  {
    text: MANAGEMENT_SELECTED_TEXT.BEST_BEFORE_DATE,
    image: undefined,
    selectColor: undefined,
  },
  {
    text: MANAGEMENT_SELECTED_TEXT.PURCHASE_DATE,
    image: undefined,
    selectColor: undefined,
  },
  {
    text: MANAGEMENT_SELECTED_TEXT.REGISTRATION_DATE,
    image: undefined,
    selectColor: undefined,
  },
];

/** カウントにセットできるテキスト */
export const REGISTER_COUNT_TEXT = {
  /** 最大値 */
  MAX: 999,
  /** 最小値 */
  MIN: 1,
};

/** 絞り込み検索モーダル */
export const FILTER_TAB_BAR = {
  /** フィルタータブ */
  FILTER: 0,
  /** 並び替えタブ */
  SORT: 1,
  /** タグ */
  TAG: 2,
} as const;

/** メールアドレスのバリデーションチェック */
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
  /** タグ作成 */
  TAG_REGISTER: 'タグ作成',
  /** タグの編集 */
  TAG_EDIT: 'タグ編集と並び替え',
  /** パスワード変更 */
  PASSWORD_CHANGE: 'パスワード変更',
  /** メールアドレス変更 */
  MAIL_ADDRESS_UPDATE: 'メールアドレス変更',
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
  DECISION: '決定',
  CLOSE: '閉じる',
};

export const LOG_AUTO = 'ログアウト';

/** モーダルメッセージ */
export const MODAL_MESSAGE = {
  REQUIRED: '必須項目が入力されていません',
  DATE_ERROR: '日付項目を正しく入力してください',
  QUANTITY: '個数は999までです',
  TAG_DELETE: `タグを削除します。\nよろしいですか？`,
};

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
          label: LABEL.TAG_REGISTER,
          data: [],
        },
        {
          label: LABEL.TAG_EDIT,
          data: [],
        },
        {
          label: LABEL.MEMO_TEMPLATE,
          data: [],
        },
      ],
    },
  },
  {
    account: {
      headline: 'ユーザー設定',
      item: [
        {
          label: 'テーマカラー',
          data: [],
        },
        {
          label: 'メールアドレス変更',
          data: [],
        },
        {
          label: 'パスワード変更',
          data: [],
        },
        {
          label: LOG_AUTO,
          data: [],
        },
      ],
    },
  },
];
