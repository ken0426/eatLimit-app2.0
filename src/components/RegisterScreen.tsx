import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { StackPramList } from '../types';
import MolHeader from './molecules/MolHeader';
import { color } from '../styles';
import AtomRegister from './atoms/AtomRegister';

type Props = {
  navigation: StackNavigationProp<StackPramList, 'registerScreen'>;
};

const RegisterScreen: FC<Props> = ({ navigation }) => {
  return (
    <MolHeader
      style={{
        height: 100,
        paddingHorizontal: 20,
        paddingTop: 30,
        backgroundColor: color.mainColor,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}
      type={'register'}
    >
      <AtomRegister navigation={navigation} />
    </MolHeader>
  );
};

export default RegisterScreen;
