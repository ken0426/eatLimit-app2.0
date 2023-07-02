import { LABEL } from '../contents';
import { useRootSelector } from '../redux/store/store';
import { SettingItem, SettingItemData } from '../types';

export const commonSettingAdaptor = (data: SettingItem) => {
  const imageId = useRootSelector((state) => state.common.imageId);
  const dateFormatDisplayId = useRootSelector(
    (state) => state.common.dateFormatDisplayId
  );
  const dateDisplayId = useRootSelector((state) => state.common.dateDisplayId);
  const dayOfWeekId = useRootSelector((state) => state.common.dayOfWeekId);

  const isCheck = (id: number) => {
    if (data.label === LABEL.IMAGE_DISPLAY) {
      return id === imageId;
    } else if (data.label === LABEL.DATE_FORMAT_DISPLAY) {
      return id === dateFormatDisplayId;
    } else if (data.label === LABEL.DATE_DISPLAY) {
      return id === dateDisplayId;
    } else if (data.label === LABEL.DAY_OF_THE_WEEK_DISPLAY) {
      return id === dayOfWeekId;
    }
  };

  const editData = data.data.map((item: SettingItemData) => {
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
