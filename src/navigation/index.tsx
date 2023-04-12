import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { color } from '../../styles';
import DetailScreen from '../components/DetailScreen';
import HomeScreen from '../components/HomeScreen';
import SearchScreen from '../components/SearchScreen';
import { StackPramList } from '../types';

const Stack = createNativeStackNavigator<StackPramList>();

const RootStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'homeScreen'}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'detailScreen'}
        component={DetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'searchScreen'}
        component={SearchScreen}
        options={{ headerShown: false, animation: 'none' }}
      />
    </Stack.Navigator>
  );
};

export default RootStackScreen;
