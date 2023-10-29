import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONTSIZE, INPUT_HEIGHT, SIZE } from '../../styles';

const AtomTagSelect = () => {
  return (
    <TouchableOpacity onPress={() => {}} style={styles.itemArea}>
      <Text style={styles.label}>タグ：</Text>
      <View style={styles.displayTagAra}>
        {/* TODO ここはループさせ、タグが2つ以上の場合は最後のタグ以外はカンマを付ける */}
        <Text style={styles.text}>タグテスト</Text>
      </View>
      <View>
        <MaterialIcons
          name='keyboard-arrow-down'
          size={20}
          color={COLORS.TEXT_COLOR}
        />
      </View>
    </TouchableOpacity>
  );
};

export default AtomTagSelect;

const styles = StyleSheet.create({
  itemArea: {
    flexDirection: 'row',
    minHeight: INPUT_HEIGHT,
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: COLORS.DETAIL_BORDER,
  },
  label: {
    fontSize: FONTSIZE.SIZE18PX,
    color: COLORS.TEXT_LABEL,
    fontWeight: '400',
  },
  displayTagAra: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: FONTSIZE.SIZE18PX,
    fontWeight: 'bold',
    paddingVertical: SIZE.BASE_WP,
  },
});
