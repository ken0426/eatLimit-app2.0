import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTSIZE, SIZE } from '../../styles';
import SvgIcon from '../../images/SvgIcon';

type Props = {
  onPress: () => void;
  text: string;
};

const MolSettingList: FC<Props> = ({ onPress, text }) => {
  return (
    <TouchableOpacity style={styles.touch} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
      <SvgIcon
        type={'materialIcons'}
        name='navigate-next'
        size={26}
        color={COLORS.TEXT_COLOR}
      />
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
    height: SIZE.BASE_WP * 15,
    borderBottomColor: COLORS.DETAIL_BORDER,
    borderBottomWidth: SIZE.BASE_WP * 0.07,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZE.BASE_WP * 2,
    flexDirection: 'row',
  },
});
