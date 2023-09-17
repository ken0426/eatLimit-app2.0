import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTSIZE, SIZE } from '../../styles';

type Props = {
  text: string;
  id: string;
};

const AtomFilterSelectButton: FC<Props> = ({ text, id }) => {
  return (
    <TouchableOpacity style={[styles.button]}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default AtomFilterSelectButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    width: '49%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.TEXT_INPUT,
    marginBottom: SIZE.BASE_WP * 1.6,
  },
  buttonText: {
    fontSize: FONTSIZE.SIZE15PX,
    paddingHorizontal: SIZE.BASE_WP * 3,
    paddingVertical: SIZE.BASE_HP * 1.5,
  },
});
