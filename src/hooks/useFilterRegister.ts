import { useCallback, useState } from 'react';
import { TargetFilterData } from '../types';

export const useFilterRegister = () => {
  const [filterData, setFilterData] = useState<TargetFilterData[]>([]);

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

  return {
    setTargetFilterData,
    filterData: filterData.filter(
      (item) =>
        typeof item.id === 'string' ||
        (Array.isArray(item.id) && item.id.length > 0)
    ),
  };
};
