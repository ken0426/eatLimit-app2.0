import { RouteProp, useNavigation } from '@react-navigation/native';
import React, { FC, useState } from 'react';
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

type Props = {
  route: RouteProp<StackPramList, 'loginScreen'>;
};

const LoginScreen: FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const isLogin = route.params.isLogin;
  const [isLoginScreen, setIsLoginScreen] = useState(isLogin);

  const { setTargetPostData, postData } = useAuthInput();

  const getValue = (key: string) =>
    postData.find((item) => item.key === key)?.value;

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
              postData.map((item) =>
                setTargetPostData({ key: item.key, value: '' })
              );
              setIsLoginScreen(!isLoginScreen);
            }}
          >
            <Text style={styles.changeButton}>
              {isLoginScreen
                ? 'アカウントをお持ちでない方は新規登録'
                : 'アカウントをお持ちの方はログイン'}
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
            />
            <AtomAuthInput
              text={'パスワード'}
              secureTextEntry={true}
              placeholder={'パスワードを入力してください'}
              value={getValue('password') ?? ''}
              setData={(data) =>
                setTargetPostData({ key: 'password', value: data })
              }
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
              />
            )}
          </View>

          <View style={styles.loginButtonArea}>
            <AtomAuthButton
              onPress={() => console.log(postData)}
              backgroundColor={'#1797ec'}
              textColor={'#fcfcfc'}
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
