/** React */
import React from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
/** ライブラリ */
import { useNavigation } from '@react-navigation/native';
/** その他 */
import AtomSettingRegister from './atoms/AtomSettingRegister';
import MolHeader from './molecules/MolHeader';
import { HEADER_TYPE } from '../contents';
import { SIZE, STYLE_FLEX } from '../styles';

const PasswordUpdateScreen = () => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[STYLE_FLEX, styles.contents]}>
        <MolHeader style={styles.header} type={HEADER_TYPE.PASSWORD_RESET}>
          <AtomSettingRegister
            title={''}
            onRightPress={() => navigation.goBack()}
          />
        </MolHeader>
        <View style={styles.inputArea}></View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PasswordUpdateScreen;

const styles = StyleSheet.create({
  header: {
    height: SIZE.BASE_HP * 12,
    paddingHorizontal: SIZE.BASE_WP * 5,
    paddingTop: SIZE.BASE_HP * 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 2,
  },
  contents: {
    backgroundColor: '#ffffff',
  },
  inputArea: {
    paddingHorizontal: SIZE.BASE_WP * 5,
    justifyContent: 'center',
  },
});
