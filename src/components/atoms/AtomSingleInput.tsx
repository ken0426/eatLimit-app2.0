import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { color } from '../../styles';

type Props = {
  label: string;
};

const AtomSingleInput: FC<Props> = ({ label }) => {
  return (
    <View style={styles.itemArea}>
      <Text style={styles.label}>{`${label}：`}</Text>
      <Text style={styles.textValue}>いちご</Text>
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
