import { ImageSourcePropType } from 'react-native';

export type ApiData = {
  eatName: string;
  image?: string;
  date: string;
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
