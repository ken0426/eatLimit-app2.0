import { ActionSheetIOS, Alert, Platform } from 'react-native';

/** 画像をアップロードするときに出るモーダル */
export const onPressAction = (isImage: boolean) => {
  if (Platform.OS === 'ios') {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: isImage
          ? ['キャンセル', '写真を撮影', '写真を選択', '削除']
          : ['キャンセル', '写真を撮影', '写真を選択'],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 3,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // キャンセルのアクション
        } else if (buttonIndex === 1) {
          // カメラを起動
          // takePhoto();
        } else if (buttonIndex === 2) {
          // ライブラリから写真を選択
          // pickImage();
        } else if (buttonIndex === 3) {
          // setImage(null);
        }
      }
    );
  } else if (Platform.OS === 'android') {
    Alert.alert('Androidは現在準備中です');
  }
};
