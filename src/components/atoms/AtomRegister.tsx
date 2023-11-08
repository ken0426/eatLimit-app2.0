import React, { FC } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ApiData, PostData, StackPramList } from '../../types';
import { COLORS, FONTSIZE } from '../../styles';
import OrgModalDefault from '../organisms/OrgModalDefault';
import { onRegisterPress } from '../../functions';
import moment from 'moment';
import { BUTTON_TEXT, LABEL_NAME, MODAL_MESSAGE } from '../../contents';
import { useNavigation } from '@react-navigation/native';
import { useRootDispatch } from '../../redux/store/store';
import { setTagSelectedIds } from '../../redux/slices/commonRegisterSlice';
import SvgIcon from '../../images/SvgIcon';

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
  isCopyRegister?: { data: ApiData };
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
  isCopyRegister,
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
            isCopyRegister,
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
        style={{ width: '33%' }}
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
          style={{ right: 1, padding: 2 }}
        />
      </TouchableOpacity>
      <View style={{ width: '33%' }}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <TouchableOpacity
        onPress={async () => {
          const registerDate = postData.find(
            (item) => item.key === LABEL_NAME.DATE
          );
          /** 個数を取得するロジック */
          const count = postData.find(
            (item) => item.key === LABEL_NAME.QUANTITY
          )?.value;
          if (count && Number(count) > 999) {
            setIsVisible(true);
            setMessage(MODAL_MESSAGE.QUANTITY);
          }
          // もし、日付項目が今日の日付より前の日付の場合は、警告モーダルを表示し、一旦POSTはしないロジックを追加
          else if (
            registerDate &&
            moment().isAfter(registerDate.value, 'day')
          ) {
            return setIsDateBefore(true);
          } else {
            try {
              const finish = await onRegisterPress({
                postData,
                setIsVisible,
                setIsLoading,
                navigation,
                setMessage,
                isCopyRegister,
              });

              /** 選択しているタグのIDをリセット */
              if (finish) dispatch(setTagSelectedIds([]));
            } catch (error) {}
          }
        }}
        style={{ width: '33%', alignItems: 'flex-end' }}
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
  headerText: {
    textAlign: 'center',
    fontSize: FONTSIZE.SIZE24PX,
    fontWeight: 'bold',
    color: COLORS.MAIN_TEXT_COLOR,
  },
});
