import React, { FC, ReactNode } from 'react';
import { View } from 'react-native';
import MolDetailHeader from './MolDetailHeader';
import { StyleSheet } from 'react-native';
import { HEADER_TYPE } from '../../contents';

type HeaderProp = {
  children?: ReactNode;
  style?: object;
  type: 'default' | 'detail' | 'password_reset';
};

const MolHeader: FC<HeaderProp> = ({ children, style, type }) => {
  switch (type) {
    case HEADER_TYPE.DEFAULT:
      return <View style={[style, styles.default]}>{children}</View>;
    case HEADER_TYPE.PASSWORD_RESET:
      return <View style={style}>{children}</View>;
    case HEADER_TYPE.DETAIL:
      return <MolDetailHeader />;
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
