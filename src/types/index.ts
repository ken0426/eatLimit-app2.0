import { ImageSourcePropType } from "react-native";

export type ApiData = {
  eatName: string;
  image?: string;
  date: string;
};

export type KeepData = {
  text: '冷凍' | '冷蔵' | '常温'
  image: ImageSourcePropType
  selectColor: string
}

export type StackPramList = {
  homeScreen: undefined;
  detailScreen: { item: ApiData };
  searchScreen: undefined;
  registerScreen: undefined;
  singleSelectScreen: undefined;
};
