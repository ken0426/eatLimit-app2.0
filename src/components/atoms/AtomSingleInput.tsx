import React, { FC, useState } from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { INPUT_HEIGHT, color } from '../../styles';
import { getText } from '../../utils';

type Props = {
  label: string;
  onPressIn: () => void;
  keyboardType?: KeyboardTypeOptions;
};

const AtomSingleInput: FC<Props> = ({
  label,
  onPressIn,
  keyboardType = 'default',
}) => {
  const [text, setText] = useState<string>('');

  return (
    <View style={styles.itemArea}>
      <Text style={styles.label}>{`${label}：`}</Text>
      <TextInput
        onPressIn={onPressIn}
        onChangeText={(inputText) => setText(inputText)}
        style={styles.textValue}
        value={getText(text, keyboardType)}
        keyboardType={keyboardType}
      />
      {keyboardType === 'number-pad' && <Text style={styles.label}>円</Text>}
    </View>
  );
};

export default AtomSingleInput;

const styles = StyleSheet.create({
  itemArea: {
    flexDirection: 'row',
    height: INPUT_HEIGHT,
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