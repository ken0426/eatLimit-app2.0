import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { color } from '../../styles';
import DetailScreen from '../components/DetailScreen';
import HomeScreen from '../components/HomeScreen';
import { StackPramList } from '../types';

const Stack = createNativeStackNavigator<StackPramList>();

const RootStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'homeScreen'}
        component={HomeScreen}
        options={{
          title: 'ホーム',
          headerStyle: {
            backgroundColor: color.mainColor,
          },
          headerSearchBarOptions: {
            placeholder: '検索',
            cancelButtonText: 'キャンセル',
          },
          headerLargeTitleShadowVisible: false,
          headerTintColor: '#efefef',
          headerTitleStyle: {
            fontSize: 24, // 仮実装
          },
        }}
      />
      <Stack.Screen
        name={'detailScreen'}
        component={DetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStackScreen;
