import React, { FC } from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity } from 'react-native';

type Props = {
  onPress: () => void;
  style: StyleProp<TextStyle>;
  label: string;
};

const AtomButton: FC<Props> = ({ onPress, style, label }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={style}>{label}</Text>
    </TouchableOpacity>
  );
};

export default AtomButton;
