import React, { FC, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PostData, StackPramList } from '../../types';
import { COLORS, FONTSIZE } from '../../styles';
import OrgModalDefault from '../organisms/OrgModalDefault';

type Props = {
  navigation:
    | StackNavigationProp<StackPramList, 'registerScreen'>
    | StackNavigationProp<StackPramList, 'updateRegisterScreen'>;
  title: string;
  postData: PostData[];
  setIsLoading: (e: boolean) => void;
};

const AtomRegister: FC<Props> = ({
  navigation,
  title,
  postData,
  setIsLoading,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const onPress = async () => {
    /** 必須項目を抽出 */
    const filterData = postData.filter((item) => item.isRequired);
    /** 必須項目の中で1つでも空文字がある場合はtrueにする */
    const isTextNull = filterData.find((item) => item.value === '');
    if (isTextNull) {
      setIsVisible(true);
    } else {
      console.log('postするデータ（常に監視）', postData);
      setIsLoading(true);
      console.log('リクエストを送信中・・・');
      await new Promise((resolve) => setTimeout(resolve, 3000)); // 3秒待機（見た目として実装）
      console.log('DBに保存完了'); // 非同期処理
      setIsLoading(false);
      navigation.goBack();
    }
  };
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={{ width: '33%' }}
        onPress={() => navigation.goBack()}
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
        onPress={onPress}
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
        onPress={() => setIsVisible(false)}
        message={'必須項目が入力されていません'}
        data={[{ text: '閉じる' }]}
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
