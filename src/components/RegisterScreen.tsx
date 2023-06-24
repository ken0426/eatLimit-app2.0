import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useCallback, useState } from 'react';
import {
  Alert,
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

type Props = {
  navigation: StackNavigationProp<StackPramList, 'registerScreen'>;
};

const RegisterScreen: FC<Props> = ({ navigation }) => {
  /** キーボードで入力するエリアで高さを調整するフラグ */
  const [enabled, setEnabled] = useState<boolean>(false);

  const { setTargetPostData, postData } = useRegister();

  return (
    <View style={{ backgroundColor: COLORS.WHITE, flex: 1 }}>
      <MolHeader style={styles.header} type={'default'}>
        <AtomRegister
          onPress={() => Alert.alert('登録準備中')}
          navigation={navigation}
          title={'登録'}
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
              <AtomFileSelect />
              <View style={styles.inputForm}>
                <AtomSingleInput
                  label={'商品名'}
                  onPressIn={() => setEnabled(false)}
                  isRequired={true}
                  setData={(data) =>
                    setTargetPostData({ key: '商品名', value: data.value })
                  }
                />
                <AtomSingleSelect
                  label={'管理方法'}
                  data={managementData}
                  isRequired={true}
                  setData={(data) =>
                    setTargetPostData({ key: '管理方法', value: data.value })
                  }
                />
                <AtomSingleSelect
                  label={'保存方法'}
                  data={keepData}
                  isRequired={true}
                  setData={(data) =>
                    setTargetPostData({ key: '保存方法', value: data.value })
                  }
                />
                <AtomDate isRequired={true} />
                <AtomSingleInput
                  label={'購入場所'}
                  onPressIn={() => setEnabled(true)}
                  setData={(data) =>
                    setTargetPostData({ key: '購入場所', value: data.value })
                  }
                />
                <AtomSingleInput
                  label={'金額'}
                  onPressIn={() => setEnabled(true)}
                  keyboardType={'number-pad'}
                  setData={(data) =>
                    setTargetPostData({ key: '金額', value: data.value })
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
