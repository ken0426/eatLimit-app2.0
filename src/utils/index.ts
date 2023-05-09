import { Dimensions, KeyboardTypeOptions, Platform } from 'react-native';

export const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } =
  Dimensions.get('window');

/** 円表記でカンマをつけるロジック */
export const getText = (text: string, keyboardType: KeyboardTypeOptions) => {
  if (keyboardType === 'number-pad' && text !== '') {
    const newText = text.replace(/\D/g, '');
    if (Platform.OS === 'ios') {
      return Number(newText).toLocaleString();
    } else if (Platform.OS === 'android') {
      return Number(newText)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  } else {
    return text;
  }
};
