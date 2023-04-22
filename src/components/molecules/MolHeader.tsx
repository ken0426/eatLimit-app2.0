import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, ReactNode } from 'react';
import { View } from 'react-native';
import { color } from '../../styles';
import { StackPramList } from '../../types';
import MolDetailHeader from './MolDetailHeader';

type HeaderProp = {
  children?: ReactNode;
  style?: object;
  type: string;
  navigation?: StackNavigationProp<StackPramList>;
};

const MolHeader: FC<HeaderProp> = ({ children, style, type, navigation }) => {
  switch (type) {
    case 'home':
    case 'search':
      return <View style={style}>{children}</View>;
    case 'detail':
      return <MolDetailHeader navigation={navigation} />;
    default:
      return null;
  }
};

export default MolHeader;
