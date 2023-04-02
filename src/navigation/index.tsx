import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { color } from '../../styles';
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
          headerLargeTitleShadowVisible: false,
          headerTintColor: '#efefef',
          headerTitleStyle: {
            fontSize: 24, // 仮実装
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStackScreen;
