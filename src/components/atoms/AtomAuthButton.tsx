import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FONTSIZE, SIZE } from '../../styles';

type Props = {
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
  text: string;
};

const AtomAuthButton: FC<Props> = ({
  onPress,
  backgroundColor,
  textColor,
  text,
}) => {
  return (
    <TouchableOpacity
      style={[styles.touch, { backgroundColor }]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default AtomAuthButton;

const styles = StyleSheet.create({
  touch: {
    width: '100%',
    alignItems: 'center',
    borderRadius: 50,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 }, // ここで影のオフセットを設定
    shadowOpacity: 0.2, // 影の透明度
    shadowRadius: 1, // 影のぼかしの範囲
    paddingVertical: SIZE.BASE_WP * 2,
  },
  text: {
    fontSize: FONTSIZE.SIZE25PX,
    paddingVertical: SIZE.BASE_HP * 0.7,
    color: '#fcfcfc',
  },
});
