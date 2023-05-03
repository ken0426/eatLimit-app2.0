import React, { FC, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { color } from '../../styles';
import OrgModalBottom from '../organisms/OrgModalBottom';
import MolSingleSelect from '../molecules/MolSingleSelect';
import { KeepData } from '../../types';

type Props = {
  label: string;
  data: KeepData[];
};

const AtomSingleSelect: FC<Props> = ({ label, data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState('');

  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        style={styles.itemArea}
      >
        <Text style={styles.label}>{`${label}：`}</Text>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Text style={styles.textValue}>{text}</Text>
          <View>
            <MaterialIcons
              name='keyboard-arrow-down'
              size={20}
              color={color.textColor}
            />
          </View>
        </View>
      </TouchableOpacity>
      <OrgModalBottom
        isVisible={isVisible}
        cancelOnPress={() => setIsVisible(false)}
        completedOnPress={() => setIsVisible(false)}
      >
        <MolSingleSelect
          data={data}
          setIsVisible={setIsVisible}
          setText={setText}
        />
      </OrgModalBottom>
    </View>
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
