import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
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
