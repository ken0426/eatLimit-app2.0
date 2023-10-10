import { useCallback, useEffect, useState } from 'react';
import { TargetFilterData } from '../types';
import { FILTER_MODAL_SELECT_BUTTON_DATA } from '../contents/filterModalSelectButtonData';

export const useFilterRegister = (isRestButton: boolean) => {
  const firstFilterData = FILTER_MODAL_SELECT_BUTTON_DATA[0].FILTER.filter(
    (item) => item.DATA.length === 2
  );
  const firstSortData = FILTER_MODAL_SELECT_BUTTON_DATA[0].SORT.filter(
    (item) => item.DATA.length === 2
  );
  const singleData = [...firstFilterData, ...firstSortData];
  const singleEditData = singleData.map((item) => ({
    elementName: item.ELEMENT_NAME,
    id: '1',
  }));
  const [filterData, setFilterData] = useState<TargetFilterData[]>([
    ...singleEditData,
  ]);

  const setTargetFilterData = useCallback(
    (post: TargetFilterData) => {
      if (Array.isArray(post.id) && post.id.length === 0) {
        // 複数選択で選択したものが消えた時は元のデータからpostのデータを削除
        const newFilterData = filterData.filter(
          (item) => item.elementName !== post.elementName
        );
        setFilterData(newFilterData);
      } else {
        setFilterData((prevData) => {
          const hasPostData = filterData.find(
            (item) => item.elementName === post.elementName
          );
          if (hasPostData) {
            const newPostData = prevData.map((item) => {
              if (item.elementName === hasPostData.elementName) {
                return {
                  elementName: post.elementName,
                  id: post.id,
                };
              } else {
                return item;
              }
            });
            return newPostData;
          } else {
            return [...prevData, post];
          }
        });
      }
    },
    [filterData]
  );

  /** リセットボタンが押された時に初期状態のリストに戻すためのhook */
  useEffect(() => {
    if (isRestButton) {
      setFilterData([...singleEditData]);
    }
  }, [isRestButton]);

  return {
    setTargetFilterData,
    filterData: filterData.filter(
      (item) =>
        typeof item.id === 'string' ||
        (Array.isArray(item.id) && item.id.length > 0)
    ),
  };
};
