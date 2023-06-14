import React, { FC, useState } from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { COLORS, FONTSIZE, INPUT_HEIGHT } from '../../styles';
import { getText } from '../../utils';

type Props = {
  label: string;
  onPressIn: () => void;
  keyboardType?: KeyboardTypeOptions;
  textData?: string;
};

const AtomSingleInput: FC<Props> = ({
  label,
  onPressIn,
  keyboardType = 'default',
  textData = '',
}) => {
  const [text, setText] = useState<string>(textData);

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
    borderBottomColor: COLORS.detailBorderColor,
  },
  label: {
    fontSize: FONTSIZE.SIZE18PX,
    color: COLORS.textLabel,
    fontWeight: '400',
  },
  textValue: {
    fontSize: FONTSIZE.SIZE18PX,
    flex: 1,
    textAlign: 'right',
    paddingRight: 10,
    color: COLORS.textColor,
    fontWeight: 'bold',
  },
});
