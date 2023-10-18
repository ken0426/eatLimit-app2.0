import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import moment from 'moment';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useRoute } from '@react-navigation/native';
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
  HEADER_TYPE,
  LABEL_NAME,
  LABEL_TEXT,
  keepData,
  managementData,
} from '../contents';
import AtomMemo from './atoms/AtomMemo';
import AtomButton from './atoms/AtomButton';
import { useRegister } from '../hooks/useRegister';
import AtomLoading from './atoms/AtomLoading';
import { onRegisterPress } from '../functions';
import AtomCounter from './atoms/AtomCounter';
import { useDateError } from '../hooks/useDateError';
import { useCopyEdit } from '../hooks/useCopyEdit';

const RegisterScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<StackPramList, 'registerScreen'>>();
  const route = useRoute();
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

  useCopyEdit(postData, setTargetPostData, setLabel);

  const getTextData = (key: string) =>
    postData.find((item) => item.key === key)?.value;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: COLORS.WHITE, flex: 1 }}>
        <MolHeader style={styles.header} type={HEADER_TYPE.DEFAULT}>
          <AtomRegister
            title={route.params ? 'コピー' : '登録'}
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
                    label={LABEL_TEXT.PRODUCT}
                    onPressIn={() => setEnabled(false)}
                    isRequired={true}
                    setData={(data) =>
                      setTargetPostData({
                        key: LABEL_NAME.PRODUCT,
                        value: data.value,
                        isRequired: data.isRequired,
                      })
                    }
                    textData={getTextData(LABEL_NAME.PRODUCT) ?? ''}
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
                    textData={
                      route.params
                        ? Number(getTextData(LABEL_NAME.QUANTITY)) ?? 1
                        : undefined
                    }
                  />
                  <AtomSingleSelect
                    label={LABEL_TEXT.MANAGEMENT}
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
                    textData={getTextData(LABEL_NAME.MANAGEMENT) ?? ''}
                  />
                  <AtomSingleSelect
                    label={LABEL_TEXT.PRESERVATION}
                    data={keepData}
                    isRequired={true}
                    setData={(data) =>
                      setTargetPostData({
                        key: LABEL_NAME.PRESERVATION,
                        value: data.value,
                        isRequired: data.isRequired,
                      })
                    }
                    textData={getTextData(LABEL_NAME.PRESERVATION) ?? ''}
                  />
                  <AtomDate
                    isRequired={true}
                    label={LABEL_TEXT.DATE}
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
                    copyDate={
                      route.params
                        ? new Date(getTextData(LABEL_NAME.DATE) ?? '')
                        : undefined
                    }
                  />
                  {(label === '購入日' || label === '登録日') && (
                    <AtomDate
                      isRequired={true}
                      label={LABEL_TEXT.APPROXIMATE_DEADLINE}
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
                      selectedDate={
                        postData.find((item) => item.key === LABEL_NAME.DATE)
                          ?.value
                      }
                    />
                  )}
                  <AtomSingleInput
                    label={LABEL_TEXT.PLACE_OF_PURCHASE}
                    onPressIn={() => setEnabled(true)}
                    setData={(data) =>
                      setTargetPostData({
                        key: LABEL_NAME.PLACE_OF_PURCHASE,
                        value: data.value,
                        isRequired: data.isRequired,
                      })
                    }
                    textData={getTextData(LABEL_NAME.PLACE_OF_PURCHASE) ?? ''}
                  />
                  <AtomSingleInput
                    label={LABEL_TEXT.AMOUNT_OF_MONEY}
                    onPressIn={() => setEnabled(true)}
                    keyboardType={'number-pad'}
                    setData={(data) =>
                      setTargetPostData({
                        key: LABEL_NAME.AMOUNT_OF_MONEY,
                        value: data.value,
                        isRequired: data.isRequired,
                      })
                    }
                    textData={getTextData(LABEL_NAME.AMOUNT_OF_MONEY) ?? ''}
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
                    onPress={() => {
                      const registerDate = postData.find(
                        (item) => item.key === LABEL_NAME.DATE
                      );
                      // もし、日付項目が今日の日付より前の日付の場合は、警告モーダルを表示し、一旦POSTはしないロジックを追加
                      if (
                        registerDate &&
                        moment().isAfter(registerDate.value, 'day')
                      ) {
                        return setIsDateBefore(true);
                      } else {
                        onRegisterPress({
                          postData,
                          setIsVisible,
                          setIsLoading,
                          navigation,
                          setMessage,
                          setIsDateBefore,
                        });
                      }
                    }}
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
