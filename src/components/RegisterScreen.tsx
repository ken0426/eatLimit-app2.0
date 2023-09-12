import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { StackPramList } from '../types';
import MolHeader from './molecules/MolHeader';
import { COLORS, FONTSIZE, SIZE } from '../styles';
import AtomRegister from './atoms/AtomRegister';
import AtomFileSelect from './atoms/AtomFileSelect';
import AtomSingleSelect from './atoms/AtomSingleSelect';
import AtomSingleInput from './atoms/AtomSingleInput';
import AtomDate from './atoms/AtomDate';
import {
  DATE_ERROR_MESSAGE,
  LABEL_NAME,
  keepData,
  managementData,
} from '../contents';
import AtomMemo from './atoms/AtomMemo';
import AtomButton from './atoms/AtomButton';
import { useRegister } from '../hooks/useRegister';
import AtomLoading from './atoms/AtomLoading';
import { onRegisterPress } from '../functions';
import AtomCounter from './atoms/AtomCounter';
import moment from 'moment';
import { useDateError } from '../hooks/useDateError';

type Props = {
  navigation: StackNavigationProp<StackPramList, 'registerScreen'>;
};

const RegisterScreen: FC<Props> = ({ navigation }) => {
  /** キーボードで入力するエリアで高さを調整するフラグ */
  const [enabled, setEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [message, setMessage] = useState('');
  const [label, setLabel] = useState('');
  /** 今日の日付と登録する日付を比較して登録する日付が過去の日付の場合はモーダルを表示するためのフラグ */
  const [isDateBefore, setIsDateBefore] = useState(false);

  const { setTargetPostData, postData } = useRegister();
  const { isDateErrorMessage } = useDateError(postData, label);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: COLORS.WHITE, flex: 1 }}>
        <MolHeader style={styles.header} type={'default'}>
          <AtomRegister
            navigation={navigation}
            title={'登録'}
            postData={postData}
            setIsLoading={setIsLoading}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            message={message}
            setMessage={setMessage}
            isDateBefore={isDateBefore}
            setIsDateBefore={setIsDateBefore}
          />
        </MolHeader>

        <ScrollView>
          <KeyboardAvoidingView
            behavior='position'
            style={{ flex: 1 }}
            enabled={enabled}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
          >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={{ width: '100%' }}>
                <AtomFileSelect
                  setData={(data) =>
                    setTargetPostData({
                      key: LABEL_NAME.IMAGE,
                      value: data.value,
                      isRequired: data.isRequired,
                    })
                  }
                />
                <View style={styles.inputForm}>
                  <AtomSingleInput
                    label={'商品名'}
                    onPressIn={() => setEnabled(false)}
                    isRequired={true}
                    setData={(data) =>
                      setTargetPostData({
                        key: LABEL_NAME.PRODUCT,
                        value: data.value,
                        isRequired: data.isRequired,
                      })
                    }
                  />
                  <AtomCounter
                    onPressIn={() => setEnabled(false)}
                    setData={(data) => {
                      setTargetPostData({
                        key: LABEL_NAME.QUANTITY,
                        value: data.value,
                        isRequired: data.isRequired,
                      });
                    }}
                  />
                  <AtomSingleSelect
                    label={'管理方法'}
                    data={managementData}
                    isRequired={true}
                    setData={(data) => {
                      setTargetPostData({
                        key: LABEL_NAME.MANAGEMENT,
                        value: data.value,
                        isRequired: data.isRequired,
                      });
                      setLabel(data.value);
                    }}
                  />
                  <AtomSingleSelect
                    label={'保存方法'}
                    data={keepData}
                    isRequired={true}
                    setData={(data) =>
                      setTargetPostData({
                        key: LABEL_NAME.PRESERVATION,
                        value: data.value,
                        isRequired: data.isRequired,
                      })
                    }
                  />
                  <AtomDate
                    isRequired={true}
                    label={'日付'}
                    setData={(data) =>
                      setTargetPostData({
                        key: LABEL_NAME.DATE,
                        value: data.value,
                        isRequired: data.isRequired,
                      })
                    }
                    errorMessage={
                      isDateErrorMessage ? DATE_ERROR_MESSAGE.DATE : ''
                    }
                  />
                  {(label === '購入日' || label === '登録日') && (
                    <AtomDate
                      isRequired={true}
                      label={'期限目安'}
                      isLimit={true}
                      setData={(data) =>
                        setTargetPostData({
                          key: LABEL_NAME.APPROXIMATE_DEADLINE,
                          value: data.value,
                          isRequired: data.isRequired,
                        })
                      }
                      errorMessage={
                        isDateErrorMessage
                          ? DATE_ERROR_MESSAGE.APPROXIMATE_DEADLINE
                          : ''
                      }
                    />
                  )}
                  <AtomSingleInput
                    label={'購入場所'}
                    onPressIn={() => setEnabled(true)}
                    setData={(data) =>
                      setTargetPostData({
                        key: LABEL_NAME.PLACE_OF_PURCHASE,
                        value: data.value,
                        isRequired: data.isRequired,
                      })
                    }
                  />
                  <AtomSingleInput
                    label={'金額'}
                    onPressIn={() => setEnabled(true)}
                    keyboardType={'number-pad'}
                    setData={(data) =>
                      setTargetPostData({
                        key: LABEL_NAME.AMOUNT_OF_MONEY,
                        value: data.value,
                        isRequired: data.isRequired,
                      })
                    }
                  />
                  <AtomMemo
                    onPress={() => setEnabled(true)}
                    setData={(data) =>
                      setTargetPostData({
                        key: LABEL_NAME.MEMO,
                        value: data.value,
                        isRequired: data.isRequired,
                      })
                    }
                  />
                </View>
                <View style={styles.buttonArea}>
                  <AtomButton
                    onPress={() =>
                      onRegisterPress({
                        postData,
                        setIsVisible,
                        setIsLoading,
                        navigation,
                        setMessage,
                        setIsDateBefore,
                      })
                    }
                    color={COLORS.WHITE}
                    fontSize={FONTSIZE.SIZE30PX}
                    backgroundColor={COLORS.BLUE}
                    width={200}
                    buttonText={'登録'}
                    fontWeight={'bold'}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>

      {isLoading && <AtomLoading />}
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  header: {
    height: SIZE.BASE_HP * 12,
    paddingHorizontal: SIZE.BASE_WP * 5,
    paddingTop: SIZE.BASE_HP * 4,
    backgroundColor: COLORS.MAIN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 2,
  },
  inputForm: {
    paddingHorizontal: SIZE.BASE_HP * 1.2,
    paddingBottom: SIZE.BASE_HP * 1.2,
  },
  buttonArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: SIZE.BASE_HP * 2.4,
  },
});
