import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { color } from '../../styles';

type Props = {
  value: string | number;
  label: string;
};

const AtomSingleItem: FC<Props> = ({ value, label }) => {
  return (
    <View style={styles.itemArea}>
      <Text style={styles.label}>{label}</Text>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        {typeof value === 'string' ? value : `${value}円`}
      </Text>
    </View>
  );
};

export default AtomSingleItem;

const styles = StyleSheet.create({
  itemArea: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: color.detailBorderColor,
  },
  label: {
    width: '40%',
    fontSize: 20,
  },
});
