import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { color } from '../../styles';

type Props = {
  label: string;
};

const AtomSIngleInput: FC<Props> = ({ label }) => {
  return (
    <View style={styles.label}>
      <Text style={{ fontSize: 18 }}>{`${label}：`}</Text>
      <Text style={styles.textValue}>いちご</Text>
    </View>
  );
};

export default AtomSIngleInput;

const styles = StyleSheet.create({
  label: {
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: color.detailBorderColor,
  },
  textValue: {
    fontSize: 18,
    flex: 1,
    textAlign: 'right',
    paddingRight: 10,
  },
});
