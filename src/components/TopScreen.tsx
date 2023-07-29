import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StackPramList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import AtomAuthButton from './atoms/AtomAuthButton';
import { FONTSIZE, SIZE } from '../styles';

const TopScreen = () => {
  const navigation = useNavigation<StackNavigationProp<StackPramList>>();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.contents}>
        <View style={styles.title}>
          <Text style={styles.titleText}>さっそくはじめよう</Text>
        </View>
        <View style={styles.buttonArea}>
          <AtomAuthButton
            onPress={() =>
              navigation.navigate('loginScreen', { isLogin: true })
            }
            backgroundColor={'#1797ec'}
            textColor={'#fcfcfc'}
            text={'ログイン'}
          />
          <AtomAuthButton
            onPress={() =>
              navigation.navigate('loginScreen', { isLogin: false })
            }
            backgroundColor={'#eeeeee'}
            textColor={'#0c0c0c'}
            text={'新規登録'}
          />
        </View>
        <TouchableOpacity
          onPress={() => Alert.alert('準備中')}
          style={styles.service}
        >
          <Text>利用規約</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TopScreen;

const styles = StyleSheet.create({
  contents: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: SIZE.BASE_WP * 10,
  },
  title: {
    marginBottom: SIZE.BASE_HP * 3.5,
  },
  titleText: {
    fontSize: FONTSIZE.SIZE20PX,
  },
  buttonArea: {
    width: '100%',
    height: SIZE.BASE_HP * 13,
    justifyContent: 'space-around',
  },
  service: {
    marginTop: SIZE.BASE_HP * 3.5,
  },
});
