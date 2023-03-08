import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
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
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStackScreen;
