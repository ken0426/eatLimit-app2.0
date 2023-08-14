import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DatePicker } from 'react-native-woodpicker';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONTSIZE, INPUT_HEIGHT, SIZE } from '../../styles';
import AtomRequire from './AtomRequire';
import { PostData } from '../../types';

type Props = {
  date?: string;
  isRequired?: boolean;
  label: string;
  isLimit?: boolean;
  setData: ({ key, value }: PostData) => void;
};

const AtomDate: FC<Props> = ({
  date,
  isRequired = false,
  label,
  isLimit,
  setData,
}) => {
  const getDate = () => {
    if (date) {
      if (isLimit) {
        const currentDate = new Date(date);
        return new Date(currentDate.setDate(currentDate.getDate() + 10));
      } else {
        return new Date(date);
      }
    } else if (isLimit) {
      const currentDate = new Date();
      return new Date(currentDate.setDate(currentDate.getDate() + 10));
    } else {
      return new Date();
    }
  };

  const [pickedDate, setPickedDate] = useState<Date>(getDate());

  const handleText = () => {
    const year = pickedDate.getFullYear();
    const month = pickedDate.getMonth() + 1;
    const date = pickedDate.getDate();
    return `${year}年${month}月${date}日`;
  };

  useEffect(() => {
    const year = pickedDate.getFullYear();
    const month = pickedDate.getMonth() + 1;
    const date = pickedDate.getDate();
    const value = `${year}-${month >= 10 ? month : `0${month}`}-${
      date >= 10 ? date : `0${date}`
    }`;

    setData({
      key: label,
      value,
      isRequired,
    });
  }, [pickedDate]);

  // TODO 登録、変更画面で日付項目を入れた際に、期限目安もその日付から＋10日するロジックを追加する

  return (
    <View style={styles.contents}>
      {isRequired ? (
        <AtomRequire label={label} />
      ) : (
        <Text style={styles.label}>{label}：</Text>
      )}

      <View style={styles.selectArea}>
        <DatePicker
          textColor='#000000'
          textInputStyle={{ fontWeight: 'bold' }}
          value={pickedDate}
          doneButtonLabel={'完了'}
          text={handleText()}
          iosDisplay='spinner'
          androidDisplay='spinner'
          minimumDate={new Date('2000')}
          maximumDate={new Date('2100')}
          onDateChange={(e) => e && setPickedDate(e)}
          style={styles.datePicker}
          backdropAnimation={{ opacity: 0, duration: 0.3, delay: 1 }}
          // textInputStyle={{ color: 'red' }} ※消費期限または賞味期限が切れている場合は赤で表示する
        />
        <View style={styles.icon}>
          <MaterialIcons
            name='keyboard-arrow-down'
            size={20}
            color={COLORS.TEXT_COLOR}
          />
        </View>
      </View>
    </View>
  );
};

export default AtomDate;

const styles = StyleSheet.create({
  contents: {
    flexDirection: 'row',
    height: INPUT_HEIGHT,
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: COLORS.DETAIL_BORDER,
  },
  label: {
    fontSize: FONTSIZE.SIZE18PX,
    color: COLORS.TEXT_LABEL,
    fontWeight: '400',
  },
  requiredArea: {
    borderRadius: 10,
    backgroundColor: COLORS.RED,
    marginLeft: SIZE.BASE_WP * 1.5,
  },
  required: {
    fontSize: FONTSIZE.SIZE15PX,
    color: COLORS.WHITE,
    fontWeight: '400',
    paddingHorizontal: SIZE.BASE_WP * 2,
    paddingVertical: SIZE.BASE_HP * 0.1,
  },
  selectArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  datePicker: {
    height: '100%',
    shadowColor: '#000000',
  },
  icon: {
    height: '100%',
    justifyContent: 'center',
  },
});
