import React, { FC } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTSIZE, SIZE } from '../../styles';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { ApiData } from '../../types';

type Props = {
  item: ApiData;
};

const AtomDetailMemo: FC<Props> = ({ item }) => {
  return (
    <View style={styles.contents}>
      <Text style={styles.label}>メモ</Text>
      <View style={styles.memoArea}>
        <ScrollView style={styles.scrollArea}>
          <Text style={styles.memoText}>{item.memo}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default AtomDetailMemo;

const styles = StyleSheet.create({
  contents: {
    marginTop: SIZE.BASE_WP * 3,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: SIZE.BASE_WP * 3,
    shadowOffset: { width: 0, height: 2 }, // ここで影のオフセットを設定
    shadowOpacity: 0.2, // 影の透明度
    shadowRadius: 1, // 影のぼかしの範囲
  },
  label: {
    fontSize: FONTSIZE.SIZE20PX,
    paddingVertical: SIZE.BASE_WP * 3,
  },
  memoArea: {
    paddingBottom: SIZE.BASE_WP * 6,
  },
  scrollArea: {
    maxHeight: heightPercentageToDP('40%'),
  },
  memoText: {
    fontSize: FONTSIZE.SIZE20PX,
  },
});
