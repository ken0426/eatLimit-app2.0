import { MaterialIcons } from '@expo/vector-icons';
import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTSIZE, SIZE } from '../../styles';

type Props = {
  onPress: () => void;
  text: string;
};

const MolSettingList: FC<Props> = ({ onPress, text }) => {
  return (
    <TouchableOpacity style={styles.touch} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
      <MaterialIcons name='navigate-next' size={26} color={COLORS.TEXT_COLOR} />
    </TouchableOpacity>
  );
};

export default MolSettingList;

const styles = StyleSheet.create({
  text: {
    fontSize: FONTSIZE.SIZE18PX,
  },
  touch: {
    width: '100%',
    backgroundColor: COLORS.WHITE,
    height: SIZE.BASE_HP * 6.5,
    borderBottomColor: COLORS.DETAIL_BORDER,
    borderBottomWidth: 0.2,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZE.BASE_WP * 2,
    flexDirection: 'row',
  },
});
