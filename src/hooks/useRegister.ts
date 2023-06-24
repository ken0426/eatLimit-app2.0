import { useCallback, useState } from 'react';
import { PostData } from '../types';

/** 各項目を保存する形に生成するhooks */
export const useRegister = () => {
  const [postData, setPostData] = useState<PostData[]>([]);

  const setTargetPostData = useCallback(
    (post: PostData) => {
      setPostData((prevData) => {
        const hasPostData = postData.find((item) => item.key === post.key);
        if (hasPostData) {
          const newPostData = prevData.map((item) => {
            if (item.key === hasPostData.key) {
              return { key: post.key, value: post.value };
            } else {
              return item;
            }
          });
          return newPostData;
        } else {
          return [...prevData, post];
        }
      });
    },
    [postData]
  );

  return { setTargetPostData, postData };
};
