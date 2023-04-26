export type ApiData = {
  eatName: string;
  image?: string;
  data: string;
};

export type StackPramList = {
  homeScreen: undefined;
  detailScreen: { item: ApiData };
  searchScreen: undefined;
};
