import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTSIZE, SIZE } from '../../styles';

type Props = {
  label?: string;
};

const AtomRequire: FC<Props> = ({ label = '日付' }) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.requiredArea}>
        <Text style={styles.required}>必須</Text>
      </View>
      <Text style={styles.label}>：</Text>
    </>
  );
};

export default AtomRequire;

const styles = StyleSheet.create({
  label: {
    fontSize: FONTSIZE.SIZE18PX,
    color: COLORS.TEXT_LABEL,
    fontWeight: '400', // ここ変更する（ライブラリ）
  },
  requiredArea: {
    borderRadius: 10,
    backgroundColor: COLORS.RED,
    marginLeft: SIZE.BASE_WP * 1.5,
  },
  required: {
    fontSize: FONTSIZE.SIZE15PX,
    color: COLORS.WHITE,
    fontWeight: '400', // ここ変更する（ライブラリ）
    paddingHorizontal: SIZE.BASE_WP * 2,
    paddingVertical: SIZE.BASE_HP * 0.1,
  },
});
