import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTSIZE, SIZE } from '../../styles';
import { ApiData } from '../../types';
import MolDetailDateDisplay from './MolDetailDateDisplay';

type Props = {
  item: ApiData;
};

const MolDetailTopItem: FC<Props> = ({ item }) => {
  return (
    <View>
      <View style={styles.contents}>
        <Text style={styles.eatName}>{item.eatName}</Text>
        <MolDetailDateDisplay item={item} />
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
});
