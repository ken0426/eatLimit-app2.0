import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../components/HomeScreen';
import DetailScreen from '../components/DetailScreen';
import SearchScreen from '../components/SearchScreen';
import { StackPramList } from '../types';
import RegisterScreen from '../components/RegisterScreen';
import UpdateRegisterScreen from '../components/UpdateRegisterScreen';
import TopScreen from '../components/TopScreen';

const Stack = createNativeStackNavigator<StackPramList>();

const RootStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
      }}
    >
      {/* <Stack.Screen
        name={'TopScreen'}
        component={TopScreen}
        options={{ headerShown: false }}
      /> */}
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
    </Stack.Navigator>
  );
};

export default RootStackScreen;
