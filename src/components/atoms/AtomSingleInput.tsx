import React, { FC, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { color } from '../../styles';

type Props = {
  label: string;
};

const AtomSingleInput: FC<Props> = ({ label }) => {
  const [text, setText] = useState<string>('');
  return (
    <View style={styles.itemArea}>
      <Text style={styles.label}>{`${label}：`}</Text>
      <TextInput
        onChange={(inputText) => setText(inputText.nativeEvent.text)}
        style={styles.textValue}
        value={text}
      />
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
    fontWeight: '400',
  },
});
