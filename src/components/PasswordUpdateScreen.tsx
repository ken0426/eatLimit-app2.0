/** React */
import React from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
/** ライブラリ */
import { useNavigation } from '@react-navigation/native';
/** その他 */
import AtomSettingRegister from './atoms/AtomSettingRegister';
import AtomAuthInput from './atoms/AtomAuthInput';
import AtomAuthButton from './atoms/AtomAuthButton';
import MolHeader from './molecules/MolHeader';
import { HEADER_TYPE } from '../contents';
import { COLORS, FONTSIZE, SIZE, STYLE_FLEX } from '../styles';

const PasswordUpdateScreen = () => {
  const navigation = useNavigation();

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
          <Text style={styles.title}>パスワード変更</Text>
          <View style={styles.passwordInputArea}>
            <AtomAuthInput
              text={'現在のパスワード'}
              value={''}
              setData={() => {}}
              errorMessage={null}
              type={'lock'}
            />
            <AtomAuthInput
              text={'新しいパスワード'}
              value={''}
              setData={() => {}}
              errorMessage={null}
              type={'lock'}
            />
            <AtomAuthInput
              text={'新しいパスワード確認用'}
              value={''}
              setData={() => {}}
              errorMessage={null}
              type={'lock'}
            />
          </View>
          <AtomAuthButton
            onPress={() => {}}
            text={'パスワード変更'}
            backgroundColor={COLORS.BLACK}
            textColor={COLORS.SIGN_IN_BUTTON}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PasswordUpdateScreen;

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
  inputArea: {
    paddingHorizontal: SIZE.BASE_WP * 5,
    justifyContent: 'flex-start',
    flex: 1,
  },
  title: {
    fontSize: FONTSIZE.SIZE25PX,
    marginBottom: SIZE.BASE_WP * 4.4,
  },
  passwordInputArea: {
    height: '30%',
    justifyContent: 'space-between',
    marginBottom: SIZE.BASE_WP * 10,
  },
});
