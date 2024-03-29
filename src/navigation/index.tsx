/** React */
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRootDispatch } from '../redux/store/store';
/** firebase */
import { auth } from '../firebase';
/** スクリーン */
import HomeScreen from '../components/HomeScreen';
import DetailScreen from '../components/DetailScreen';
import SearchScreen from '../components/SearchScreen';
import RegisterScreen from '../components/RegisterScreen';
import UpdateRegisterScreen from '../components/UpdateRegisterScreen';
import TopScreen from '../components/TopScreen';
import SettingScreen from '../components/SettingScreen';
import SettingDetailScreen from '../components/SettingDetailScreen';
import MemoTemplateUpdateScreen from '../components/MemoTemplateUpdateScreen';
import MemoTemplateRegisterScreen from '../components/MemoTemplateRegisterScreen';
import SettingMemoScreen from '../components/SettingMemoScreen';
import LoginScreen from '../components/LoginScreen';
import TagScreen from '../components/TagScreen';
import TagRegisterScreen from '../components/TagRegisterScreen';
import TagUpdateScreen from '../components/TagUpdateScreen';
import PasswordResetScreen from '../components/PasswordResetScreen';
import PasswordUpdateScreen from '../components/PasswordUpdateScreen';
/** その他 */
import {
  fetchTag,
  getSaveTemplateData,
  getSelectedSaveTemplateData,
} from '../api';
import { StackPramList } from '../types';
import { setUserEmail } from '../redux/slices/loginSlice';
import MailAddressUpdateScreen from '../components/MailAddressUpdateScreen';

const Stack = createNativeStackNavigator<StackPramList>();

const RootStackScreen = () => {
  const dispatch = useRootDispatch();
  const navigation = useNavigation<StackNavigationProp<StackPramList>>();

  /** 自動ログイン */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          /** ログイン情報が取得できたらユーザーが保存しているタグ情報を取得する */
          if (user.emailVerified) {
            /** タグ情報を取得 */
            await fetchTag(user.uid);
            /** 選択しているテンプレートメモのデータを取得 */
            await getSelectedSaveTemplateData(user.uid);
            /** テンプレートメモ情報の取得 */
            await getSaveTemplateData(user.uid);

            dispatch(setUserEmail(user.email));

            /** ユーザー情報を取得できたらホーム画面へ遷移する */
            navigation.reset({
              index: 0,
              routes: [{ name: 'homeScreen' }],
            });
          } else {
            alert('メールアドレス認証をしてください');
          }
        }
      } catch (error) {}
    });

    return unsubscribe;
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'topScreen'}
        component={TopScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'loginScreen'}
        component={LoginScreen}
        options={{ headerShown: false, animation: 'fade' }}
      />
      <Stack.Screen
        name={'mailAddressUpdateScreen'}
        component={MailAddressUpdateScreen}
        options={{ headerShown: false, animation: 'slide_from_left' }}
      />
      <Stack.Screen
        name={'passwordResetScreen'}
        component={PasswordResetScreen}
        options={{ headerShown: false, animation: 'none' }}
      />
      <Stack.Screen
        name={'passwordUpdateScreen'}
        component={PasswordUpdateScreen}
        options={{ headerShown: false, animation: 'slide_from_left' }}
      />
      <Stack.Screen
        name={'homeScreen'}
        component={HomeScreen}
        options={{ headerShown: false, animation: 'fade' }}
      />
      <Stack.Screen
        name={'detailScreen'}
        component={DetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'searchScreen'}
        component={SearchScreen}
        options={{ headerShown: false, animation: 'none' }}
      />
      <Stack.Screen
        name={'registerScreen'}
        component={RegisterScreen}
        options={{ headerShown: false, animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name={'updateRegisterScreen'}
        component={UpdateRegisterScreen}
        options={{ headerShown: false, animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name={'settingScreen'}
        component={SettingScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name={'settingDetailScreen'}
        component={SettingDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'memoTemplateRegisterScreen'}
        component={MemoTemplateRegisterScreen}
        options={{ headerShown: false, animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name={'memoTemplateUpdateScreen'}
        component={MemoTemplateUpdateScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'settingMemoScreen'}
        component={SettingMemoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'tagScreen'}
        component={TagScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name={'tagRegisterScreen'}
        component={TagRegisterScreen}
        options={{ headerShown: false, animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name={'tagUpdateScreen'}
        component={TagUpdateScreen}
        options={{ headerShown: false, animation: 'slide_from_bottom' }}
      />
    </Stack.Navigator>
  );
};

export default RootStackScreen;
