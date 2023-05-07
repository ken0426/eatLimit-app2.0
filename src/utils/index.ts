import { Dimensions, KeyboardTypeOptions } from 'react-native';

export const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } =
  Dimensions.get('window');

/** 円表記でカンマをつけるロジック */
export const getText = (
  text: string,
  keyboardType: KeyboardTypeOptions | undefined
) => {
  if (keyboardType === 'number-pad' && text !== '') {
    const newText = text.replace(/,/g, '');
    return Number(newText).toLocaleString();
  } else {
    return text;
  }
};
