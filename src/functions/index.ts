import { ActionSheetIOS, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ACTION_SHEET, CAMERA_ERROR_MESSAGE } from '../contents';

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

/** カメラの起動 */
const takePhoto = async (setImage: (e: string) => void) => {
  try {
    const result: any = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  } catch (error) {
    console.log(error);
  }
};

/** ライブラリから画像を選択 */
const pickImage = async (setImage: (e: string) => void) => {
  try {
    const result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  } catch (error) {
    console.log(error);
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
