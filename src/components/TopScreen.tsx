/** React */
import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
/** ライブラリ */
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
/** その他 */
import AtomAuthButton from './atoms/AtomAuthButton';
import { StackPramList } from '../types';
import { COLORS, SIZE } from '../styles';

const TopScreen = () => {
  const navigation = useNavigation<StackNavigationProp<StackPramList>>();

  return (
    <ImageBackground
      source={require('../images/top.png')}
      style={styles.screenArea}
    >
      <View style={styles.contents}>
        <AtomAuthButton
          onPress={() => navigation.navigate('loginScreen', { isLogin: true })}
          backgroundColor={COLORS.BLACK}
          textColor={COLORS.SIGN_IN_BUTTON}
          text={'はじめる'}
        />
      </View>
    </ImageBackground>
  );
};

export default TopScreen;

const styles = StyleSheet.create({
  screenArea: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  contents: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZE.BASE_WP * 6,
  },
});
