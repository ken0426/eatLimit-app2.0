import { ActionSheetIOS, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Dispatch } from '@reduxjs/toolkit';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  ACTION_SHEET,
  CAMERA_ERROR_MESSAGE,
  LABEL,
  LABEL_NAME,
  MODAL_MESSAGE,
} from '../contents';
import { ListData, PostData, StackPramList } from '../types';
import {
  setDateDisplayId,
  setDateFormatDisplayId,
  setDayOfWeekId,
  setImageId,
  setSelectMemoTemplate,
} from '../redux/slices/commonSlice';
import moment from 'moment';

type Options = {
  options: string[];
  cancelButtonIndex?: number;
  destructiveButtonIndex?: number;
  title?: string;
  message?: string;
  anchor?: number;
  tintColor?: string;
};

type Callback = (buttonIndex: number | undefined) => void | Promise<void>;

type OnRegisterPress = {
  postData: PostData[];
  setIsVisible: (e: boolean) => void;
  setIsLoading: (e: boolean) => void;
  navigation: StackNavigationProp<
    StackPramList,
    'registerScreen' | 'updateRegisterScreen'
  >;
  setMessage: (e: string) => void;
};

/** カメラの起動 */
const takePhoto = async (setImage: (e: string) => void) => {
  try {
    const result: ImagePicker.ImagePickerResult =
      await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  } catch (error) {
    throw error;
  }
};

/** ライブラリから画像を選択 */
const pickImage = async (setImage: (e: string) => void) => {
  try {
    const result: ImagePicker.ImagePickerResult =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  } catch (error) {
    throw error;
  }
};

/** 画像をアップロードするときに出るモーダル */
export const onPressAction = (
  isImage: boolean,
  hasPermission: boolean,
  setImage: (e: string) => void,
  showActionSheetWithOptions: (options: Options, callback: Callback) => void
) => {
  const imageSelected = ['キャンセル', '写真を撮影', '写真を選択', '削除'];
  const noImageSelected = ['キャンセル', '写真を撮影', '写真を選択'];
  const cancelButtonIndex = ACTION_SHEET.CAN_SELL;
  const destructiveButtonIndex = ACTION_SHEET.DELETE;

  const options = isImage ? imageSelected : noImageSelected;

  const handleAction = (buttonIndex: number) => {
    if (buttonIndex === ACTION_SHEET.CAMERA) {
      if (!hasPermission) {
        Alert.alert(CAMERA_ERROR_MESSAGE);
      } else {
        takePhoto(setImage);
      }
    } else if (buttonIndex === ACTION_SHEET.LIBRARY) {
      pickImage(setImage);
    } else if (buttonIndex === destructiveButtonIndex) {
      setImage('');
    }
  };

  if (Platform.OS === 'ios') {
    ActionSheetIOS.showActionSheetWithOptions(
      { options, cancelButtonIndex, destructiveButtonIndex },
      (buttonIndex) => {
        handleAction(buttonIndex);
      }
    );
  } else if (Platform.OS === 'android') {
    showActionSheetWithOptions(
      { options, cancelButtonIndex, destructiveButtonIndex },
      (buttonIndex: number | undefined) => {
        if (buttonIndex) handleAction(buttonIndex);
      }
    );
  }
};

/** 登録や変更ボタンを押したときの処理 */
export const onRegisterPress = async ({
  postData,
  setIsVisible,
  setIsLoading,
  navigation,
  setMessage,
}: OnRegisterPress) => {
  /** 必須項目を抽出 */
  const filterData = postData.filter((item) => item.isRequired);
  /** 必須項目の中で1つでも空文字がある場合はtrueにする */
  const isTextNull = filterData.find((item) => item.value === '');
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
  /** 消費期限などの登録する日付を取得 */
  const registerDate = newPostData.find((item) => item.key === LABEL_NAME.DATE);
  /** 期限目安の日付を取得 */
  const approximateDeadlineData = newPostData.find(
    (item) => item.key === LABEL_NAME.APPROXIMATE_DEADLINE
  );

  newPostData.push({
    key: 'registerDate',
    value: moment().format('YYYY-MM-DD HH:mm:ss'),
    isRequired: true,
  });

  if (isTextNull) {
    setIsVisible(true);
    setMessage(MODAL_MESSAGE.REQUIRED);
  } else if (
    approximateDeadlineData &&
    registerDate &&
    !moment(registerDate.value).isSameOrBefore(approximateDeadlineData.value)
  ) {
    setIsVisible(true);
    setMessage(MODAL_MESSAGE.DATE_ERROR);
  } else {
    try {
      console.log('postするデータ（常に監視）', newPostData);
      setIsLoading(true);
      console.log('リクエストを送信中・・・');
      await new Promise((resolve) => setTimeout(resolve, 2500)); // 2.5秒待機（見た目として実装）
      console.log('DBに保存完了'); // 非同期処理
      navigation.goBack();
    } catch (error) {
      setIsVisible(true);
      setMessage('送信に失敗しました');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }
};

/** 設定項目を保存するロジック */
export const onSettingPress = (
  dispatch: Dispatch,
  label: string,
  item: ListData,
  isTemplate?: boolean
) => {
  // TODO バック側に保存するロジックはここで行う（※非同期にする）
  if (label === LABEL.IMAGE_DISPLAY) {
    dispatch(setImageId(item.id));
  } else if (label === LABEL.DATE_FORMAT_DISPLAY) {
    dispatch(setDateFormatDisplayId(item.id));
  } else if (label === LABEL.DATE_DISPLAY) {
    dispatch(setDateDisplayId(item.id));
  } else if (label === LABEL.DAY_OF_THE_WEEK_DISPLAY) {
    dispatch(setDayOfWeekId(item.id));
  } else if (isTemplate) {
    dispatch(setSelectMemoTemplate(item));
  }
};
