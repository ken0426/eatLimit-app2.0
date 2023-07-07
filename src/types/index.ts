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
  settingScreen: undefined | { data: any };
  settingDetailScreen: { data: any };
  memoTemplateRegisterScreen: { data: any };
  memoTemplateUpdateScreen: { data: any };
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

export type SettingItemData = {
  text: string;
  id: number;
};

export type SettingData = {
  list: {
    headline: string;
    item: ListItem[];
  };
};

export type ListItem = {
  label: string;
  data: ListData[];
};

export type ListData = {
  text: string;
  id: number;
};

export type RegisterData = {
  register: {
    headline: string;
    item: RegisterItem[];
  };
};

export type RegisterItem = {
  label: string;
  data: RegisterDataItem[];
};

export type RegisterDataItem = {
  memoSection?: {
    headline: string;
    item: MemoSectionItem[];
  };
  memoList?: {
    headline: string;
    item: MemoListItem[];
  };
};

export type MemoSectionItem = {
  label: string;
  data: MemoSectionData[];
  isTemplate: boolean;
};

export type MemoSectionData = {
  id: number;
  text: string;
};

export type MemoListItem = {
  label: string;
  isMemoTemplate: boolean;
  id: number;
  input: string;
};

/** 設定を保存する型 */
export type ListDataA = {
  text: string;
  check: boolean | undefined;
  id: number;
};
