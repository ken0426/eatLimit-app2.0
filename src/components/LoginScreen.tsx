import { RouteProp } from '@react-navigation/native';
import React, { FC, useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';
import { StackPramList } from '../types';

type Props = {
  route: RouteProp<StackPramList, 'loginScreen'>;
};

const LoginScreen: FC<Props> = ({ route }) => {
  const isLogin = route.params.isLogin;
  const [isLoginScreen, setIsLoginScreen] = useState(isLogin);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>{isLoginScreen ? 'ログイン' : 'アカウント登録'}</Text>
      <TextInput />
      <TouchableOpacity onPress={() => setIsLoginScreen(!isLoginScreen)}>
        <Text>
          {isLoginScreen
            ? 'アカウントをお持ちでない方は新規登録'
            : 'アカウントをお持ちの方はログイン'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;
