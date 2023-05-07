import { Dimensions, InputModeOptions } from 'react-native';

export const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } =
  Dimensions.get('window');

/** 円表記でカンマをつけるロジック */
export const getText = (text: string, inputMode: InputModeOptions) => {
  if (inputMode === 'numeric' && text !== '') {
    const newText = text.replace(/,/g, '');
    return Number(newText).toLocaleString();
  } else {
    return text;
  }
};
