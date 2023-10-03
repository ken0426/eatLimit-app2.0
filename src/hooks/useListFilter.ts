import { useEffect, useState } from 'react';
import { LABEL_NAME } from '../contents';
import { ApiData, TargetFilterData } from '../types';
import moment from 'moment';

export const useListFilter = (
  /** DBからのレスポンスデータ */
  responseData: ApiData[],
  /** モーダルで選択したフィルターのボタンのデータ */
  filterData: TargetFilterData[],
  /** 一覧画面にセットする関数 */
  setListData: (e: ApiData[]) => void,
  /** モーダルの表示非表示のフラグ */
  isVisible: boolean
) => {
  const [listFilterData, setListFilterData] = useState<ApiData[]>(responseData);

  /** ================= フィルター ================= */
  useEffect(() => {
    let listData: ApiData[] = responseData;
    /** ================= 画像表示 ================= */
    const imageId = filterData.find(
      (item) => item.elementName === LABEL_NAME.IMAGE
    )?.id;
    if (imageId && imageId === '2') {
      listData = listData.filter((item) => item.image);
    } else {
      listData = [...listData];
    }

    /** ================= 期限切れのみ表示 ================= */
    const isBeforeDateId = filterData.find(
      (item) => item.elementName === 'isBeforeDate'
    )?.id;
    if (isBeforeDateId && isBeforeDateId === '2') {
      listData = listData.filter((item) => moment().isAfter(item.date, 'day'));
    } else {
      listData = [...listData];
    }

    setListFilterData(listData);
  }, [isVisible]);

  /** 最終的に一覧画面に表示するデータをセット */
  useEffect(() => {
    // TODO 最終的には「listFilterData」はフィルターをするので、別の変数に格納した値をセットする
    setListData(listFilterData);
  }, [listFilterData]);

  /** 検索画面に渡すデータ */
  return listFilterData;
};
