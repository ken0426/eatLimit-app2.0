import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import RootStackScreen from './src/navigation';

export default function App() {
  return (
    <>
      <ActionSheetProvider>
        <NavigationContainer>
          <RootStackScreen />
        </NavigationContainer>
      </ActionSheetProvider>
      <StatusBar style='auto' />
    </>
  );
}
