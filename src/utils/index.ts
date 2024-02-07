import { Alert, Dimensions, KeyboardTypeOptions, Platform } from 'react-native';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  ApiData,
  AuthPostData,
  HandleLoginType,
  PostData,
  TagData,
} from '../types';
import {
  LABEL_NAME,
  MAIL_ADDRESS_VALIDATION_MESSAGE,
  MODAL_MESSAGE,
  PASSWORD_CHANGE_MESSAGE,
  PASSWORD_UPDATE_INPUT_KEY,
  REQUIRED_ITEM,
  SEPTEMBER,
  SETTING_ITEM_ID,
} from '../contents';
import { auth } from '../firebase';
import moment from 'moment';
import store from '../redux/store/store';
import { setUserEmail } from '../redux/slices/loginSlice';

type Data = {
  data: {
    id: number;
  }[];
  label: string;
  isMemoTemplate?: boolean;
};

type RegisterValidationCheck = {
  postData: PostData[];
  setIsVisible: (e: boolean) => void;
  setMessage: (e: string) => void;
  setIsDateBefore: (e: boolean) => void;
};

export const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } =
  Dimensions.get('window');

/** 円表記でカンマをつけるロジック */
export const getText = (text: string, keyboardType: KeyboardTypeOptions) => {
  if (keyboardType === 'number-pad' && text !== '') {
    const newText = text.replace(/\D/g, '');
    if (Platform.OS === 'ios') {
      return Number(newText).toLocaleString('ja-JP');
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

/** タグの検索をする際のロジック */
export const filterTagData = (
  data: { id: string; name: string }[],
  text: string
) => {
  /** ひらがなをカタカナに置換するロジック */
  const hiraganaToKatakana = (str: string) => {
    return str.replace(/[\u3041-\u3096]/g, (match) => {
      const chr = match.charCodeAt(0) + 0x60;
      return String.fromCharCode(chr);
    });
  };

  const pattern = new RegExp(hiraganaToKatakana(text));
  return data.filter((item) => {
    if (pattern.test(item.name)) {
      return pattern.test(item.name);
    } else {
      return item.name.match(text);
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
export const handleLogin = async ({
  isLoginScreen,
  mailAddress,
  password,
  passwordConfirmation,
  setMailAddressErrorMessage,
  setPasswordErrorMessage,
  setPasswordConfirmationErrorMessage,
}: HandleLoginType) => {
  try {
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
      if (mailAddress === '') {
        setMailAddressErrorMessage(MAIL_ADDRESS_VALIDATION_MESSAGE.NO_TEXT);
      } else if (!emailRegex.test(mailAddress)) {
        setMailAddressErrorMessage(
          MAIL_ADDRESS_VALIDATION_MESSAGE.INVALID_EMAIL_ADDRESS
        );
      }
      if (
        password.length < 6 ||
        !uppercaseRegex.test(password) ||
        !lowercaseRegex.test(password) ||
        !alphanumericAndSymbolsRegex.test(password) ||
        !letterAndNumberRegex.test(password)
      ) {
        if (password === '') {
          setPasswordErrorMessage(PASSWORD_CHANGE_MESSAGE.NO_TEXT);
        } else {
          setPasswordErrorMessage(PASSWORD_CHANGE_MESSAGE.INVALID_PASSWORD);
        }
      }

      /** 【すべての条件を満たした場合ログインをする】
       * - メールアドレスが入力されているかどうか
       * - メールアドレスアドレスになっているか
       * - パスワードは7文字以上かどうか
       * - 半角英数字を使用しているかどうか
       * - 大文字と小文字を使用しているかどうか
       * - 記号を使用する場合は「@」「-」「_」のいずれかであるかどうか
       */
      if (
        mailAddress !== '' &&
        emailRegex.test(mailAddress) &&
        password !== '' &&
        password.length > 6 &&
        uppercaseRegex.test(password) &&
        lowercaseRegex.test(password) &&
        alphanumericAndSymbolsRegex.test(password) &&
        letterAndNumberRegex.test(password)
      ) {
        await signInWithEmailAndPassword(auth, mailAddress, password);
        store.dispatch(setUserEmail(mailAddress));
      }
    } else {
      if (mailAddress === '') {
        setMailAddressErrorMessage(REQUIRED_ITEM);
      } else if (!emailRegex.test(mailAddress)) {
        setMailAddressErrorMessage(
          MAIL_ADDRESS_VALIDATION_MESSAGE.INVALID_EMAIL_ADDRESS
        );
      }
      if (password === '') {
        setPasswordErrorMessage(REQUIRED_ITEM);
      }
      if (password.length > 6) {
        if (!uppercaseRegex.test(password) || !lowercaseRegex.test(password)) {
          setPasswordErrorMessage(PASSWORD_CHANGE_MESSAGE.INVALID_CASE);
          setPasswordConfirmationErrorMessage(
            PASSWORD_CHANGE_MESSAGE.INVALID_CASE
          );
        }
        if (!alphanumericAndSymbolsRegex.test(password)) {
          setPasswordErrorMessage(PASSWORD_CHANGE_MESSAGE.INVALID_SYMBOL);
          setPasswordConfirmationErrorMessage(
            PASSWORD_CHANGE_MESSAGE.INVALID_SYMBOL
          );
        }
        if (!letterAndNumberRegex.test(password)) {
          setPasswordErrorMessage(PASSWORD_CHANGE_MESSAGE.INVALID_LENGTH);
          setPasswordConfirmationErrorMessage(
            PASSWORD_CHANGE_MESSAGE.INVALID_LENGTH
          );
        }
        if (password !== passwordConfirmation) {
          setPasswordErrorMessage(PASSWORD_CHANGE_MESSAGE.INVALID_MATCH);
          setPasswordConfirmationErrorMessage(
            PASSWORD_CHANGE_MESSAGE.INVALID_MATCH
          );
        }

        /** 【すべての条件を満たした場合新規登録をする】
         * - メールアドレスが入力されているかどうか
         * - メールアドレスアドレスになっているか
         * - パスワードは7文字以上かどうか
         * - 半角英数字を使用しているかどうか
         * - 大文字と小文字を使用しているかどうか
         * - 記号を使用する場合は「@」「-」「_」のいずれかであるかどうか
         * - パスワードとパスワード確認用の文字列が一致しているかどうか
         */
        if (
          mailAddress !== '' &&
          emailRegex.test(mailAddress) &&
          password !== '' &&
          passwordConfirmation !== '' &&
          password === passwordConfirmation &&
          uppercaseRegex.test(password) &&
          lowercaseRegex.test(password) &&
          alphanumericAndSymbolsRegex.test(password) &&
          letterAndNumberRegex.test(password)
        ) {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            mailAddress,
            password
          );

          /** 登録者にメールを送信する */
          await sendEmailVerification(userCredential.user);

          store.dispatch(setUserEmail(mailAddress));
        }
      } else {
        if (password === '') {
          setPasswordErrorMessage(REQUIRED_ITEM);
        } else {
          setPasswordErrorMessage(PASSWORD_CHANGE_MESSAGE.INVALID_SEVEN_LENGTH);
          setPasswordConfirmationErrorMessage(
            PASSWORD_CHANGE_MESSAGE.INVALID_SEVEN_LENGTH
          );
        }
      }
      if (passwordConfirmation === '') {
        setPasswordConfirmationErrorMessage(REQUIRED_ITEM);
      }
    }
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      Alert.alert('接続エラー', 'メールアドレスまたはパスワードが違います', [
        { text: 'OK', onPress: () => {} },
      ]);
    } else if (error.code === 'auth/email-already-in-use') {
      Alert.alert('接続エラー', 'このメールアドレスはすでに使用されています', [
        { text: 'OK', onPress: () => {} },
      ]);
    } else {
      Alert.alert('接続エラー', '時間をおいて再度お試しください', [
        { text: 'OK', onPress: () => {} },
      ]);
    }
    throw error;
  }
};

/** 登録、変更、コピー画面でバリデーションチェック */
export const registerValidationCheck = ({
  postData,
  setIsVisible,
  setMessage,
  setIsDateBefore,
}: RegisterValidationCheck) => {
  /** 必須項目を抽出 */
  const filterData = postData.filter((item) => item.isRequired);
  /** 必須項目を抽出 */
  const isTextNull = filterData.find((item) => item.value === '');

  if (isTextNull) {
    setIsVisible(true);
    setMessage(MODAL_MESSAGE.REQUIRED);

    return true;
  } else {
    const registerDate = postData.find((item) => item.key === LABEL_NAME.DATE);
    /** 個数を取得するロジック */
    const count = postData.find(
      (item) => item.key === LABEL_NAME.QUANTITY
    )?.value;

    /** 管理方法を取得 */
    const managementData = postData.find(
      (item) => item.key === LABEL_NAME.MANAGEMENT
    );

    /** 管理方法が「消費期限」または「賞味期限」の場合は期限目安の項目を削除し、条件を満たした場合は期限目安の項目を削除する */
    const newPostData = postData.filter(
      (item) =>
        !(
          item.key === LABEL_NAME.APPROXIMATE_DEADLINE &&
          (managementData?.value === '賞味期限' ||
            managementData?.value === '消費期限')
        )
    );
    /** 期限目安の日付を取得 */
    const approximateDeadlineData = newPostData.find(
      (item) => item.key === LABEL_NAME.APPROXIMATE_DEADLINE
    );
    if (count && Number(count) > 999) {
      setIsVisible(true);
      setMessage(MODAL_MESSAGE.QUANTITY);
      return true;
    } else if (
      typeof approximateDeadlineData?.value === 'string' &&
      typeof registerDate?.value === 'string' &&
      !moment(registerDate.value).isSameOrBefore(approximateDeadlineData.value)
    ) {
      setIsVisible(true);
      setMessage(MODAL_MESSAGE.DATE_ERROR);
      return true;
    } else if (
      typeof registerDate?.value === 'string' &&
      moment().isAfter(
        typeof approximateDeadlineData?.value === 'string'
          ? approximateDeadlineData.value
          : registerDate.value,
        'day'
      )
    ) {
      setIsDateBefore(true);
      return true;
    }
  }
};

/** タグデータからIDだけを取得 */
export const getTagId = (tagData: TagData[]) => {
  const tagIds = tagData.map((tag) => tag.id);
  return tagIds;
};

/** パスワードリセットのメールアドレスのバリデーション */
export const passwordResetValidation = async (mailAddress: string) => {
  try {
    if (mailAddress === '') return MAIL_ADDRESS_VALIDATION_MESSAGE.NO_TEXT;
    /** メールアドレスのチェック */
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(mailAddress))
      return MAIL_ADDRESS_VALIDATION_MESSAGE.INVALID_EMAIL;

    const auth = getAuth();
    await sendPasswordResetEmail(auth, mailAddress);
    return MAIL_ADDRESS_VALIDATION_MESSAGE.SUCCESS;
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      return 'ユーザーが存在しません。';
    }
    throw error;
  }
};

/** パスワード変更のバリデーションチェック */
export const passwordValidationCheck = (
  postData: AuthPostData[],
  setHasError: (e: { key: string; error: string }[]) => void
) => {
  /** 大文字と小文字が含まれているかチェック */
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  /** 半角英数字と指定の記号のみかチェック */
  const alphanumericAndSymbolsRegex = /^[A-Za-z0-9@\-_]+$/;
  /** 英語と数字が含まれているかチェック */
  const letterAndNumberRegex = /(?=.*[A-Za-z])(?=.*[0-9])/;
  const getInput = (key: string) =>
    postData.find((item) => item.key === key)?.value;

  const passwordInput = getInput(PASSWORD_UPDATE_INPUT_KEY.PASSWORD);
  const newPasswordInput = getInput(PASSWORD_UPDATE_INPUT_KEY.NEW_PASSWORD);
  const newPasswordConfirmInput = getInput(
    PASSWORD_UPDATE_INPUT_KEY.NEW_PASSWORD_CONFIRMATION
  );
  const data = [
    {
      key: PASSWORD_UPDATE_INPUT_KEY.PASSWORD,
      value: passwordInput ?? '',
    },
    {
      key: PASSWORD_UPDATE_INPUT_KEY.NEW_PASSWORD,
      value: newPasswordInput ?? '',
    },
    {
      key: PASSWORD_UPDATE_INPUT_KEY.NEW_PASSWORD_CONFIRMATION,
      value: newPasswordConfirmInput ?? '',
    },
  ];

  const validationResults = data.map((item) => {
    const password = item.key === PASSWORD_UPDATE_INPUT_KEY.PASSWORD;
    if (item.value === '') {
      return {
        key: item.key,
        error: PASSWORD_CHANGE_MESSAGE.NO_TEXT,
      };
    } else if (item.value.length < 6) {
      return {
        key: item.key,
        error: password
          ? PASSWORD_CHANGE_MESSAGE.INVALID_PASSWORD
          : PASSWORD_CHANGE_MESSAGE.INVALID_SEVEN_LENGTH,
      };
    } else if (
      !uppercaseRegex.test(item.value) ||
      !lowercaseRegex.test(item.value)
    ) {
      return {
        key: item.key,
        error: password
          ? PASSWORD_CHANGE_MESSAGE.INVALID_PASSWORD
          : PASSWORD_CHANGE_MESSAGE.INVALID_CASE,
      };
    } else if (!alphanumericAndSymbolsRegex.test(item.value)) {
      return {
        key: item.key,
        error: password
          ? PASSWORD_CHANGE_MESSAGE.INVALID_PASSWORD
          : PASSWORD_CHANGE_MESSAGE.INVALID_SYMBOL,
      };
    } else if (!letterAndNumberRegex.test(item.value)) {
      return {
        key: item.key,
        error: password
          ? PASSWORD_CHANGE_MESSAGE.INVALID_PASSWORD
          : PASSWORD_CHANGE_MESSAGE.INVALID_LENGTH,
      };
    } else if (
      (item.key === PASSWORD_UPDATE_INPUT_KEY.NEW_PASSWORD ||
        item.key === PASSWORD_UPDATE_INPUT_KEY.NEW_PASSWORD_CONFIRMATION) &&
      newPasswordInput !== newPasswordConfirmInput
    ) {
      return { key: item.key, error: PASSWORD_CHANGE_MESSAGE.INVALID_MATCH };
    } else {
      return { key: item.key, error: '' };
    }
  });
  setHasError(validationResults);
  const validationError = validationResults.find(
    (item) => item.error !== ''
  )?.key;
  if (validationError) {
    return true;
  } else {
    return false;
  }
};
