import moment from 'moment';

export const useListEdit = (
  imageId: number,
  dateFormatDisplayId: number,
  dateDisplayId: number,
  dayOfWeekId: number,
  date: string
) => {
  moment.updateLocale('ja', {
    weekdaysShort: ['日', '月', '火', '水', '木', '金', '土'],
  });
  const isImage = imageId == 1;

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
    } else if (dateFormatDisplayId === 3) {
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

  const dateText = getDate();

  return {
    isImage,
    dateText,
  };
};
