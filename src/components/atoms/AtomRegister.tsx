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
        onPress={() =>
          onRegisterPress({
            postData,
            setIsVisible,
            setIsLoading,
            navigation,
            setMessage,
          })
        }
        style={{ width: '33%', alignItems: 'flex-end' }}
      >
        <FontAwesome
          name='pencil-square-o'
          size={24}
          color={COLORS.MAIN_TEXT_COLOR}
        />
      </TouchableOpacity>

      {/* TODO onPressのPropsを削除し、ロジックを作り直す */}
      <OrgModalDefault
        isVisible={isVisible}
        cancelOnPress={() => setIsVisible(false)}
        message={message}
        data={
          message === 'データが保存されませんがキャンセルしますか？'
            ? [
                {
                  text: 'OK',
                  onPress: () => {
                    setIsVisible(false);
                    navigation.goBack();
                  },
                },
                { text: 'キャンセル', onPress: () => setIsVisible(false) },
              ]
            : [{ text: '閉じる', onPress: () => setIsVisible(false) }]
        }
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
