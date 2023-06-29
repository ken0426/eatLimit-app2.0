import { useRootSelector } from '../redux/store/store';

export const commonSettingAdaptor = (data: any) => {
  const imageId = useRootSelector((state) => state.common.imageId);
  const dateFormatDisplayId = useRootSelector(
    (state) => state.common.dateFormatDisplayId
  );
  const dateDisplayId = useRootSelector((state) => state.common.dateDisplayId);
  const dayOfWeekId = useRootSelector((state) => state.common.dayOfWeekId);

  const isCheck = (id: any) => {
    if (data.label === '画像表示') {
      return id === imageId;
    } else if (data.label === '年月日のフォーマット表示') {
      return id === dateFormatDisplayId;
    } else if (data.label === '年月日の表示') {
      return id === dateDisplayId;
    } else if (data.label === '曜日の表示') {
      return id === dayOfWeekId;
    }
  };

  const editData = data.data.map((item: any) => {
    return {
      text: item.text,
      check: isCheck(item.id),
      id: item.id,
    };
  });

  const newData = {
    label: data.label,
    data: editData,
  };

  return newData;
};
