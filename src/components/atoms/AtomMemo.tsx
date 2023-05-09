import React, { FC } from 'react';
import {
  InputAccessoryView,
  Keyboard,
  TextInput,
  View,
  Button,
  StyleSheet,
} from 'react-native';
import { color } from '../../styles';

type Props = {
  onPress: () => void;
};

const AtomMemo: FC<Props> = ({ onPress }) => {
  const inputAccessoryViewID = 'uniqueID';

  return (
    <View style={styles.memoArea}>
      <TextInput
        placeholder={'メモ：'}
        onPressIn={onPress}
        placeholderTextColor={color.textLabel}
        style={styles.textInput}
        inputAccessoryViewID={inputAccessoryViewID}
        multiline
      />
      <InputAccessoryView nativeID={inputAccessoryViewID}>
        <View pointerEvents='box-none' style={styles.completedArea}>
          <Button title='完了' onPress={() => Keyboard.dismiss()} />
        </View>
      </InputAccessoryView>
    </View>
  );
};

export default AtomMemo;

const styles = StyleSheet.create({
  memoArea: {
    width: '100%',
    backgroundColor: '#dbdbdb',
    marginTop: 10,
  },
  textInput: {
    width: '100%',
    height: 200,
    fontSize: 18,
    paddingVertical: 10,
    color: 'black',
  },
  completedArea: {
    backgroundColor: '#f1f1f1',
    alignItems: 'flex-end',
  },
});
