import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
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
import { keepData, managementData } from '../contents';
import AtomMemo from './atoms/AtomMemo';
import AtomButton from './atoms/AtomButton';
import { useRegister } from '../hooks/useRegister';
import AtomLoading from './atoms/AtomLoading';
import { onRegisterPress } from '../functions';

type Props = {
  navigation: StackNavigationProp<StackPramList, 'registerScreen'>;
};

const RegisterScreen: FC<Props> = ({ navigation }) => {
  /** キーボードで入力するエリアで高さを調整するフラグ */
  const [enabled, setEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const { setTargetPostData, postData } = useRegister();

  const [label, setLabel] = useState('');

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
                      key: '画像',
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
                        key: '商品名',
                        value: data.value,
                        isRequired: data.isRequired,
                      })
                    }
                  />
                  <AtomSingleSelect
                    label={'管理方法'}
                    data={managementData}
                    isRequired={true}
                    setData={(data) => {
                      setTargetPostData({
                        key: '管理方法',
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
                        key: '保存方法',
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
                        key: '日付',
                        value: data.value,
                        isRequired: data.isRequired,
                      })
                    }
                  />
                  {(label === '購入日' || label === '登録日') && (
                    <AtomDate
                      isRequired={true}
                      label={'期限目安'}
                      isLimit={true}
                      setData={(data) =>
                        setTargetPostData({
                          key: '期限目安',
                          value: data.value,
                          isRequired: data.isRequired,
                        })
                      }
                    />
                  )}
                  <AtomSingleInput
                    label={'購入場所'}
                    onPressIn={() => setEnabled(true)}
                    setData={(data) =>
                      setTargetPostData({
                        key: '購入場所',
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
                        key: '金額',
                        value: data.value,
                        isRequired: data.isRequired,
                      })
                    }
                  />
                  <AtomMemo
                    onPress={() => setEnabled(true)}
                    setData={(data) =>
                      setTargetPostData({
                        key: 'メモ',
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
