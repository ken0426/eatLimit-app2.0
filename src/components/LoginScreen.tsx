import { RouteProp, useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react';
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
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
  const navigation = useNavigation();
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
    <SafeAreaView style={styles.safeAreaView}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.contents}>
          <Text style={styles.title}>
            {isLoginScreen ? 'ログイン' : 'アカウント登録'}
          </Text>
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
                ? 'アカウントをお持ちでない方はこちらで新規登録'
                : 'アカウントをお持ちの方はこちらでログイン'}
            </Text>
          </TouchableOpacity>
          <View style={styles.textInputArea}>
            <AtomAuthInput
              text={'メールアドレス'}
              keyboardType={'email-address'}
              placeholder={'メールアドレスを入力してください'}
              value={getValue('mailAddress') ?? ''}
              setData={(data) =>
                setTargetPostData({ key: 'mailAddress', value: data })
              }
              errorMessage={mailAddressErrorMessage}
            />
            <AtomAuthInput
              text={'パスワード'}
              secureTextEntry={true}
              placeholder={'パスワードを入力してください'}
              value={getValue('password') ?? ''}
              setData={(data) =>
                setTargetPostData({ key: 'password', value: data })
              }
              errorMessage={passwordErrorMessage}
            />
            {!isLoginScreen && (
              <AtomAuthInput
                text={'パスワード（確認用）'}
                secureTextEntry={true}
                placeholder={'パスワードを入力してください'}
                value={getValue('passwordConfirmation') ?? ''}
                setData={(data) =>
                  setTargetPostData({
                    key: 'passwordConfirmation',
                    value: data,
                  })
                }
                errorMessage={passwordConfirmationErrorMessage}
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
              backgroundColor={COLORS.LOGIN_BUTTON}
              textColor={COLORS.SIGN_IN_BUTTON}
              text={isLoginScreen ? 'ログイン' : '新規登録'}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      <TouchableOpacity
        style={styles.touchIcon}
        onPress={() => navigation.goBack()}
      >
        <AntDesign
          name={'closecircleo'}
          size={30}
          color={COLORS.TEXT_LABEL}
          style={styles.icon}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contents: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZE.BASE_WP * 10,
  },
  title: {
    fontSize: FONTSIZE.SIZE25PX,
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
  },
  loginButtonArea: {
    width: '100%',
    marginTop: SIZE.BASE_WP * 4.5,
  },
  touchIcon: {
    marginBottom: SIZE.BASE_WP * 2.5,
  },
  icon: {
    padding: SIZE.BASE_WP * 3.5,
  },
});
