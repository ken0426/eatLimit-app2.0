/** React */
import React, { useState } from 'react';
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
import { HEADER_TYPE, PASSWORD_UPDATE_INPUT_KEY } from '../contents';
import { COLORS, FONTSIZE, SIZE, STYLE_FLEX } from '../styles';
import { useAuthInput } from '../hooks/useAuthInput';
import { passwordValidationCheck } from '../utils';

const PasswordUpdateScreen = () => {
  const navigation = useNavigation();

  const [hasError, setHasError] = useState<{ key: string; error: string }[]>(
    []
  );

  const { setTargetPostData, postData } = useAuthInput();

  const getValue = (key: string) =>
    postData.find((item) => item.key === key)?.value;

  const getHasError = (key: string) =>
    hasError.find((item) => item.key === key)?.error;

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
              value={getValue(PASSWORD_UPDATE_INPUT_KEY.PASSWORD) ?? ''}
              setData={(data) => {
                setTargetPostData({
                  key: PASSWORD_UPDATE_INPUT_KEY.PASSWORD,
                  value: data,
                });
              }}
              errorMessage={
                getHasError(PASSWORD_UPDATE_INPUT_KEY.PASSWORD) ?? null
              }
              type={'lock'}
              inputKey={PASSWORD_UPDATE_INPUT_KEY.PASSWORD}
              hasError={hasError}
              setHasError={setHasError}
            />
            <AtomAuthInput
              text={'新しいパスワード'}
              value={getValue(PASSWORD_UPDATE_INPUT_KEY.NEW_PASSWORD) ?? ''}
              setData={(data) => {
                setTargetPostData({
                  key: PASSWORD_UPDATE_INPUT_KEY.NEW_PASSWORD,
                  value: data,
                });
              }}
              errorMessage={
                getHasError(PASSWORD_UPDATE_INPUT_KEY.NEW_PASSWORD) ?? null
              }
              type={'lock'}
              inputKey={PASSWORD_UPDATE_INPUT_KEY.NEW_PASSWORD}
              hasError={hasError}
              setHasError={setHasError}
            />
            <AtomAuthInput
              text={'新しいパスワード確認用'}
              value={
                getValue(PASSWORD_UPDATE_INPUT_KEY.NEW_PASSWORD_CONFIRMATION) ??
                ''
              }
              setData={(data) => {
                setTargetPostData({
                  key: PASSWORD_UPDATE_INPUT_KEY.NEW_PASSWORD_CONFIRMATION,
                  value: data,
                });
              }}
              errorMessage={
                getHasError(
                  PASSWORD_UPDATE_INPUT_KEY.NEW_PASSWORD_CONFIRMATION
                ) ?? null
              }
              type={'lock'}
              inputKey={PASSWORD_UPDATE_INPUT_KEY.NEW_PASSWORD_CONFIRMATION}
              hasError={hasError}
              setHasError={setHasError}
            />
          </View>
          <AtomAuthButton
            onPress={async () => {
              try {
                const validationError = passwordValidationCheck(
                  postData,
                  setHasError
                );
                if (!validationError) {
                  console.log('ここでパスワードの保存を行う');
                  // const email = auth.currentUser?.email;
                  // const password = postData.find(
                  //   (item) => item.key === 'password'
                  // )?.value;
                  // const credential = EmailAuthProvider.credential(
                  //   email!,
                  //   password!
                  // );
                  // const user = auth.currentUser;
                  // await reauthenticateWithCredential(user!, credential);
                  // const newPassword = postData.find(
                  //   (item) => item.key === 'newPassword'
                  // )?.value;
                  // await updatePassword(user!, newPassword!);
                  // パスワードの更新が完了
                }
              } catch (error: any) {
                if (error.code === 'auth/wrong-password') {
                  // TODO 既存パスワードが間違っている場合はuseStateでエラーメッセージも追加
                  console.log('パスワードが間違っています');
                }
              }
            }}
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
