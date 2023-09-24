import { ImageSourcePropType } from 'react-native';

export type ApiData = {
  eatName: string;
  count: number;
  image?: string;
  date: string;
  approximateDeadline?: string;
  placeOfPurchase?: string;
  price?: number;
  management: '消費期限' | '賞味期限' | '購入日' | '登録日';
  keep: '冷凍' | '冷蔵' | '常温';
};

export type ManagementData = {
  text: '消費期限' | '賞味期限' | '購入日' | '登録日';
  image: undefined;
  selectColor: undefined;
};

export type KeepData = {
  text: '冷凍' | '冷蔵' | '常温';
  image: ImageSourcePropType;
  selectColor: string;
};

export type StackPramList = {
  topScreen: undefined;
  loginScreen: { isLogin: boolean };
  homeScreen: undefined;
  detailScreen: { item: ApiData };
  searchScreen: { data: ApiData[] };
  registerScreen: undefined;
  updateRegisterScreen: undefined;
  settingScreen: undefined;
  settingDetailScreen: { data: any };
  memoTemplateRegisterScreen: { data: { label: string; text: string }[] };
  memoTemplateUpdateScreen: { data: MemoTemplateData };
  settingMemoScreen: undefined;
};

export type ModalButton = {
  text: string;
  onPress: () => void;
};

export type AuthPostData = {
  key: string;
  value: string;
};

/** 項目ごとのデータ */
export type PostData = {
  key: string;
  value: string;
  isRequired: boolean;
};

/** 設定項目の単数項目の一つ一つのリスト */
export type SettingDataItem = {
  text: string;
  id: number;
};

/** 単数選択の設定項目 */
export type SettingItem = {
  label: string;
  data: SettingDataItem[];
};

/** 設定項目のメモテンプレートで選択する項目 */
export type SettingMemoSelectItem = {
  label: string;
  data: SettingDataItem[];
  isTemplate: boolean;
};

/** 設定画面 */
export type SettingData = {
  [key: string]: {
    headline: string;
    item: SettingItem[];
  };
};

/** 設定を保存する型 */
export type ListData = {
  text: string;
  check: boolean | undefined;
  id: number;
};

/** メモのテンプレートデータ */
export type MemoTemplateData = {
  label: string;
  id: number;
  text: string;
};

/** フィルター用の型 */
export type FilterData = {
  FILTER: {
    ELEMENT_NAME: string;
    LABEL: string;
    DATA: {
      text: string;
      id: string;
    }[];
  }[];
  SORT: {
    ELEMENT_NAME: string;
    LABEL: string;
    DATA: {
      text: string;
      id: string;
    }[];
  }[];
};

/** フィルターで選択したボタンのデータを保存し検索適用する型 */
export type TargetFilterData = {
  elementName: string;
  id: string | string[];
};

/** ログインのテキスト入力のエラーメッセージ */
export type HandleLoginType = {
  isLoginScreen: boolean;
  mailAddress: string;
  password: string;
  passwordConfirmation: string;
  setMailAddressErrorMessage: (e: string) => void;
  setPasswordErrorMessage: (e: string) => void;
  setPasswordConfirmationErrorMessage: (e: string) => void;
};
