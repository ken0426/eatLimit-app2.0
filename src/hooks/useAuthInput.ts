import { useCallback, useState } from 'react';
import { AuthPostData } from '../types';

export const useAuthInput = () => {
  const [postData, setPostData] = useState<AuthPostData[]>([]);

  const setTargetPostData = useCallback(
    (post: AuthPostData) => {
      setPostData((prevData) => {
        const hasPostData = postData.find((item) => item.key === post.key);
        if (hasPostData) {
          const newPostData = prevData.map((item) => {
            if (item.key === hasPostData.key) {
              return {
                key: post.key,
                value: post.value,
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
    },
    [postData]
  );

  return { setTargetPostData, postData };
};
