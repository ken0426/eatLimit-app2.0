/** React */
import React, { useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
/** ライブラリ */
import { useNavigation } from '@react-navigation/native';
/** その他 */
import AtomAuthInput from './atoms/AtomAuthInput';
import AtomAuthButton from './atoms/AtomAuthButton';
import AtomSettingRegister from './atoms/AtomSettingRegister';
import MolHeader from './molecules/MolHeader';
import { COLORS, FONTSIZE, SIZE, STYLE_FLEX } from '../styles';
import { BUTTON_TEXT, HEADER_TYPE, PASSWORD_RESET_MESSAGE } from '../contents';
import { passwordResetValidation } from '../utils';
import OrgModalDefault from './organisms/OrgModalDefault';

const PasswordResetScreen = () => {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  /** メールアドレスを送信できたかどうかのフラグ */
  const [isSend, setIsSend] = useState(false);

  return isSend ? (
    <View style={[STYLE_FLEX, styles.sendContents]}>
      <Text style={styles.sendText}>{message}</Text>
      <View style={styles.buttonArea}>
        <AtomAuthButton
          onPress={() => navigation.goBack()}
          backgroundColor={COLORS.BLACK}
          text={'ログイン画面に戻る'}
          textColor={COLORS.WHITE}
        />
      </View>
    </View>
  ) : (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[STYLE_FLEX, styles.contents]}>
        <MolHeader style={styles.header} type={HEADER_TYPE.PASSWORD_RESET}>
          <AtomSettingRegister
            title={''}
            onRightPress={() => navigation.goBack()}
          />
        </MolHeader>
        <View style={styles.inputArea}>
          <Text style={styles.title}>パスワードリセット</Text>
          <AtomAuthInput
            text={'メールアドレス'}
            keyboardType={'email-address'}
            value={text}
            setData={(e) => setText(e)}
            errorMessage={''}
            type={'email'}
          />

          <View style={styles.submitButton}>
            <AtomAuthButton
              onPress={async () => {
                const validation = await passwordResetValidation(text);
                setMessage(validation);
                if (validation === PASSWORD_RESET_MESSAGE.SUCCESS) {
                  setIsSend(true);
                } else {
                  setIsVisible(true);
                }
              }}
              backgroundColor={COLORS.BLACK}
              text={'送信'}
              textColor={COLORS.WHITE}
            />
          </View>
        </View>
        <OrgModalDefault
          isVisible={isVisible}
          cancelOnPress={() => setIsVisible(false)}
          message={message}
          data={[
            {
              text: BUTTON_TEXT.OK,
              onPress: () => setIsVisible(false),
            },
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PasswordResetScreen;

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
  sendContents: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  sendText: {
    textAlign: 'center',
    fontSize: FONTSIZE.SIZE20PX,
  },
  buttonArea: {
    marginHorizontal: SIZE.BASE_WP * 6,
    marginTop: SIZE.BASE_WP * 10,
  },
  title: {
    fontSize: FONTSIZE.SIZE30PX,
    fontWeight: 'bold',
    marginBottom: SIZE.BASE_WP * 7,
  },
  inputArea: {
    paddingHorizontal: SIZE.BASE_WP * 5,
    justifyContent: 'center',
  },
  submitButton: {
    marginTop: SIZE.BASE_WP * 5,
  },
});
