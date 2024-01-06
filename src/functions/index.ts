import { ActionSheetIOS, Alert, Platform } from 'react-native';
import moment from 'moment';
import * as ImagePicker from 'expo-image-picker';
import { Dispatch } from '@reduxjs/toolkit';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  ACTION_SHEET,
  CAMERA_ERROR_MESSAGE,
  LABEL,
  LABEL_NAME,
} from '../contents';
import {
  ApiData,
  HandleRegistrationPress,
  ListData,
  PostData,
  StackPramList,
} from '../types';
import {
  setDateDisplayId,
  setDateFormatDisplayId,
  setDayOfWeekId,
  setImageId,
  setSelectMemoTemplate,
} from '../redux/slices/commonSlice';
import { registerValidationCheck } from '../utils';
import { deleteImage, saveImage, saveList } from '../api';
import { auth } from '../firebase';
import uuid from 'react-native-uuid';

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
  copyData?: { data: ApiData };
  saveType: 'add' | 'update';
  updateListId: string | undefined;
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
  copyData,
  saveType,
  updateListId,
}: OnRegisterPress) => {
  if (auth.currentUser === null) return;
  try {
    setIsLoading(true);

    /** 登録前に登録する年月日と日時を追加 */
    const newPostData = [
      ...postData,
      {
        key: 'registerDate',
        value: moment().format('YYYY-MM-DD HH:mm:ss'),
        isRequired: true,
      },
    ];

    const imageData = newPostData.find((item) => item.key === LABEL_NAME.IMAGE)
      ?.value as string;
    const imageUpdateId = newPostData.find(
      (item) => item.key === LABEL_NAME.IMAGE_ID
    )?.value as string;
    const imageId = saveType === 'add' ? (uuid.v4() as string) : imageUpdateId!;
    if (imageData) {
      /** 画像をDBに保存する */
      await saveImage(auth.currentUser.uid, imageData, imageId);
    } else if (!imageData && imageUpdateId) {
      /** 画像を削除する */
      await deleteImage(auth.currentUser.uid, imageUpdateId);
    }

    const saveData = imageData
      ? ([
          ...newPostData,
          { isRequired: true, key: 'imageId', value: imageId },
        ] as PostData[])
      : newPostData;

    await saveList(saveData, auth.currentUser.uid, saveType, updateListId);
    if (copyData) {
      navigation.pop(2);
    } else {
      navigation.goBack();
    }

    return true;
  } catch (error) {
    setIsVisible(true);
    setMessage('送信に失敗しました');
    throw error;
  } finally {
    setIsLoading(false);
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

/** 「登録」「変更」「コピー」のボタンを押したときの共通処理 */
export const handleRegistrationPress = async ({
  postData,
  setIsVisible,
  setMessage,
  setIsDateBefore,
  setIsLoading,
  copyData,
  navigation,
  saveType,
  updateListId,
}: HandleRegistrationPress) => {
  const validationError = registerValidationCheck({
    postData,
    setIsVisible,
    setMessage,
    setIsDateBefore,
  });
  if (!validationError) {
    const finish = await onRegisterPress({
      postData,
      setIsVisible,
      setIsLoading,
      navigation,
      setMessage,
      copyData,
      saveType,
      updateListId,
    });

    return finish;
  }
};
