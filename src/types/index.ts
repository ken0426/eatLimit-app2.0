export type ApiData = {
  eatName: string;
  image?: string;
  date: string;
};

export type StackPramList = {
  homeScreen: undefined;
  detailScreen: { item: ApiData };
  searchScreen: undefined;
  registerScreen: undefined;
  singleSelectScreen: undefined;
};
