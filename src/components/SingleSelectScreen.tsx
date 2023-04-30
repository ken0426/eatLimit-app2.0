import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { StackPramList } from '../types';

type Props = {
  navigation: StackNavigationProp<StackPramList, 'singleSelectScreen'>;
};

const SingleSelectScreen: FC<Props> = () => {
  return <Text>SingleSelectScreen</Text>;
};

export default SingleSelectScreen;
