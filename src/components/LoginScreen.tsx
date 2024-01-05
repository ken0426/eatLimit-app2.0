import { RouteProp } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { StackPramList } from '../types';
import { COLORS, FONTSIZE, SIZE } from '../styles';
import AtomAuthInput from './atoms/AtomAuthInput';
import AtomAuthButton from './atoms/AtomAuthButton';
import { useAuthInput } from '../hooks/useAuthInput';
import { handleLogin } from '../utils';

type Props = {
  route: RouteProp<StackPramList, 'loginScreen'>;
};

const LoginScreen: FC<Props> = ({ route }) => {
  const isLogin = route.params.isLogin;
  const [isLoginScreen, setIsLoginScreen] = useState(isLogin);

  /** メールアドレスのエラー */
  const [mailAddressErrorMessage, setMailAddressErrorMessage] = useState<
    string | null
  >(null);

  /** パスワードのエラー */
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<
    string | null
  >(null);

  /** パスワードのエラー（確認用） */
  const [
    passwordConfirmationErrorMessage,
    setPasswordConfirmationErrorMessage,
  ] = useState<string | null>(null);

  const { setTargetPostData, postData } = useAuthInput();

  /** 各入力画面のテキストを取得 */
  const mailAddress =
    postData.find((item) => item.key === 'mailAddress')?.value ?? '';
  const password =
    postData.find((item) => item.key === 'password')?.value ?? '';
  const passwordConfirmation =
    postData.find((item) => item.key === 'passwordConfirmation')?.value ?? '';

  const getValue = (key: string) =>
    postData.find((item) => item.key === key)?.value;

  useEffect(() => {
    setMailAddressErrorMessage(null);
    setPasswordErrorMessage(null);
    setPasswordConfirmationErrorMessage(null);
  }, [postData]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.contents}>
        <Text style={styles.title}>
          {isLoginScreen ? 'ログイン' : 'アカウント登録'}
        </Text>

        <View style={styles.textInputArea}>
          <AtomAuthInput
            text={'メールアドレス'}
            keyboardType={'email-address'}
            value={getValue('mailAddress') ?? ''}
            setData={(data) =>
              setTargetPostData({ key: 'mailAddress', value: data })
            }
            errorMessage={mailAddressErrorMessage}
            type={'email'}
          />
          <AtomAuthInput
            text={'パスワード'}
            secureTextEntry={true}
            value={getValue('password') ?? ''}
            setData={(data) =>
              setTargetPostData({ key: 'password', value: data })
            }
            errorMessage={passwordErrorMessage}
            type={'lock'}
          />
          {!isLoginScreen && (
            <AtomAuthInput
              text={'パスワード（確認用）'}
              secureTextEntry={true}
              value={getValue('passwordConfirmation') ?? ''}
              setData={(data) =>
                setTargetPostData({
                  key: 'passwordConfirmation',
                  value: data,
                })
              }
              errorMessage={passwordConfirmationErrorMessage}
              type={'lock'}
            />
          )}
        </View>

        <View style={styles.loginButtonArea}>
          <AtomAuthButton
            onPress={() =>
              handleLogin({
                isLoginScreen,
                mailAddress,
                password,
                passwordConfirmation,
                setMailAddressErrorMessage,
                setPasswordErrorMessage,
                setPasswordConfirmationErrorMessage,
              })
            }
            backgroundColor={COLORS.BLACK}
            textColor={COLORS.SIGN_IN_BUTTON}
            text={isLoginScreen ? 'ログイン' : '新規登録'}
          />
        </View>

        <TouchableOpacity
          style={styles.changeButtonArea}
          onPress={() => {
            postData.forEach((item) =>
              setTargetPostData({ key: item.key, value: '' })
            );
            setMailAddressErrorMessage(null);
            setPasswordErrorMessage(null);
            setPasswordConfirmationErrorMessage(null);
            setIsLoginScreen(!isLoginScreen);
          }}
        >
          <Text style={styles.changeButton}>
            {isLoginScreen
              ? `アカウントをお持ちでない方は\nこちらで新規登録`
              : `アカウントをお持ちの方は\nこちらでログイン`}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  contents: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZE.BASE_WP * 6,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: FONTSIZE.SIZE25PX,
    marginBottom: SIZE.BASE_WP * 4.5,
  },
  textInputArea: {
    width: '100%',
    justifyContent: 'space-between',
  },
  changeButtonArea: {
    marginVertical: SIZE.BASE_WP * 3.5,
  },
  changeButton: {
    color: COLORS.BLUE,
    fontSize: FONTSIZE.SIZE15PX,
    textAlign: 'center',
  },
  loginButtonArea: {
    width: '100%',
    marginTop: SIZE.BASE_WP * 4.5,
  },
});
