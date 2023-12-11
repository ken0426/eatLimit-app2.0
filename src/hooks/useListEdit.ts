import moment from 'moment';
import { useRootSelector } from '../redux/store/store';

export const useListEdit = (date: string) => {
  const dateFormatDisplayId = useRootSelector(
    (state) => state.common.dateFormatDisplayId
  );
  const dateDisplayId = useRootSelector((state) => state.common.dateDisplayId);
  const dayOfWeekId = useRootSelector((state) => state.common.dayOfWeekId);

  moment.updateLocale('ja', {
    weekdaysShort: ['日', '月', '火', '水', '木', '金', '土'],
  });

  const getDate = () => {
    if (dateFormatDisplayId === 1) {
      if (dateDisplayId === 1) {
        if (dayOfWeekId === 2) {
          return moment(date).format('YYYY年MM月DD日（ddd）');
        } else {
          return moment(date).format('YYYY年MM月DD日');
        }
      } else {
        if (dayOfWeekId === 2) {
          return moment(date).format('MM月DD日（ddd）');
        } else {
          return moment(date).format('MM月DD日');
        }
      }
    } else if (dateFormatDisplayId === 2) {
      if (dateDisplayId === 1) {
        if (dayOfWeekId === 2) {
          return moment(date).format('YYYY/MM/DD（ddd）');
        } else {
          return moment(date).format('YYYY/MM/DD');
        }
      } else {
        if (dayOfWeekId === 2) {
          return moment(date).format('MM/DD（ddd）');
        } else {
          return moment(date).format('MM/DD');
        }
      }
    } else {
      if (dateDisplayId === 1) {
        if (dayOfWeekId === 2) {
          return moment(date).format('YYYY-MM-DD（ddd）');
        } else {
          return moment(date).format('YYYY-MM-DD');
        }
      } else {
        if (dayOfWeekId === 2) {
          return moment(date).format('MM-DD（ddd）');
        } else {
          return moment(date).format('MM-DD');
        }
      }
    }
  };

  const dateText: string = getDate();

  return {
    dateText,
  };
};
