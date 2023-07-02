import React, { FC } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PostData, StackPramList } from '../../types';
import { COLORS, FONTSIZE } from '../../styles';
import OrgModalDefault from '../organisms/OrgModalDefault';
import { onRegisterPress } from '../../functions';

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
};

const AtomRegister: FC<Props> = ({
  navigation,
  title,
  postData,
  setIsLoading,
  isVisible,
  setIsVisible,
}) => {
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
        onPress={() =>
          onRegisterPress({ postData, setIsVisible, setIsLoading, navigation })
        }
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
