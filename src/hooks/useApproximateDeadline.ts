import { useEffect, useState } from 'react';
import { LABEL_NAME, MANAGEMENT_SELECTED_TEXT } from '../contents';
import { ApiData, PostData } from '../types';

export const useApproximateDeadline = (
  postData: PostData[],
  copyData: { data: ApiData }
) => {
  const [approximateDeadline, setApproximateDeadline] = useState(
    copyData?.data?.approximateDeadline
  );
  const [plus, setPlus] = useState(0);

  useEffect(() => {
    const management = postData.find(
      (item) => item.key === LABEL_NAME.MANAGEMENT
    )?.value;
    const date = postData.find((item) => item.key === LABEL_NAME.DATE)?.value;
    if (
      (management === MANAGEMENT_SELECTED_TEXT.USE_BY_DATE ||
        management === MANAGEMENT_SELECTED_TEXT.BEST_BEFORE_DATE) &&
      typeof date === 'string'
    ) {
      setApproximateDeadline(date);
      setPlus(10);
    }
  }, [postData]);

  return {
    approximateDeadline,
    plus,
  };
};
