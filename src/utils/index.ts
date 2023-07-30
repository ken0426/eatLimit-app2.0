import { Alert, Dimensions, KeyboardTypeOptions, Platform } from 'react-native';
import { ApiData, HandleLoginType } from '../types';
import { SEPTEMBER, SETTING_ITEM_ID } from '../contents';

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

type Data = {
  data: {
    id: number;
  }[];
  label: string;
  isMemoTemplate?: boolean;
};

export const getEditDataFormat = (data: Data, dateFormatDisplayId: number) => {
  const today = new Date();
  const newData = data.data.map((d) => {
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    const monthMM = month > SEPTEMBER ? month : `0${month}`;
    const dayDD = day > SEPTEMBER ? day : `0${day}`;
    const getFormat = (id: number) => {
      if (id === SETTING_ITEM_ID.FORMAT_JP) {
        if (d.id === SETTING_ITEM_ID.FORMAT_YYYY_MM_DD) {
          return `${year}年${monthMM}月${dayDD}日`;
        } else {
          return `${monthMM}月${dayDD}日`;
        }
      } else if (id === SETTING_ITEM_ID.FORMAT_SLASH) {
        if (d.id === SETTING_ITEM_ID.FORMAT_YYYY_MM_DD) {
          return `${year}/${monthMM}/${dayDD}`;
        } else {
          return `${monthMM}/${dayDD}`;
        }
      } else {
        if (d.id === SETTING_ITEM_ID.FORMAT_YYYY_MM_DD) {
          return `${year}-${monthMM}-${dayDD}`;
        } else {
          return `${monthMM}-${dayDD}`;
        }
      }
    };
    const text = getFormat(dateFormatDisplayId);

    return { text, id: d.id };
  });

  return { data: newData, label: data.label };
};

/** ログイン画面のエラーメッセージ */
export const handleLogin = ({
  isLoginScreen,
  mailAddress,
  password,
  passwordConfirmation,
  setMailAddressErrorMessage,
  setPasswordErrorMessage,
  setPasswordConfirmationErrorMessage,
}: HandleLoginType) => {
  /** メールアドレスのチェック */
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  /** 大文字と小文字が含まれているかチェック */
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  /** 半角英数字と指定の記号のみかチェック */
  const alphanumericAndSymbolsRegex = /^[A-Za-z0-9@\-_]+$/;
  /** 英語と数字が含まれているかチェック */
  const letterAndNumberRegex = /(?=.*[A-Za-z])(?=.*[0-9])/;

  if (isLoginScreen) {
    if (mailAddress === '' && password === '') {
      setMailAddressErrorMessage('メールアドレスを入力してください');
      setPasswordErrorMessage('パスワードを入力してください');
    } else if (
      password.length < 6 ||
      !uppercaseRegex.test(password) ||
      !lowercaseRegex.test(password) ||
      !alphanumericAndSymbolsRegex.test(password) ||
      !letterAndNumberRegex.test(password)
    ) {
      setPasswordErrorMessage('パスワードが正しくありません');
    } else {
      Alert.alert('ログインできます');
    }
  } else {
    if (mailAddress === '') {
      setMailAddressErrorMessage('必須項目です');
    } else if (!emailRegex.test(mailAddress)) {
      setMailAddressErrorMessage('メールアドレスが正しくありません');
    }
    if (password === '') {
      setPasswordErrorMessage('必須項目です');
    }
    if (password.length > 6) {
      if (!uppercaseRegex.test(password) || !lowercaseRegex.test(password)) {
        setPasswordErrorMessage(
          'パスワードには大文字と小文字を含める必要があります'
        );
        setPasswordConfirmationErrorMessage(
          'パスワードには大文字と小文字を含める必要があります'
        );
      }
      if (!alphanumericAndSymbolsRegex.test(password)) {
        setPasswordErrorMessage(
          `パスワードは半角英数字にしてください\nまた記号を含める場合は「@」「-」「_」となります`
        );
        setPasswordConfirmationErrorMessage(
          `パスワードは半角英数字にしてください\nまた記号を含める場合は「@」「-」「_」となります`
        );
      }
      if (!letterAndNumberRegex.test(password)) {
        setPasswordErrorMessage(
          'パスワードには半角英数字を組み合わせてください'
        );
        setPasswordConfirmationErrorMessage(
          'パスワードには半角英数字を組み合わせてください'
        );
      }
    } else {
      setPasswordErrorMessage('パスワードは7文字以上にしてください');
      setPasswordConfirmationErrorMessage(
        'パスワードは7文字以上にしてください'
      );
    }
    if (passwordConfirmation === '') {
      setPasswordConfirmationErrorMessage('必須項目です');
    }
    if (password !== passwordConfirmation) {
      setPasswordErrorMessage('パスワードが一致しません');
      setPasswordConfirmationErrorMessage('パスワードが一致しません');
    }
  }
};
