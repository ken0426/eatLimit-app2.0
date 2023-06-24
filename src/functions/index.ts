import { ActionSheetIOS, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ACTION_SHEET, CAMERA_ERROR_MESSAGE } from '../contents';
import { PostData } from '../types';

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
  navigation: any;
};

/** カメラの起動 */
const takePhoto = async (setImage: (e: string) => void) => {
  try {
    const result: any = await ImagePicker.launchCameraAsync({
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
    const result: any = await ImagePicker.launchImageLibraryAsync({
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
}: OnRegisterPress) => {
  /** 必須項目を抽出 */
  const filterData = postData.filter((item) => item.isRequired);
  /** 必須項目の中で1つでも空文字がある場合はtrueにする */
  const isTextNull = filterData.find((item) => item.value === '');
  if (isTextNull) {
    setIsVisible(true);
  } else {
    try {
      console.log('postするデータ（常に監視）', postData);
      setIsLoading(true);
      console.log('リクエストを送信中・・・');
      await new Promise((resolve) => setTimeout(resolve, 2500)); // 2.5秒待機（見た目として実装）
      console.log('DBに保存完了'); // 非同期処理
      navigation.goBack();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }
};
