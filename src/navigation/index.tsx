import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import HomeScreen from '../components/HomeScreen';
import DetailScreen from '../components/DetailScreen';
import SearchScreen from '../components/SearchScreen';
import { StackPramList } from '../types';
import RegisterScreen from '../components/RegisterScreen';
import UpdateRegisterScreen from '../components/UpdateRegisterScreen';
import TopScreen from '../components/TopScreen';
import SettingScreen from '../components/SettingScreen';
import SettingDetailScreen from '../components/SettingDetailScreen';
import MemoTemplateUpdateScreen from '../components/MemoTemplateUpdateScreen';
import MemoTemplateRegisterScreen from '../components/MemoTemplateRegisterScreen';
import SettingMemoScreen from '../components/SettingMemoScreen';
import LoginScreen from '../components/LoginScreen';
import { auth } from '../firebase';

const Stack = createNativeStackNavigator<StackPramList>();

const RootStackScreen = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setIsLogin(true);
    });
    return unsubscribe;
  }, []);

  return isLogin ? (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name={'homeScreen'}
        component={HomeScreen}
        options={{ headerShown: false }}
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
        options={{ headerShown: false, presentation: 'fullScreenModal' }}
      />
      <Stack.Screen
        name={'updateRegisterScreen'}
        component={UpdateRegisterScreen}
        options={{ headerShown: false, presentation: 'fullScreenModal' }}
      />
      <Stack.Screen
        name={'settingScreen'}
        component={SettingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'settingDetailScreen'}
        component={SettingDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'memoTemplateRegisterScreen'}
        component={MemoTemplateRegisterScreen}
        options={{ headerShown: false, presentation: 'fullScreenModal' }}
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
    </Stack.Navigator>
  ) : (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name={'topScreen'}
        component={TopScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'loginScreen'}
        component={LoginScreen}
        options={{ headerShown: false, presentation: 'fullScreenModal' }}
      />
    </Stack.Navigator>
  );
};

export default RootStackScreen;
