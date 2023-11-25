import React, { FC } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';

type Props = {
  type:
    | 'ionicons'
    | 'entypo'
    | 'antDesign'
    | 'feather'
    | 'fontAwesome'
    | 'materialIcons'
    | 'materialCommunityIcons'
    | 'foundation';
  name: any; // TODO 将来的には型定義する
  size: number;
  color: string;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
};

const SvgIcon: FC<Props> = ({ type, name, size, color, style, onPress }) => {
  switch (type) {
    case 'ionicons':
      return <Ionicons name={name} size={size} color={color} style={style} />;
    case 'entypo':
      return <Entypo name={name} size={size} color={color} style={style} />;
    case 'antDesign':
      return <AntDesign name={name} size={size} color={color} style={style} />;
    case 'feather':
      return <Feather name={name} size={size} color={color} style={style} />;
    case 'fontAwesome':
      return (
        <FontAwesome name={name} size={size} color={color} style={style} />
      );
    case 'foundation':
      return <Foundation name={name} size={size} color={color} style={style} />;
    case 'materialIcons':
      return (
        <MaterialIcons name={name} size={size} color={color} style={style} />
      );
    case 'materialCommunityIcons':
      return (
        <MaterialCommunityIcons
          onPress={onPress}
          name={name}
          size={size}
          color={color}
          style={style}
        />
      );

    default:
      return <></>;
  }
};

export default SvgIcon;
