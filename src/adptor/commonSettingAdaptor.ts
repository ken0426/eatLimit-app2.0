import { useRootSelector } from '../redux/store/store';

export const commonSettingAdaptor = (data: any) => {
  const imageId = useRootSelector((state) => state.common.imageId);
  const dateFormatDisplayId = useRootSelector(
    (state) => state.common.dateFormatDisplayId
  );
  const dateDisplayId = useRootSelector((state) => state.common.dateDisplayId);

  const editData = data.data.map((item: any) => {
    if (data.label === '画像表示') {
      return {
        text: item.text,
        check: item.id === imageId,
        id: item.id,
      };
    } else if (data.label === '年月日のフォーマット表示') {
      return {
        text: item.text,
        check: item.id === dateFormatDisplayId,
        id: item.id,
      };
    } else if (data.label === '年月日の表示') {
      return {
        text: item.text,
        check: item.id === dateDisplayId,
        id: item.id,
      };
    }
  });

  const newData = {
    label: data.label,
    data: editData,
  };

  return newData;
};
