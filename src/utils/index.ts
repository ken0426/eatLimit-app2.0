import { Dimensions, KeyboardTypeOptions, Platform } from 'react-native';
import { ApiData } from '../types';
import moment from 'moment';

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

/** 設定項目の「年月日の表示」項目でフォーマットに依存した形で項目を表示できるようにするロジック */
export const getEditDataFormat = (data: any, id: number) => {
  const newData = data.data.map((d: any) => {
    const getFormat = (id: number) => {
      if (id === 1) {
        if (d.id === 1) {
          return 'YYYY年MM月DD日';
        } else {
          return 'MM月DD日';
        }
      } else if (id === 2) {
        if (d.id === 1) {
          return 'YYYY/MM/DD';
        } else {
          return 'MM/DD';
        }
      } else {
        if (d.id === 1) {
          return 'YYYY-MM-DD';
        } else {
          return 'MM-DD';
        }
      }
    };

    return {
      text: moment(d.text).format(getFormat(id)),
      id: d.id,
    };
  });

  return { data: newData, label: data.label };
};
