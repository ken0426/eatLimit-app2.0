import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTSIZE, SIZE } from '../../styles';
import { ApiData } from '../../types';
import AtomDetailDateDisplay from '../atoms/AtomDetailDateDisplay';
import moment from 'moment';

type Props = {
  item: ApiData;
};

const MolDetailTopItem: FC<Props> = ({ item }) => {
  const beforeDate = moment().isAfter(item.date, 'day');
  return (
    <View>
      <View style={styles.contents}>
        <Text style={styles.eatName}>{item.eatName}</Text>
        <View style={styles.dateContents}>
          <AtomDetailDateDisplay
            type={'materialIcons'}
            name={'timer'}
            iconColor={COLORS.TEXT_LABEL}
            text={item.date}
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
      </View>
    </View>
  );
};

export default MolDetailTopItem;

const styles = StyleSheet.create({
  contents: {
    backgroundColor: COLORS.WHITE,
    padding: SIZE.BASE_WP * 3,
    shadowOffset: { width: 0, height: 2 }, // ここで影のオフセットを設定
    shadowOpacity: 0.2, // 影の透明度
    shadowRadius: 1, // 影のぼかしの範囲
  },
  eatName: {
    fontSize: FONTSIZE.SIZE30PX,
    fontWeight: 'bold',
    marginVertical: SIZE.BASE_WP,
  },
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
