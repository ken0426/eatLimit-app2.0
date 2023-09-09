import { useEffect, useState } from 'react';
import moment from 'moment';
import { LABEL_NAME } from '../contents';
import { PostData } from '../types';

export const useDateError = (postData: PostData[], label: string) => {
  const [isDateErrorMessage, setIsDateErrorMessage] = useState(false);

  useEffect(() => {
    const approximateDeadlineData = postData.find(
      (item) => item.key === LABEL_NAME.APPROXIMATE_DEADLINE
    );
    const dateData = postData.find((item) => item.key === LABEL_NAME.DATE);
    if (
      approximateDeadlineData &&
      dateData &&
      !moment(dateData.value).isSameOrBefore(approximateDeadlineData.value) &&
      (label === '購入日' || label === '登録日')
    ) {
      setIsDateErrorMessage(true);
    } else {
      setIsDateErrorMessage(false);
    }
  }, [postData]);

  return {
    isDateErrorMessage,
  };
};
