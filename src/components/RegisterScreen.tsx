import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackPramList } from '../types';
import MolHeader from './molecules/MolHeader';
import { color } from '../styles';
import AtomRegister from './atoms/AtomRegister';
import AtomFileSelect from './atoms/AtomFileSelect';
import AtomSingleInput from './atoms/AtomSIngleInput';

type Props = {
  navigation: StackNavigationProp<StackPramList, 'registerScreen'>;
};

const RegisterScreen: FC<Props> = ({ navigation }) => {
  return (
    <View>
      <MolHeader style={styles.header} type={'register'}>
        <AtomRegister navigation={navigation} />
      </MolHeader>

      <View style={{ width: '100%', height: '100%' }}>
        <AtomFileSelect />
        <View style={{ padding: 10 }}>
          <AtomSingleInput label={'商品名'} />
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  header: {
    height: 100,
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: color.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
