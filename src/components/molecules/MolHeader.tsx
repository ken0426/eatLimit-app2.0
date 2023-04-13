import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { color } from '../../styles';

type HeaderProp = {
  children?: ReactNode;
  style?: object;
};

const MolHeader = ({ children, style }: HeaderProp) => {
  return <View style={style}>{children}</View>;
};

export default MolHeader;
