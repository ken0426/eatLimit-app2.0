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
  settingScreen:
    | undefined
    | {
        data: {
          data: {
            [key: string]: {
              headline: string;
              item: SettingMemoSelectItem[];
            };
          }[];
          label: string;
        };
      };
  settingDetailScreen: { data: any };
  memoTemplateRegisterScreen: { data: { label: string; text: string }[] };
  memoTemplateUpdateScreen: { data: SettingMemoEditItem };
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

/** 設定項目のメモの編集をする項目 */
export type SettingMemoEditItem = {
  label: string;
  isMemoTemplate: boolean;
  id: number;
  input: string;
};

/** 設定画面の項目 */
export type SettingMemoItem = {
  label: string;
  data: {
    [key: string]: {
      headline: string;
      item: SettingMemoSelectItem[] | SettingMemoEditItem[];
    };
  }[];
};

/** 設定画面 */
export type SettingData = {
  [key: string]: {
    headline: string;
    item: SettingItem[] | SettingMemoItem[];
  };
};

/** 設定を保存する型 */
export type ListData = {
  text: string;
  check: boolean | undefined;
  id: number;
};
