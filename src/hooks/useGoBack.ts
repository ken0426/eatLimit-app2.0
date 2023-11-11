import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const useGoBack = () => {
  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS === 'ios') {
      navigation.setOptions({ gestureEnabled: false });
    } else if (Platform.OS === 'android') {
      // androidでは戻るジェスチャーで戻るを無効にする
      navigation.addListener('beforeRemove', (nav) => {
        if (nav.data.action.type === 'GO_BACK' && !nav.data.action.source) {
          nav.preventDefault();
        }
      });
    }
  }, [navigation]);
};
