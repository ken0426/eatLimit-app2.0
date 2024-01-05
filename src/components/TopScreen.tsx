import React from 'react';
import {
  Alert,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackPramList } from '../types';
import AtomAuthButton from './atoms/AtomAuthButton';
import { COLORS, FONTSIZE, SIZE } from '../styles';

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
        {/* <View style={{ marginBottom: 10 }} />
        <AtomAuthButton
          onPress={() => navigation.navigate('loginScreen', { isLogin: false })}
          backgroundColor={'#eeeeee'}
          textColor={'#0c0c0c'}
          text={'新規登録'}
        /> */}
      </View>
      {/* <TouchableOpacity
        onPress={() => Alert.alert('準備中')}
        style={styles.service}
      >
        <Text>利用規約</Text>
      </TouchableOpacity> */}
      {/* </View> */}
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
    // height: SIZE.BASE_WP * 70,
    padding: SIZE.BASE_WP * 6,
  },
  title: {
    marginBottom: SIZE.BASE_HP * 3.5,
  },
  titleText: {
    fontSize: FONTSIZE.SIZE20PX,
  },
  service: {
    // marginTop: SIZE.BASE_HP * 3.5,
    alignItems: 'center',
  },
});
