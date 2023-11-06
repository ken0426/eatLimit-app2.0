import React, { FC } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';

type Props = {
  type: 'ionicons' | 'entypo';
  name: any; // TODO 将来的には型定義する
  size: number;
  color: string;
  style: StyleProp<TextStyle>;
};

const SvgIcon: FC<Props> = ({ type, name, size, color, style }) => {
  switch (type) {
    case 'ionicons':
      return <Ionicons name={name} size={size} color={color} style={style} />;
    case 'entypo':
      return <Entypo name={name} size={size} color={color} style={style} />;

    default:
      return <></>;
  }
};

export default SvgIcon;
