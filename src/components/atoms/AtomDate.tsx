import React, { FC, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DatePicker } from 'react-native-woodpicker';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONTSIZE, INPUT_HEIGHT } from '../../styles';

type Props = {
  date?: string;
};

const AtomDate: FC<Props> = ({ date }) => {
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
      <Text style={styles.label}>日付：</Text>
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
            color={COLORS.textColor}
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
    borderBottomColor: COLORS.detailBorderColor,
  },
  label: {
    fontSize: FONTSIZE.SIZE18PX,
    color: COLORS.textLabel,
    fontWeight: '400',
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
