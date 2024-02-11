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
import AtomSettingRegister from './atoms/AtomSettingRegister';
import AtomAuthInput from './atoms/AtomAuthInput';
import AtomAuthButton from './atoms/AtomAuthButton';
import MolHeader from './molecules/MolHeader';
import { HEADER_TYPE, MAIL_ADDRESS_UPDATE_INPUT_KEY } from '../contents';
import { COLORS, FONTSIZE, SIZE, STYLE_FLEX } from '../styles';
import { useAuthInput } from '../hooks/useAuthInput';
import { mailAddressValidationCheck } from '../utils';

const MailAddressUpdateScreen = () => {
  const navigation = useNavigation();
  const [hasError, setHasError] = useState<{ key: string; error: string }[]>([
    { key: MAIL_ADDRESS_UPDATE_INPUT_KEY.MAIL_ADDRESS, error: '' },
    { key: MAIL_ADDRESS_UPDATE_INPUT_KEY.NEW_MAIL_ADDRESS, error: '' },
  ]);

  const { setTargetPostData, postData } = useAuthInput();

  const getValue = (key: string) =>
    postData.find((item) => item.key === key)?.value;

  const getHasError = (key: string) =>
    hasError.find((item) => item.key === key)?.error;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[STYLE_FLEX, styles.contents]}>
        <MolHeader style={styles.header} type={HEADER_TYPE.MAIL_ADDRESS_UPDATE}>
          <AtomSettingRegister
            title={''}
            onRightPress={() => navigation.goBack()}
          />
        </MolHeader>
        <View style={styles.inputArea}>
          <Text style={styles.title}>メールアドレス変更</Text>
          <View style={styles.mailAddressInputArea}>
            <AtomAuthInput
              text={'現在のメールアドレス'}
              value={getValue(MAIL_ADDRESS_UPDATE_INPUT_KEY.MAIL_ADDRESS) || ''}
              setData={(data) => {
                setTargetPostData({
                  key: MAIL_ADDRESS_UPDATE_INPUT_KEY.MAIL_ADDRESS,
                  value: data,
                });
              }}
              errorMessage={
                getHasError(MAIL_ADDRESS_UPDATE_INPUT_KEY.MAIL_ADDRESS) ?? null
              }
              type={'email'}
              inputKey={''}
              hasError={hasError}
              setHasError={setHasError}
            />
            <AtomAuthInput
              text={'新しいメールアドレス'}
              value={
                getValue(MAIL_ADDRESS_UPDATE_INPUT_KEY.NEW_MAIL_ADDRESS) || ''
              }
              setData={(data) => {
                setTargetPostData({
                  key: MAIL_ADDRESS_UPDATE_INPUT_KEY.NEW_MAIL_ADDRESS,
                  value: data,
                });
              }}
              errorMessage={
                getHasError(MAIL_ADDRESS_UPDATE_INPUT_KEY.NEW_MAIL_ADDRESS) ??
                null
              }
              type={'email'}
              inputKey={''}
              hasError={hasError}
              setHasError={setHasError}
            />
          </View>
          <AtomAuthButton
            onPress={async () => {
              const validationResults = mailAddressValidationCheck(
                postData,
                setHasError
              );

              // メールアドレスの形に問題なければメールアドレスの変更を行う
            }}
            text={'変更'}
            backgroundColor={COLORS.BLACK}
            textColor={COLORS.SIGN_IN_BUTTON}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MailAddressUpdateScreen;

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
    justifyContent: 'flex-start',
    flex: 1,
  },
  title: {
    fontSize: FONTSIZE.SIZE25PX,
    marginBottom: SIZE.BASE_WP * 4.4,
  },
  mailAddressInputArea: {
    height: '18%',
    justifyContent: 'space-between',
    marginBottom: SIZE.BASE_WP * 10,
  },
});
