import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, ReactNode } from 'react';
import { View } from 'react-native';
import { color } from '../../styles';
import { StackPramList } from '../../types';
import MolDetailHeader from './MolDetailHeader';
import { StyleSheet } from 'react-native';

type HeaderProp = {
  children?: ReactNode;
  style?: object;
  type: 'default' | 'detail';
};

const MolHeader: FC<HeaderProp> = ({ children, style, type }) => {
  const navigation = useNavigation<StackNavigationProp<StackPramList>>();
  switch (type) {
    case 'default':
      return <View style={[style, styles.default]}>{children}</View>;
    case 'detail':
      return <MolDetailHeader navigation={navigation} />;
    default:
      return null;
  }
};

export default MolHeader;

const styles = StyleSheet.create({
  default: {
    borderBottomColor: '#a1a1a1',
    borderBottomWidth: 0.5,
  },
});
