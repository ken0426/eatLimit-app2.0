import React, { FC } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';

type Props = {
  type: 'ionicons' | 'entypo';
  name: any;
  color: string;
  style: StyleProp<TextStyle>;
};

const SvgIcon: FC<Props> = ({ type, name, color, style }) => {
  switch (type) {
    case 'ionicons':
      return <Ionicons name={name} size={28} color={color} style={style} />;
    case 'entypo':
      return <Entypo name={name} size={28} color={color} style={style} />;

    default:
      return <></>;
  }
};

export default SvgIcon;
