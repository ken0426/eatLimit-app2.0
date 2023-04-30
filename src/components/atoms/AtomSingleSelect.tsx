import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { color } from '../../styles';

type Props = {
  label: string;
};

const AtomSingleSelect: FC<Props> = ({ label }) => {
  return (
    <TouchableOpacity style={styles.itemArea}>
      <Text style={styles.label}>{`${label}：`}</Text>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Text style={styles.textValue}>冷蔵</Text>
        <View>
          <MaterialIcons
            name='keyboard-arrow-right'
            size={20}
            color={color.textColor}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AtomSingleSelect;

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
