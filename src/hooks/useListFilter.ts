import { useEffect, useState } from 'react';
import {
  LABEL_NAME,
  managementTextData,
  preservationTextData,
} from '../contents';
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

    /** 画像表示のボタンのIDを取得  */
    const imageId = filterData.find(
      (item) => item.elementName === LABEL_NAME.IMAGE
    )?.id;

    /** 期限切れのみ表示のボタンのIDを取得 */
    const beforeDateId = filterData.find(
      (item) => item.elementName === 'isBeforeDate'
    )?.id;

    /** 単数選択で何を選択しどのリストを表示するか決める共通ロジック */
    const getSingleSelectedData = (
      singleSelectedData: string,
      type: string
    ) => {
      listData = listData.filter((item) => {
        if (type === LABEL_NAME.IMAGE && singleSelectedData === '2') {
          return item.image;
        } else if (type === 'isBeforeDate' && singleSelectedData === '2') {
          return moment().isAfter(item.date, 'day');
        } else {
          return [...listData];
        }
      });
    };

    if (typeof imageId === 'string')
      getSingleSelectedData(imageId, LABEL_NAME.IMAGE);
    if (typeof beforeDateId === 'string')
      getSingleSelectedData(beforeDateId, 'isBeforeDate');

    /** ================= ここから複数選択 ================= */
    if (filterData.find((item) => Array.isArray(item.id))) {
      /** 管理方法のボタンのIDを取得  */
      const managementIds = filterData.find(
        (item) => item.elementName === LABEL_NAME.MANAGEMENT
      )?.id;

      /** 保存方法のボタンのIDを取得 */
      const keepIds = filterData.find(
        (item) => item.elementName === LABEL_NAME.PRESERVATION
      )?.id;

      /** 複数選択で何を選択しどのリストを表示するか決める共通ロジック */
      const getMultiSelectedData = (
        multiSelectedData: string[],
        type: string
      ) => {
        if (Array.isArray(multiSelectedData)) {
          const managementData: ApiData[] = [];
          multiSelectedData.forEach((item) => {
            const filterDisplayData = listData.filter((itm) => {
              if (type === LABEL_NAME.MANAGEMENT) {
                return itm.management === managementTextData[Number(item) - 1];
              } else {
                return (
                  itm.preservation === preservationTextData[Number(item) - 1]
                );
              }
            });
            managementData.push(...filterDisplayData);
          });
          listData = managementData;
        } else {
          listData = [...listData];
        }
      };

      if (Array.isArray(managementIds)) {
        getMultiSelectedData(managementIds, LABEL_NAME.MANAGEMENT);
      }
      if (Array.isArray(keepIds)) {
        getMultiSelectedData(keepIds, LABEL_NAME.PRESERVATION);
      }
    }

    setListFilterData(listData);
  }, [isVisible]);

  /** 最終的に一覧画面に表示するデータをセット */
  useEffect(() => {
    let listData = listFilterData;

    /** 最終更新日順のIDを取得 */
    const dateId = filterData.find(
      (item) => item.elementName === LABEL_NAME.DATE
    )?.id;

    /** 昇順降順のIDを取得 */
    const ascendingDescendingId = filterData.find(
      (item) => item.elementName === 'ascendingDescending'
    )?.id;

    if (ascendingDescendingId === '1') {
      listData = listData.sort((a, b) => {
        if (dateId === '1') {
          return moment(a.registerDate).isAfter(b.registerDate, 'second')
            ? -1
            : 1;
        } else {
          return moment(a.date).isAfter(b.date, 'day') ? -1 : 1;
        }
      });
    } else {
      listData = listData.sort((a, b) => {
        if (dateId === '1') {
          return moment(a.registerDate).isAfter(b.registerDate, 'second')
            ? 1
            : -1;
        } else {
          return moment(a.date).isAfter(b.date, 'day') ? 1 : -1;
        }
      });
    }

    setListData(listData);
  }, [listFilterData]);
};
