import { useEffect, useState } from 'react';
import { ApiData, PostData, StackPramList } from '../types';
import { LABEL_NAME } from '../contents';
import { RouteProp, useRoute } from '@react-navigation/native';

type RouteItem = {
  params: {
    data: ApiData;
  };
};

export const useCopyEdit = (
  postData: PostData[],
  setTargetPostData: (post: PostData) => void,
  setLabel: (e: string) => void
) => {
  const route = useRoute<
    RouteProp<StackPramList, 'registerScreen'> & RouteItem
  >();
  /** データをセットする時に無限ループを停止する */
  const [isRoute, setIsRoute] = useState(route.params ? true : false);

  useEffect(() => {
    if (route.params) {
      const data = route.params.data;
      const getValue = (item: PostData) => {
        switch (item.key) {
          /** 商品名 */
          case LABEL_NAME.PRODUCT:
            return data.eatName;
          /** 個数 */
          case LABEL_NAME.QUANTITY:
            return String(data.count);
          /** 管理方法 */
          case LABEL_NAME.MANAGEMENT:
            return data.management;
          /** 保存方法 */
          case LABEL_NAME.PRESERVATION:
            return data.preservation;
          /** 日付 */
          case LABEL_NAME.DATE:
            return data.date;
          /** 期限目安 */
          case LABEL_NAME.APPROXIMATE_DEADLINE:
            return data.approximateDeadline;
          /** 購入場所 */
          case LABEL_NAME.PLACE_OF_PURCHASE:
            return data.placeOfPurchase;
          /** 金額 */
          case LABEL_NAME.AMOUNT_OF_MONEY:
            return String(data.price ?? '');
          default:
            return item.value;
        }
      };

      if (postData.length && isRoute) {
        const postEditData = postData.map((item) => ({
          key: item.key,
          value: getValue(item),
          isRequired: item.isRequired,
        }));

        postEditData.map((item) =>
          setTargetPostData({
            key: item.key,
            value: item.value ?? '',
            isRequired: item.isRequired,
          })
        );

        if (data.management === '購入日' || data.management === '登録日')
          setLabel(data.management);

        setIsRoute(false);
      }
    }
  }, [route, postData]);
};
