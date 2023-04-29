import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { StackPramList } from '../types';

type Props = {
  navigation: StackNavigationProp<StackPramList, 'registerScreen'>;
};

const RegisterScreen: FC<Props> = () => {
  return <Text>RegisterScreen</Text>;
};

export default RegisterScreen;
