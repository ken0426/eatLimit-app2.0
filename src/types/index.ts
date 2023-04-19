export type ApiData = {
  eatName: string;
  image?: string;
};

export type StackPramList = {
  homeScreen: undefined;
  detailScreen: undefined | { item: ApiData };
  searchScreen: undefined;
};
