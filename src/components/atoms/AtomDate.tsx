import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DatePicker } from 'react-native-woodpicker';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONTSIZE, SIZE } from '../../styles';
import AtomRequire from './AtomRequire';
import { PostData } from '../../types';

type Props = {
  date?: string;
  isRequired?: boolean;
  label: string;
  isLimit?: boolean;
  setData: ({ key, value }: PostData) => void;
  errorMessage: string;
  selectedDate?: string;
};

const AtomDate: FC<Props> = ({
  date,
  isRequired = false,
  label,
  isLimit,
  setData,
  errorMessage,
  selectedDate,
}) => {
  const getDate = () => {
    if (date) {
      if (isLimit && selectedDate) {
        const currentDate = new Date(selectedDate);
        return new Date(currentDate.setDate(currentDate.getDate() + 10));
      } else {
        return new Date(date);
      }
    } else if (isLimit && selectedDate) {
      const currentDate = new Date(selectedDate);
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

  return (
    <View style={styles.contents}>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <View style={styles.labelArea}>
          {isRequired ? (
            <AtomRequire label={label} />
          ) : (
            <Text style={styles.label}>{label}：</Text>
          )}
        </View>

        <View style={styles.selectArea}>
          <View style={{ flexDirection: 'row' }}>
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
      </View>
      {/* TODO 日付の計算をしてエラーメッセージを表示する */}
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
};

export default AtomDate;

const styles = StyleSheet.create({
  contents: {
    paddingVertical: SIZE.BASE_WP * 3.5,
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: COLORS.DETAIL_BORDER,
  },
  labelArea: {
    flexDirection: 'row',
    alignItems: 'center',
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
    alignItems: 'flex-end',
  },
  datePicker: {
    height: '100%',
    shadowColor: '#000000',
  },
  icon: {
    height: '100%',
    justifyContent: 'center',
  },
  errorMessage: {
    color: COLORS.RED,
    marginTop: 10,
    width: '100%',
    textAlign: 'right',
  },
});
