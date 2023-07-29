import React, { FC } from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { COLORS, FONTSIZE, SIZE } from '../../styles';

type Props = {
  value: string;
  text: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  placeholder: string;
  setData: (e: string) => void;
};

const AtomAuthInput: FC<Props> = ({
  value,
  text,
  keyboardType,
  secureTextEntry,
  placeholder,
  setData,
}) => {
  return (
    <View style={styles.contents}>
      <Text style={styles.text}>{text}</Text>
      <TextInput
        value={value}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={styles.textInput}
        placeholder={placeholder}
        onChangeText={(inputText) => setData(inputText)}
      />
    </View>
  );
};

export default AtomAuthInput;

const styles = StyleSheet.create({
  contents: {
    width: '100%',
    marginBottom: SIZE.BASE_WP * 2.5,
  },
  text: {
    fontSize: FONTSIZE.SIZE20PX,
    paddingBottom: SIZE.BASE_WP,
  },
  textInput: {
    width: '100%',
    borderColor: COLORS.MAIN_TEXT_COLOR,
    borderWidth: 0.5,
    borderRadius: 5,
    fontSize: FONTSIZE.SIZE18PX,
    padding: SIZE.BASE_WP * 1.8,
  },
});
