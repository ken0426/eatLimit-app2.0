import { ActionSheetIOS, Alert, Platform } from 'react-native';
import { ACTION_SHEET } from '../contents';

/** 画像をアップロードするときに出るモーダル */
export const onPressAction = (isImage: boolean) => {
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
          // カメラを起動
          // takePhoto();
        } else if (buttonIndex === ACTION_SHEET.LIBRARY) {
          // ライブラリから写真を選択
          // pickImage();
        } else if (buttonIndex === ACTION_SHEET.DELETE) {
          // setImage(null);
        }
      }
    );
  } else if (Platform.OS === 'android') {
    Alert.alert('Androidは現在準備中です');
  }
};
