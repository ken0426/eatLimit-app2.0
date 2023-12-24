import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import AtomSingleItem from '../atoms/AtomSingleItem';
import { COLORS, SIZE } from '../../styles';
import { LABEL_TEXT, MANAGEMENT_SELECTED_TEXT } from '../../contents';
import { ApiData } from '../../types';
import { useDateFormat } from '../../hooks/useDateFormat';
import moment from 'moment';

type Props = {
  item: ApiData;
};

const MolDetailOthers: FC<Props> = ({ item }) => {
  let displayDate: string = '';
  if (item?.approximateDeadline) {
    const dateText = useDateFormat(item.approximateDeadline);
    displayDate = dateText;
  }

  return (
    <View style={styles.contents}>
      {(item.management === MANAGEMENT_SELECTED_TEXT.PURCHASE_DATE ||
        item.management === MANAGEMENT_SELECTED_TEXT.REGISTRATION_DATE) && (
        <AtomSingleItem value={item.date} label={item.management} />
      )}
      <AtomSingleItem value={item.management} label={LABEL_TEXT.MANAGEMENT} />
      <AtomSingleItem
        value={item.preservation}
        label={LABEL_TEXT.PRESERVATION}
      />
      <AtomSingleItem value={`${item.count}`} label={LABEL_TEXT.QUANTITY} />
      {item?.placeOfPurchase && (
        <AtomSingleItem
          value={item.placeOfPurchase}
          label={LABEL_TEXT.PLACE_OF_PURCHASE}
        />
      )}
      {item?.price && (
        <AtomSingleItem value={item.price} label={LABEL_TEXT.AMOUNT_OF_MONEY} />
      )}
      <AtomSingleItem
        value={moment(item.registerDate).format('YYYY-MM-DD HH:mm')}
        label={'最終更新日'}
      />
    </View>
  );
};

export default MolDetailOthers;

const styles = StyleSheet.create({
  contents: {
    backgroundColor: COLORS.WHITE,
    marginTop: SIZE.BASE_WP * 3,
    shadowOffset: { width: 0, height: 2 }, // ここで影のオフセットを設定
    shadowOpacity: 0.2, // 影の透明度
    shadowRadius: 1, // 影のぼかしの範囲
    elevation: 3,
  },
});
