import React, { FC, useState } from 'react';
import {
  InputModeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { color } from '../../styles';
import { getText } from '../../utils';

type Props = {
  label: string;
  onPressIn: () => void;
  inputMode?: InputModeOptions;
};

const AtomSingleInput: FC<Props> = ({
  label,
  onPressIn,
  inputMode = 'text',
}) => {
  const [text, setText] = useState<string>('');

  return (
    <View style={styles.itemArea}>
      <Text style={styles.label}>{`${label}：`}</Text>
      <TextInput
        onPressIn={onPressIn}
        onChangeText={(inputText) => setText(inputText)}
        style={styles.textValue}
        value={getText(text, inputMode)}
        inputMode={inputMode}
      />
      {inputMode === 'numeric' && <Text style={styles.label}>円</Text>}
    </View>
  );
};

export default AtomSingleInput;

const styles = StyleSheet.create({
  itemArea: {
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: color.detailBorderColor,
  },
  label: {
    fontSize: 18,
    color: color.textLabel,
    fontWeight: '400',
  },
  textValue: {
    fontSize: 18,
    flex: 1,
    textAlign: 'right',
    paddingRight: 10,
    color: color.textColor,
    fontWeight: 'bold',
  },
});
