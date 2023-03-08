import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RootStackScreen from './src/navigation';

export default function App() {
  return (
    <>
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
      <StatusBar style='auto' />
    </>
  );
}
