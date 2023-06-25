import { useRootSelector } from '../redux/store/store';

export const commonSettingAdaptor = (data: any) => {
  const imageId = useRootSelector((state) => state.common.imageId);

  const editData = data.data.map((item: any) => {
    if (data.label === '画像表示') {
      return {
        text: item.text,
        check: item.id === imageId,
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
