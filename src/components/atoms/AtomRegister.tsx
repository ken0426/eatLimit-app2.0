import React, { FC, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PostData, StackPramList } from '../../types';
import { COLORS, FONTSIZE } from '../../styles';
import OrgModalDefault from '../organisms/OrgModalDefault';
import { onRegisterPress } from '../../functions';
import moment from 'moment';
import { BUTTON_TEXT } from '../../contents';

type Props = {
  navigation: StackNavigationProp<
    StackPramList,
    'registerScreen' | 'updateRegisterScreen'
  >;
  title: string;
  postData: PostData[];
  setIsVisible: (e: boolean) => void;
  isVisible: boolean;
  setIsLoading: (e: boolean) => void;
  message: string;
  setMessage: (e: string) => void;
};

const AtomRegister: FC<Props> = ({
  navigation,
  title,
  postData,
  setIsLoading,
  isVisible,
  setIsVisible,
  message,
  setMessage,
}) => {
  /** 今日の日付と登録する日付を比較して登録する日付が過去の日付の場合はモーダルを表示するためのフラグ */
  const [isDateBefore, setIsDateBefore] = useState(false);

  /** モーダルで使用するボタンのデータ */
  const buttonData =
    message === 'データが保存されませんがキャンセルしますか？'
      ? [
          { text: BUTTON_TEXT.CANCEL, onPress: () => setIsVisible(false) },
          {
            text: BUTTON_TEXT.OK,
            onPress: () => {
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
      onPress: () => {
        setIsDateBefore(false);
        onRegisterPress({
          postData,
          setIsVisible,
          setIsLoading,
          navigation,
          setMessage,
        });
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
        <AntDesign
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
        onPress={() => {
          const registerDate = postData.find((item) => item.key === 'date');
          if (registerDate && moment().isAfter(registerDate.value, 'day')) {
            setIsDateBefore(true);
          } else {
            onRegisterPress({
              postData,
              setIsVisible,
              setIsLoading,
              navigation,
              setMessage,
            });
          }
        }}
        style={{ width: '33%', alignItems: 'flex-end' }}
      >
        <FontAwesome
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
