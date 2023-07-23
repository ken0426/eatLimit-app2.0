import { LABEL } from '../contents';
import { useRootSelector } from '../redux/store/store';

/** TODO リファクタリング必須項目 */
type Data = {
  label: string;
  isTemplate?: boolean;
  data: {
    text: string;
    id: number;
  }[];
};

/** チェックをつけるロジック */
export const commonSettingAdaptor = (data: Data) => {
  const imageId = useRootSelector((state) => state.common.imageId);
  const dateFormatDisplayId = useRootSelector(
    (state) => state.common.dateFormatDisplayId
  );
  const dateDisplayId = useRootSelector((state) => state.common.dateDisplayId);
  const dayOfWeekId = useRootSelector((state) => state.common.dayOfWeekId);
  const selectMemoTemplate = useRootSelector(
    (state) => state.common.selectMemoTemplate
  );

  const isCheck = (id: number) => {
    if (data.label === LABEL.IMAGE_DISPLAY) {
      return id === imageId;
    } else if (data.label === LABEL.DATE_FORMAT_DISPLAY) {
      return id === dateFormatDisplayId;
    } else if (data.label === LABEL.DATE_DISPLAY) {
      return id === dateDisplayId;
    } else if (data.label === LABEL.DAY_OF_THE_WEEK_DISPLAY) {
      return id === dayOfWeekId;
    } else if (data.isTemplate) {
      return id === selectMemoTemplate.id;
    }
  };

  const selectData = data.isTemplate
    ? [{ id: 0, text: 'テンプレートなし' }, ...data.data]
    : data.data;

  const editData = selectData.map((item) => {
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
