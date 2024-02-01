/** React */
import React, { FC, useEffect, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
/** ライブラリ */
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
/** その他 */
import AtomAuthInput from './atoms/AtomAuthInput';
import AtomAuthButton from './atoms/AtomAuthButton';
import { StackPramList } from '../types';
import { COLORS, FONTSIZE, SIZE } from '../styles';
import { useAuthInput } from '../hooks/useAuthInput';
import { handleLogin } from '../utils';

type Props = {
  route: RouteProp<StackPramList, 'loginScreen'>;
};

const LoginScreen: FC<Props> = ({ route }) => {
  const navigation = useNavigation<StackNavigationProp<StackPramList>>();
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

        <View style={styles.changeButtonArea}>
          {isLoginScreen && (
            <TouchableOpacity
              onPress={() => navigation.navigate('passwordResetScreen')}
            >
              <Text style={styles.changeButton}>パスワードを忘れた場合</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.orArea}>
          <View style={styles.line} />
          <Text style={styles.orText}>または</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.switchArea}>
          <Text style={styles.changeNormalButton}>
            {isLoginScreen
              ? `アカウントをお持ちでない方はこちらで`
              : `アカウントをお持ちの方はこちらで`}
          </Text>
          <Text
            onPress={() => {
              postData.forEach((item) =>
                setTargetPostData({ key: item.key, value: '' })
              );
              setMailAddressErrorMessage(null);
              setPasswordErrorMessage(null);
              setPasswordConfirmationErrorMessage(null);
              setIsLoginScreen(!isLoginScreen);
            }}
            style={styles.changeButton}
          >
            {isLoginScreen ? `新規登録` : `ログイン`}
          </Text>
        </View>
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
    marginBottom: SIZE.BASE_WP * 4.4,
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
  changeNormalButton: {
    color: COLORS.BLACK,
    fontSize: FONTSIZE.SIZE15PX,
    textAlign: 'center',
  },
  orArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZE.BASE_WP * 5,
  },
  line: {
    height: 0.7,
    width: '40%',
    backgroundColor: COLORS.BLACK,
  },
  orText: {
    paddingHorizontal: SIZE.BASE_WP * 2,
  },
  switchArea: {
    flexDirection: 'row',
  },
  loginButtonArea: {
    width: '100%',
    marginTop: SIZE.BASE_WP * 4.5,
  },
});
