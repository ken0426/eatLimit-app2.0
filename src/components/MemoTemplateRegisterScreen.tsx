import React, { useState } from 'react';
import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import { InputAccessoryView, Platform, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTSIZE, SIZE } from '../styles';
import AtomSettingRegister from './atoms/AtomSettingRegister';
import AtomSingleInput from './atoms/AtomSingleInput';
import MolHeader from './molecules/MolHeader';
import { HEADER_TYPE } from '../contents';
import AtomMemoLabel from './atoms/AtomMemoLabel';

const MemoTemplateRegisterScreen = () => {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [labelText, setLabelText] = useState('');

  const inputAccessoryViewID = 'uniqueID';
  return (
    <TouchableWithoutFeedback
      style={styles.screen}
      onPress={() => Keyboard.dismiss()}
    >
      <View style={styles.contents}>
        <MolHeader style={styles.header} type={HEADER_TYPE.DEFAULT}>
          <AtomSettingRegister
            title={'テンプレートの追加'}
            isRightButton={true}
            // TODO このonPressでバック側にメモのテンプレートを保存する
            onRightPress={() => navigation.goBack()}
          />
        </MolHeader>

        <View style={styles.inputArea}>
          <AtomMemoLabel labelText={labelText} setLabelText={setLabelText} />
        </View>
        <View style={styles.memoArea}>
          <TextInput
            value={text}
            onChangeText={(e) => setText(e)}
            style={styles.textInput}
            multiline
            maxLength={500}
          />

          {Platform.OS === 'ios' && (
            <InputAccessoryView nativeID={inputAccessoryViewID}>
              <View pointerEvents='box-none' style={styles.completedArea}>
                <Button title='完了' onPress={() => Keyboard.dismiss()} />
              </View>
            </InputAccessoryView>
          )}
          <Text style={styles.textCount}>{`${text.length}／500`}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MemoTemplateRegisterScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  contents: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
  },
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
  inputArea: {
    paddingHorizontal: 10,
  },
  memoArea: {
    margin: 10,
    borderLeftWidth: 2.5,
    borderTopWidth: 2.5,
    borderRadius: 5,
    borderColor: '#d6d6d6',
    backgroundColor: '#e9e9e9',
    height: SIZE.BASE_HP * 70,
  },
  textInput: {
    width: '100%',
    height: '100%',
    fontSize: FONTSIZE.SIZE20PX,
    color: 'black',
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
  completedArea: {
    backgroundColor: '#f1f1f1',
    alignItems: 'flex-end',
  },
  textCount: {
    textAlign: 'right',
    color: COLORS.TEXT_LABEL,
  },
});
