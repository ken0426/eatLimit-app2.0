import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import moment from 'moment';
import AtomDetailDateDisplay from '../atoms/AtomDetailDateDisplay';
import { COLORS, SIZE } from '../../styles';
import { ApiData } from '../../types';
import { useDateFormat } from '../../hooks/useDateFormat';
import { MANAGEMENT_SELECTED_TEXT } from '../../contents';

type Props = {
  item: ApiData;
};

const MolDetailDateDisplay: FC<Props> = ({ item }) => {
  const beforeDate = moment().isAfter(
    item.management === MANAGEMENT_SELECTED_TEXT.PURCHASE_DATE ||
      item.management === MANAGEMENT_SELECTED_TEXT.REGISTRATION_DATE
      ? item.approximateDeadline!
      : item.date,
    'day'
  );
  const dateText = useDateFormat(
    item.management === MANAGEMENT_SELECTED_TEXT.PURCHASE_DATE ||
      item.management === MANAGEMENT_SELECTED_TEXT.REGISTRATION_DATE
      ? item.approximateDeadline!
      : item.date
  );

  return (
    <View style={styles.dateContents}>
      <AtomDetailDateDisplay
        type={'materialIcons'}
        name={'timer'}
        iconColor={COLORS.TEXT_LABEL}
        text={dateText}
      />
      {beforeDate && (
        <AtomDetailDateDisplay
          type={'materialIcons'}
          name={'local-fire-department'}
          iconColor={COLORS.RED}
          textColor={styles.redText}
          text={'期限切れ'}
          style={styles.redTextStyle}
        />
      )}
    </View>
  );
};

export default MolDetailDateDisplay;

const styles = StyleSheet.create({
  dateContents: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZE.BASE_WP,
  },
  redText: {
    color: COLORS.RED,
  },
  redTextStyle: {
    marginLeft: SIZE.BASE_WP * 2,
  },
});
