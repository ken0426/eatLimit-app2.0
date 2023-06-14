import React, { FC, useState } from 'react';
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

type Props = {
  navigation: StackNavigationProp<StackPramList, 'updateRegisterScreen'>;
};

const UpdateRegisterScreen: FC<Props> = ({ navigation }) => {
  const updateData = useRootSelector(
    (state) => state.commonRegister.updateRegisterData
  );
  /** キーボードで入力するエリアで高さを調整するフラグ */
  const [enabled, setEnabled] = useState(false);

  return (
    <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
      <MolHeader style={styles.header} type={'default'}>
        <AtomRegister
          onPress={() => Alert.alert('変更準備中')}
          navigation={navigation}
          title={'変更'}
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
                  textData={updateData.eatName}
                />
                <AtomSingleSelect
                  label={'管理方法'}
                  data={managementData}
                  textData={updateData.management}
                />
                <AtomSingleSelect
                  label={'保存方法'}
                  data={keepData}
                  textData={updateData.keep}
                />
                <AtomDate date={updateData.date} />
                <AtomSingleInput
                  label={'購入場所'}
                  onPressIn={() => setEnabled(true)}
                  textData={updateData.placeOfPurchase}
                />
                <AtomSingleInput
                  label={'金額'}
                  onPressIn={() => setEnabled(true)}
                  keyboardType={'number-pad'}
                  textData={updateData.price ? String(updateData.price) : ''}
                />
                <AtomMemo onPress={() => setEnabled(true)} />
              </View>
              <View style={styles.buttonArea}>
                <AtomButton
                  onPress={() => {}}
                  color={'#ffffff'}
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
                    color={'#ffffff'}
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
  );
};

export default UpdateRegisterScreen;

const styles = StyleSheet.create({
  header: {
    height: SIZE.BASE_HP * 12,
    paddingHorizontal: SIZE.BASE_WP * 5,
    paddingTop: SIZE.BASE_HP * 4,
    backgroundColor: COLORS.mainColor,
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
