import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTSIZE, SIZE } from '../../styles';
import { ApiData } from '../../types';

type Props = {
  listData: ApiData[];
};

const AtomCountDisplay: FC<Props> = ({ listData }) => {
  return (
    <View style={styles.contents}>
      <Text style={styles.text}>{`件数：${listData.length}件`}</Text>
    </View>
  );
};

export default AtomCountDisplay;

const styles = StyleSheet.create({
  contents: {
    borderBottomColor: COLORS.BORDER_LINE,
    borderBottomWidth: 1,
    marginBottom: -1,
    zIndex: 2,
  },
  text: {
    paddingVertical: SIZE.BASE_WP,
    paddingHorizontal: SIZE.BASE_WP,
    fontSize: FONTSIZE.SIZE15PX,
  },
});
