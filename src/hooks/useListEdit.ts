import moment from 'moment';

export const useListEdit = (
  imageId: number,
  dateFormatDisplayId: number,
  dateDisplayId: number,
  date: string
) => {
  const isImage = imageId == 1;

  const getDate = () => {
    if (dateFormatDisplayId === 1) {
      if (dateDisplayId === 1) {
        return moment(date).format('YYYY年MM月DD日');
      } else {
        return moment(date).format('MM月DD日');
      }
    } else if (dateFormatDisplayId === 2) {
      if (dateDisplayId === 1) {
        return moment(date).format('YYYY/MM/DD');
      } else {
        return moment(date).format('MM/DD');
      }
    } else if (dateFormatDisplayId === 3) {
      if (dateDisplayId === 1) {
        return moment(date).format('YYYY-MM-DD');
      } else {
        return moment(date).format('MM-DD');
      }
    }
  };

  const dateText = getDate();

  return {
    isImage,
    dateText,
  };
};
