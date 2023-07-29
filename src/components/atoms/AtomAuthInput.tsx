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
  text: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  placeholder: string;
};

const AtomAuthInput: FC<Props> = ({
  text,
  keyboardType,
  secureTextEntry,
  placeholder,
}) => {
  return (
    <View style={styles.contents}>
      <Text style={styles.text}>{text}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={styles.textInput}
        placeholder={placeholder}
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
