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
  errorMessage: null | string;
};

const AtomAuthInput: FC<Props> = ({
  value,
  text,
  keyboardType,
  secureTextEntry,
  placeholder,
  setData,
  errorMessage,
}) => {
  return (
    <View style={styles.contents}>
      <Text style={styles.text}>{text}</Text>
      <TextInput
        value={value}
        secureTextEntry={secureTextEntry}
        autoCapitalize={'none'}
        keyboardType={keyboardType}
        style={[
          styles.textInput,
          { borderColor: errorMessage ? COLORS.RED : COLORS.MAIN_TEXT_COLOR },
        ]}
        placeholder={placeholder}
        onChangeText={(inputText) => setData(inputText)}
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
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
    borderWidth: 0.5,
    borderRadius: 5,
    fontSize: FONTSIZE.SIZE18PX,
    padding: SIZE.BASE_WP * 1.8,
  },
  errorText: {
    color: COLORS.RED,
  },
});
