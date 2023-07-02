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
  TopScreen: undefined;
  homeScreen: undefined;
  detailScreen: { item: ApiData };
  searchScreen: { data: ApiData[] };
  registerScreen: undefined;
  updateRegisterScreen: undefined;
  settingScreen: { item: any };
  settingDetailScreen: { data: any };
};

export type ModalButton = {
  text: string;
};

/** 項目ごとのデータ */
export type PostData = {
  key: string;
  value: string;
  isRequired: boolean;
};

export type SettingItem = {
  label: string;
  data: SettingItemData[];
};

export type SettingItemData = {
  text: string;
  id: number;
};

/** 設定のデータ */
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
