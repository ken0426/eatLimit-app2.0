import { ActionSheetIOS, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ACTION_SHEET, CAMERA_ERROR_MESSAGE } from '../contents';

/** カメラの起動 */
const takePhoto = async (setImage: (e: string) => void) => {
  let result: any = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
  });

  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
};

/** 画像をアップロードするときに出るモーダル */
export const onPressAction = (
  isImage: boolean,
  hasPermission: boolean,
  setImage: (e: string) => void
) => {
  if (Platform.OS === 'ios') {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: isImage
          ? ['キャンセル', '写真を撮影', '写真を選択', '削除']
          : ['キャンセル', '写真を撮影', '写真を選択'],
        cancelButtonIndex: ACTION_SHEET.CAN_SELL,
        destructiveButtonIndex: ACTION_SHEET.DELETE,
      },
      (buttonIndex) => {
        if (buttonIndex === ACTION_SHEET.CAN_SELL) {
          // キャンセルのアクション
        } else if (buttonIndex === ACTION_SHEET.CAMERA) {
          if (!hasPermission) {
            Alert.alert(CAMERA_ERROR_MESSAGE);
          } else {
            takePhoto(setImage);
          }
        } else if (buttonIndex === ACTION_SHEET.LIBRARY) {
          // ライブラリから写真を選択
          // pickImage();
        } else if (buttonIndex === ACTION_SHEET.DELETE) {
          setImage('');
        }
      }
    );
  } else if (Platform.OS === 'android') {
    Alert.alert('Androidは現在準備中です');
  }
};
