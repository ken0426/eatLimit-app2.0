import React, { FC } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import { ApiData, PostData, StackPramList } from '../../types';
import { COLORS, FONTSIZE } from '../../styles';
import OrgModalDefault from '../organisms/OrgModalDefault';
import { onRegisterPress } from '../../functions';
import { BUTTON_TEXT, LABEL_NAME } from '../../contents';
import { useNavigation } from '@react-navigation/native';
import { useRootDispatch } from '../../redux/store/store';
import { setTagSelectedIds } from '../../redux/slices/commonRegisterSlice';
import SvgIcon from '../../images/SvgIcon';
import { registerValidationCheck } from '../../utils';
import { deleteImage, deleteList } from '../../api';
import { auth } from '../../firebase';

type Props = {
  title: string;
  postData: PostData[];
  setIsVisible: (e: boolean) => void;
  isVisible: boolean;
  setIsLoading: (e: boolean) => void;
  message: string;
  setMessage: (e: string) => void;
  isDateBefore: boolean;
  setIsDateBefore: (e: boolean) => void;
  copyData?: { data: ApiData };
  saveType: 'add' | 'update';
  updateListId: string | undefined;
};

const AtomRegister: FC<Props> = ({
  title,
  postData,
  setIsLoading,
  isVisible,
  setIsVisible,
  message,
  setMessage,
  isDateBefore,
  setIsDateBefore,
  copyData,
  saveType,
  updateListId,
}) => {
  const dispatch = useRootDispatch();
  const navigation =
    useNavigation<
      StackNavigationProp<
        StackPramList,
        'registerScreen' | 'updateRegisterScreen'
      >
    >();

  /** モーダルで使用するボタンのデータ */
  const buttonData =
    message === 'データが保存されませんがキャンセルしますか？'
      ? [
          {
            text: BUTTON_TEXT.CANCEL,
            onPress: () => {
              setIsVisible(false);
            },
          },
          {
            text: BUTTON_TEXT.OK,
            onPress: () => {
              dispatch(setTagSelectedIds([]));
              setIsVisible(false);
              navigation.goBack();
            },
          },
        ]
      : message === '本当に削除しますか？'
        ? [
            {
              text: BUTTON_TEXT.CANCEL,
              onPress: () => {
                setIsVisible(false);
              },
            },
            {
              text: BUTTON_TEXT.DECISION,
              onPress: async () => {
                /** 商品を削除 */
                await deleteList(auth.currentUser!.uid, updateListId!);
                /** 選択しているタグをリセット */
                dispatch(setTagSelectedIds([]));
                /** 商品に画像がある場合画像のIDを取得 */
                const imageId = postData.find(
                  (item) => item.key === LABEL_NAME.IMAGE_ID
                )?.value as string;
                if (imageId) {
                  /** 商品の画像を削除 */
                  await deleteImage(auth.currentUser!.uid, imageId);
                }
                setIsVisible(false);
                navigation.goBack();
                navigation.goBack();
              },
            },
          ]
        : [{ text: BUTTON_TEXT.CLOSE, onPress: () => setIsVisible(false) }];

  /** 日付項目で日付と登録する日付を比較して登録する日付が過去の日付の場合、表示するモーダルデータ */
  const dateData = [
    {
      text: BUTTON_TEXT.CANCEL,
      onPress: () => setIsDateBefore(false),
    },
    {
      text: BUTTON_TEXT.OK,
      onPress: async () => {
        try {
          setIsDateBefore(false);
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

          /** 選択しているタグのIDをリセット */
          if (finish) dispatch(setTagSelectedIds([]));
        } catch (error) {}
      },
    },
  ];

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.left}
        onPress={() => {
          const isRegisterData = postData.some((item) => {
            if (
              item.value !== moment().format('YYYY-MM-DD') &&
              item.value !== ''
            )
              return true;
          });
          if (isRegisterData) {
            setIsVisible(isRegisterData);
            setMessage('データが保存されませんがキャンセルしますか？');
          } else {
            navigation.goBack();
          }
        }}
      >
        <SvgIcon
          type={'antDesign'}
          name='close'
          size={24}
          color={COLORS.MAIN_TEXT_COLOR}
          style={styles.icon}
        />
      </TouchableOpacity>
      <View style={styles.headerTitleArea}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <TouchableOpacity
        onPress={async () => {
          try {
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

              /** 選択しているタグのIDをリセット */
              if (finish) dispatch(setTagSelectedIds([]));
            }
          } catch (error) {}
        }}
        style={styles.right}
      >
        <SvgIcon
          type={'fontAwesome'}
          name='pencil-square-o'
          size={24}
          color={COLORS.MAIN_TEXT_COLOR}
        />
      </TouchableOpacity>

      <OrgModalDefault
        isVisible={isVisible}
        cancelOnPress={() => setIsVisible(false)}
        message={message}
        data={buttonData}
      />
      <OrgModalDefault
        isVisible={isDateBefore}
        cancelOnPress={() => setIsDateBefore(false)}
        message={'登録する日付が過去の日付です。それでもよいですか？'}
        data={dateData}
      />
    </View>
  );
};

export default AtomRegister;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  left: {
    width: '33%',
  },
  right: {
    width: '33%',
    alignItems: 'flex-end',
  },
  headerText: {
    textAlign: 'center',
    fontSize: FONTSIZE.SIZE24PX,
    fontWeight: 'bold',
    color: COLORS.MAIN_TEXT_COLOR,
  },
  icon: {
    right: 1,
    padding: 2,
  },
  headerTitleArea: {
    width: '33%',
  },
});
