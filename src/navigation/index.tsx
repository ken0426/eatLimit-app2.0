import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { color } from '../../styles';
import HomeScreen from '../components/HomeScreen';
import { StackPramList } from '../types';

const Stack = createNativeStackNavigator<StackPramList>();

const RootStackScreen = () => {
  const [text, setText] = useState('');
  console.log(text);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'homeScreen'}
        component={HomeScreen}
        options={{
          title: 'ホーム',
          headerStyle: {
            backgroundColor: color.rightBlue,
          },
          headerSearchBarOptions: {
            hideNavigationBar: true,
            placeholder: '検索',
            cancelButtonText: 'キャンセル',
            onChangeText: (event) => setText(event.nativeEvent.text),
          },
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
