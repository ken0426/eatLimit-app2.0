import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import { Button, Keyboard, StyleSheet } from 'react-native';
import { InputAccessoryView, Platform, TextInput, View } from 'react-native';
import { COLORS, FONTSIZE, SIZE } from '../styles';
import { StackPramList } from '../types';
import AtomSettingRegister from './atoms/AtomSettingRegister';
import AtomSingleInput from './atoms/AtomSingleInput';
import MolHeader from './molecules/MolHeader';

type Props = {
  navigation: StackNavigationProp<StackPramList, 'memoTemplateRegisterScreen'>;
};

const MemoTemplateRegisterScreen: FC<Props> = ({ navigation }) => {
  const [text, setText] = useState('');
  const inputAccessoryViewID = 'uniqueID';
  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: COLORS.WHITE, flex: 1 }}>
        <MolHeader style={styles.header} type={'default'}>
          <AtomSettingRegister
            navigation={navigation}
            title={'テンプレートの追加'}
            isRightButton={true}
          />
        </MolHeader>

        <View style={{ paddingHorizontal: 10 }}>
          <AtomSingleInput
            label={'項目名'}
            onPressIn={() => {}}
            setData={() => {}}
            textData={text}
          />
        </View>
        <View style={styles.memoArea}>
          <TextInput
            value={text}
            onChangeText={(e) => setText(e)}
            style={styles.textInput}
            multiline
            maxLength={500}
          />
        </View>

        {Platform.OS === 'ios' && (
          <InputAccessoryView nativeID={inputAccessoryViewID}>
            <View pointerEvents='box-none' style={styles.completedArea}>
              <Button title='完了' onPress={() => Keyboard.dismiss()} />
            </View>
          </InputAccessoryView>
        )}
      </View>
    </View>
  );
};

export default MemoTemplateRegisterScreen;

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
  memoArea: {
    margin: 10,
    borderLeftWidth: 2.5,
    borderTopWidth: 2.5,
    borderRadius: 5,
    borderColor: '#d6d6d6',
    backgroundColor: '#e9e9e9',
    height: SIZE.BASE_HP * 75,
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
});