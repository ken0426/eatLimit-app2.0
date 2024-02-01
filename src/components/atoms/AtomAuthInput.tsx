import React, { FC, useState } from 'react';
import { KeyboardTypeOptions, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTSIZE, SIZE } from '../../styles';
import { TextInput } from 'react-native-paper';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';

type Props = {
  value: string;
  text: string;
  keyboardType?: KeyboardTypeOptions;
  setData: (e: string) => void;
  errorMessage: null | string;
  type: 'email' | 'lock';
};

const theme: ThemeProp = {
  colors: {
    /** エラー時のテキストカラーをデフォルトの黒色になるように設定 */
    error: COLORS.MAIN_TEXT_COLOR,
  },
};

const AtomAuthInput: FC<Props> = ({
  value,
  text,
  keyboardType,
  setData,
  errorMessage,
  type,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
        right={
          type == 'lock' && (
            <TextInput.Icon
              onPress={() => {
                setIsPasswordVisible(!isPasswordVisible);
              }}
              size={20}
              color={COLORS.MAIN_TEXT_COLOR}
              icon={isPasswordVisible ? 'eye' : 'eye-off'}
            />
          )
        }
        mode={'outlined'}
        label={` ${text}`}
        value={value}
        secureTextEntry={
          type == 'lock' ? (isPasswordVisible ? false : true) : undefined
        }
        autoCapitalize={'none'}
        keyboardType={keyboardType}
        onChangeText={(inputText) => setData(inputText)}
        outlineStyle={styles.outlineStyle}
        /** フォーカスが当たった時のラベルの色 */
        activeOutlineColor={COLORS.MAIN_TEXT_COLOR}
        /** カーソルの色 */
        selectionColor={COLORS.MAIN_TEXT_COLOR}
        /** 入力値の色 */
        textColor={COLORS.MAIN_TEXT_COLOR}
        style={styles.textInputStyle}
        error={!!errorMessage}
        theme={theme}
        numberOfLines={1}
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

export default AtomAuthInput;

const styles = StyleSheet.create({
  contents: {
    marginBottom: SIZE.BASE_WP,
  },
  outlineStyle: {
    borderWidth: 0.5,
    borderRadius: 50,
    borderColor: COLORS.MAIN_TEXT_COLOR,
  },
  textInputStyle: {
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: FONTSIZE.SIZE20PX,
    paddingBottom: SIZE.BASE_WP,
  },
  errorText: {
    color: COLORS.RED,
  },
});
