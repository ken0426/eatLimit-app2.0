import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AtomAuthInput from './atoms/AtomAuthInput';
import AtomAuthButton from './atoms/AtomAuthButton';
import AtomSettingRegister from './atoms/AtomSettingRegister';
import MolHeader from './molecules/MolHeader';
import { COLORS, FONTSIZE, SIZE, STYLE_FLEX } from '../styles';
import { HEADER_TYPE } from '../contents';

const PasswordResetScreen = () => {
  const navigation = useNavigation();
  const [text, setText] = useState('');

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[STYLE_FLEX, styles.contents]}>
        <MolHeader style={styles.header} type={HEADER_TYPE.PASSWORD_RESET}>
          <AtomSettingRegister
            title={''}
            onRightPress={() => navigation.goBack()}
          />
        </MolHeader>
        <View style={styles.inputArea}>
          <Text style={styles.title}>パスワードリセット</Text>
          <AtomAuthInput
            text={'メールアドレス'}
            keyboardType={'email-address'}
            value={text}
            setData={(e) => setText(e)}
            errorMessage={''}
            type={'email'}
          />

          <View style={styles.submitButton}>
            <AtomAuthButton
              onPress={() => {}}
              backgroundColor={COLORS.BLACK}
              text={'送信'}
              textColor={COLORS.WHITE}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PasswordResetScreen;

const styles = StyleSheet.create({
  header: {
    height: SIZE.BASE_HP * 12,
    paddingHorizontal: SIZE.BASE_WP * 5,
    paddingTop: SIZE.BASE_HP * 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 2,
  },
  contents: {
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: FONTSIZE.SIZE30PX,
    fontWeight: 'bold',
    marginBottom: SIZE.BASE_WP * 7,
  },
  inputArea: {
    paddingHorizontal: SIZE.BASE_WP * 5,
    justifyContent: 'center',
  },
  submitButton: {
    marginTop: SIZE.BASE_WP * 5,
  },
});
