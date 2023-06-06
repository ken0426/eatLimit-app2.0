import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import RootStackScreen from './src/navigation';
import { Provider } from 'react-redux';
import store from './src/redux/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <ActionSheetProvider>
        <NavigationContainer>
          <RootStackScreen />
        </NavigationContainer>
      </ActionSheetProvider>
      <StatusBar style='auto' />
    </Provider>
  );
}
