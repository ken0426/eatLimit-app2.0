import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTSIZE, SIZE } from '../../styles';

type Props = {
  value: string | number;
  label: string;
};

const AtomSingleItem: FC<Props> = ({ value, label }) => {
  return (
    <View style={styles.itemArea}>
      <Text style={styles.label}>{label}</Text>
      <Text style={{ fontSize: FONTSIZE.SIZE20PX, fontWeight: 'bold' }}>
        {typeof value === 'string' ? value : `${value}円`}
      </Text>
    </View>
  );
};

export default AtomSingleItem;

const styles = StyleSheet.create({
  itemArea: {
    height: SIZE.BASE_HP * 6,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZE.BASE_WP * 3,
    borderBottomWidth: SIZE.BASE_HP * 0.04,
    borderBottomColor: COLORS.DETAIL_BORDER,
  },
  label: {
    width: '40%',
    fontSize: FONTSIZE.SIZE20PX,
  },
});
