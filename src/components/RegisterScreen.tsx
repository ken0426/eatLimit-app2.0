import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { StackPramList } from '../types';
import MolHeader from './molecules/MolHeader';
import { color } from '../styles';
import AtomRegister from './atoms/AtomRegister';
import AtomFileSelect from './atoms/AtomFileSelect';
import AtomSingleSelect from './atoms/AtomSingleSelect';
import AtomSingleInput from './atoms/AtomSingleInput';
import AtomDate from './atoms/AtomDate';
import { keepData, managementData } from '../contents';
import AtomMemo from './atoms/AtomMemo';
import AtomButton from './atoms/AtomButton';
import { WINDOW_HEIGHT } from '../utils';

type Props = {
  navigation: StackNavigationProp<StackPramList, 'registerScreen'>;
};

const RegisterScreen: FC<Props> = ({ navigation }) => {
  const [enabled, setEnabled] = useState(false);
  return (
    <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
      <MolHeader style={styles.header} type={'default'}>
        <AtomRegister navigation={navigation} />
      </MolHeader>

      <KeyboardAvoidingView
        behavior='position'
        style={{ height: WINDOW_HEIGHT >= 812 ? '60%' : '65%' }}
        enabled={enabled}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{ width: '100%', height: '100%' }}>
            <AtomFileSelect />
            <View style={styles.inputForm}>
              <AtomSingleInput
                label={'商品名'}
                onPressIn={() => setEnabled(false)}
              />
              <AtomSingleSelect label={'管理方法'} data={managementData} />
              <AtomSingleSelect label={'保存方法'} data={keepData} />
              <AtomDate />
              <AtomSingleInput
                label={'購入場所'}
                onPressIn={() => setEnabled(true)}
              />
              <AtomSingleInput
                label={'金額'}
                onPressIn={() => setEnabled(true)}
                keyboardType={'number-pad'}
              />
              <AtomMemo onPress={() => setEnabled(true)} />
            </View>
            <View style={styles.buttonArea}>
              <AtomButton
                onPress={() => {}}
                color={'#ffffff'}
                fontSize={30}
                backgroundColor={color.blue}
                width={200}
                label={'登録'}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
    zIndex: 2,
  },
  inputForm: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  buttonArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
