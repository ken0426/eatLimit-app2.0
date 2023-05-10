import React, { FC, useState } from 'react';
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
import { color } from '../../styles';

type Props = {
  onPress: () => void;
};

const AtomMemo: FC<Props> = ({ onPress }) => {
  const inputAccessoryViewID = 'uniqueID';
  const [text, setText] = useState('');

  return (
    <View>
      <View style={{ alignItems: 'flex-start', flexDirection: 'row' }}>
        <View style={{ height: 45, justifyContent: 'center' }}>
          <Text style={styles.label}>メモ：</Text>
        </View>
        <View style={styles.memoArea}>
          <TextInput
            placeholder={'500文字以内で入力してください'}
            onPressIn={onPress}
            placeholderTextColor={color.textLabel}
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
      <Text style={{ textAlign: 'right', color: color.textLabel }}>
        {`${text.length}／500`}
      </Text>
    </View>
  );
};

export default AtomMemo;

const styles = StyleSheet.create({
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
  label: {
    fontSize: 18,
    color: color.textLabel,
    fontWeight: '400',
  },
  textInput: {
    width: '100%',
    height: 120,
    fontSize: 18,
    paddingVertical: 10,
    color: 'black',
    justifyContent: 'flex-start',
  },
  completedArea: {
    backgroundColor: '#f1f1f1',
    alignItems: 'flex-end',
  },
});
