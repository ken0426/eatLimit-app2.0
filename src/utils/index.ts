import { Dimensions, KeyboardTypeOptions, Platform } from 'react-native';
import { ApiData } from '../types';

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

/** 商品の検索をする際のロジック */
export const filterData = (data: ApiData[], text: string) => {
  /** ひらがなをカタカナに置換するロジック */
  const hiraganaToKatakana = (str: string) => {
    return str.replace(/[\u3041-\u3096]/g, (match) => {
      const chr = match.charCodeAt(0) + 0x60;
      return String.fromCharCode(chr);
    });
  };

  const pattern = new RegExp(hiraganaToKatakana(text));
  return data.filter((item) => {
    if (pattern.test(item.eatName)) {
      return pattern.test(item.eatName);
    } else {
      return item.eatName.match(text);
    }
  });
};

/** 設定の見出しのキーを取得するロジック */
export const getKey = (item: any) => {
  const objectKey = Object.keys(item);
  const key = objectKey[0];
  return key;
};
