import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTSIZE, INPUT_HEIGHT } from '../../styles';

const AtomTagSelect = () => {
  return (
    <TouchableOpacity onPress={() => {}} style={styles.itemArea}>
      <Text style={styles.label}>タグ：</Text>
    </TouchableOpacity>
  );
};

export default AtomTagSelect;

const styles = StyleSheet.create({
  itemArea: {
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
});
