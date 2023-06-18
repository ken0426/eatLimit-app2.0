import React, { FC, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DatePicker } from 'react-native-woodpicker';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONTSIZE, INPUT_HEIGHT, SIZE } from '../../styles';

type Props = {
  date?: string;
  isRequired?: boolean;
};

const AtomDate: FC<Props> = ({ date, isRequired = false }) => {
  const [pickedDate, setPickedDate] = useState<Date>(
    date ? new Date(date) : new Date()
  );

  const handleText = () => {
    const year = pickedDate.getFullYear();
    const month = pickedDate.getMonth() + 1;
    const date = pickedDate.getDate();
    return `${year}年${month}月${date}日`;
  };

  return (
    <View style={styles.contents}>
      {isRequired ? (
        <>
          <Text style={styles.label}>日付</Text>
          <View style={styles.requiredArea}>
            <Text style={styles.required}>必須</Text>
          </View>
          <Text style={styles.label}>：</Text>
        </>
      ) : (
        <Text style={styles.label}>日付：</Text>
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
    color: '#ffffff',
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
