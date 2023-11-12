import { useEffect, useState } from 'react';
import moment from 'moment';
import { LABEL_NAME, MANAGEMENT_SELECTED_TEXT } from '../contents';
import { PostData } from '../types';

export const useDateError = (postData: PostData[], label: string) => {
  const [isDateErrorMessage, setIsDateErrorMessage] = useState(false);

  useEffect(() => {
    const approximateDeadlineData = postData.find(
      (item) => item.key === LABEL_NAME.APPROXIMATE_DEADLINE
    );
    const dateData = postData.find((item) => item.key === LABEL_NAME.DATE);
    if (
      typeof approximateDeadlineData?.value === 'string' &&
      typeof dateData?.value === 'string' &&
      !moment(dateData.value).isSameOrBefore(approximateDeadlineData.value) &&
      (label === MANAGEMENT_SELECTED_TEXT.PURCHASE_DATE ||
        label === MANAGEMENT_SELECTED_TEXT.REGISTRATION_DATE)
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
