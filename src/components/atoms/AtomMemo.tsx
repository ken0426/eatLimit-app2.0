import React, { FC, useEffect, useState } from 'react';
import {
  InputAccessoryView,
  Keyboard,
  TextInput,
  View,
  Button,
  StyleSheet,
  Platform,
  Text,
} from 'react-native';
import { COLORS, FONTSIZE, SIZE } from '../../styles';
import { PostData } from '../../types';

type Props = {
  onPress: () => void;
  setData: ({ key, value }: PostData) => void;
};

const AtomMemo: FC<Props> = ({ onPress, setData }) => {
  const inputAccessoryViewID = 'uniqueID';
  const [text, setText] = useState('');

  useEffect(() => {
    setData({ key: 'メモ', value: text, isRequired: false });
  }, [text]);

  return (
    <View>
      <View style={styles.contents}>
        <View style={styles.labelArea}>
          <Text style={styles.label}>メモ：</Text>
        </View>
        <View style={styles.memoArea}>
          <TextInput
            placeholder={'500文字以内で入力してください'}
            onPressIn={onPress}
            placeholderTextColor={COLORS.TEXT_LABEL}
            style={styles.textInput}
            inputAccessoryViewID={inputAccessoryViewID}
            multiline
            maxLength={500}
            onChangeText={(input) => setText(input)}
          />

          {Platform.OS === 'ios' && (
            <InputAccessoryView nativeID={inputAccessoryViewID}>
              <View pointerEvents='box-none' style={styles.completedArea}>
                <Button title='完了' onPress={() => Keyboard.dismiss()} />
              </View>
            </InputAccessoryView>
          )}
        </View>
      </View>
      <Text style={{ textAlign: 'right', color: COLORS.TEXT_LABEL }}>
        {`${text.length}／500`}
      </Text>
    </View>
  );
};

export default AtomMemo;

const styles = StyleSheet.create({
  contents: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  memoArea: {
    width: '100%',
    marginTop: 10,
    borderLeftWidth: 2.5,
    borderTopWidth: 2.5,
    borderRadius: 5,
    borderColor: '#d6d6d6',
    backgroundColor: '#e9e9e9',
    flex: 1,
  },
  labelArea: {
    height: SIZE.BASE_HP * 5.5,
    justifyContent: 'center',
  },
  label: {
    fontSize: FONTSIZE.SIZE18PX,
    color: COLORS.TEXT_LABEL,
    fontWeight: '400',
  },
  textInput: {
    width: '100%',
    height: SIZE.BASE_HP * 15,
    fontSize: FONTSIZE.SIZE18PX,
    color: 'black',
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
  completedArea: {
    backgroundColor: '#f1f1f1',
    alignItems: 'flex-end',
  },
});
