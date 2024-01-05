import React, { FC } from 'react';
import { KeyboardTypeOptions, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTSIZE, SIZE } from '../../styles';
import { TextInput } from 'react-native-paper';

type Props = {
  value: string;
  text: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  setData: (e: string) => void;
  errorMessage: null | string;
  type: 'email' | 'lock';
};

const AtomAuthInput: FC<Props> = ({
  value,
  text,
  keyboardType,
  secureTextEntry,
  setData,
  errorMessage,
  type,
}) => {
  return (
    <View style={styles.contents}>
      <TextInput
        left={
          <TextInput.Icon
            size={20}
            color={COLORS.MAIN_TEXT_COLOR}
            icon={type}
          />
        }
        mode={'outlined'}
        label={text}
        value={value}
        secureTextEntry={secureTextEntry}
        autoCapitalize={'none'}
        keyboardType={keyboardType}
        underlineColor={COLORS.MAIN_TEXT_COLOR}
        activeUnderlineColor={COLORS.MAIN_TEXT_COLOR}
        outlineColor={COLORS.MAIN_TEXT_COLOR}
        onChangeText={(inputText) => setData(inputText)}
        outlineStyle={{
          borderWidth: 0.5,
          borderRadius: 50,
        }}
        error={!!errorMessage}
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

export default AtomAuthInput;

const styles = StyleSheet.create({
  contents: {
    width: '100%',
    // marginBottom: SIZE.BASE_WP,
  },
  text: {
    fontSize: FONTSIZE.SIZE20PX,
    paddingBottom: SIZE.BASE_WP,
  },
  errorText: {
    color: COLORS.RED,
  },
});
