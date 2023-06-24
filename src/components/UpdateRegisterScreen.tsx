import React, { FC, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MolHeader from './molecules/MolHeader';
import AtomRegister from './atoms/AtomRegister';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackPramList } from '../types';
import { COLORS, FONTSIZE, SIZE } from '../styles';
import AtomFileSelect from './atoms/AtomFileSelect';
import AtomSingleInput from './atoms/AtomSingleInput';
import AtomSingleSelect from './atoms/AtomSingleSelect';
import AtomDate from './atoms/AtomDate';
import AtomMemo from './atoms/AtomMemo';
import AtomButton from './atoms/AtomButton';
import { keepData, managementData } from '../contents';
import { useRootSelector } from '../redux/store/store';
import { useRegister } from '../hooks/useRegister';

type Props = {
  navigation: StackNavigationProp<StackPramList, 'updateRegisterScreen'>;
};

const UpdateRegisterScreen: FC<Props> = ({ navigation }) => {
  const updateData = useRootSelector(
    (state) => state.commonRegister.updateRegisterData
  );
  /** キーボードで入力するエリアで高さを調整するフラグ */
  const [enabled, setEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setTargetPostData, postData } = useRegister();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: COLORS.WHITE, flex: 1 }}>
        <MolHeader style={styles.header} type={'default'}>
          <AtomRegister
            navigation={navigation}
            title={'変更'}
            postData={postData}
            setIsLoading={setIsLoading}
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
                    textData={updateData.eatName}
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
                    textData={updateData.management}
                    isRequired={true}
                    setData={(data) =>
                      setTargetPostData({
                        key: '管理方法',
                        value: data.value,
                        isRequired: data.isRequired,
                      })
                    }
                  />
                  <AtomSingleSelect
                    label={'保存方法'}
                    data={keepData}
                    textData={updateData.keep}
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
                    date={updateData.date}
                    isRequired={true}
                    setData={(data) =>
                      setTargetPostData({
                        key: '日付',
                        value: data.value,
                        isRequired: data.isRequired,
                      })
                    }
                  />
                  <AtomSingleInput
                    label={'購入場所'}
                    onPressIn={() => setEnabled(true)}
                    textData={updateData.placeOfPurchase}
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
                    textData={updateData.price ? String(updateData.price) : ''}
                    setData={(data) =>
                      setTargetPostData({
                        key: '金額',
                        value: data.value,
                        isRequired: data.isRequired,
                      })
                    }
                  />
                  <AtomMemo onPress={() => setEnabled(true)} />
                </View>
                <View style={styles.buttonArea}>
                  <AtomButton
                    onPress={() => {}}
                    color={COLORS.WHITE}
                    fontSize={FONTSIZE.SIZE30PX}
                    backgroundColor={COLORS.BLUE}
                    width={SIZE.BASE_WP * 50}
                    buttonText={'登録'}
                    fontWeight={'bold'}
                  />
                  {/* 削除ボタンの仮実装 */}
                  <View style={{ marginTop: SIZE.BASE_HP * 2 }}>
                    <AtomButton
                      onPress={() => {}}
                      color={COLORS.WHITE}
                      fontSize={FONTSIZE.SIZE30PX}
                      backgroundColor={COLORS.RED}
                      width={SIZE.BASE_WP * 50}
                      buttonText={'削除'}
                      fontWeight={'bold'}
                    />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>

      {isLoading && (
        <ActivityIndicator
          style={{
            backgroundColor: '#303030',
            opacity: 0.5,
            height: '100%',
            width: '100%',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      )}
    </View>
  );
};

export default UpdateRegisterScreen;

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
