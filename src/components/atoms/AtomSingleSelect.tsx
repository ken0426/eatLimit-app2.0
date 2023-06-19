import React, { FC, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONTSIZE, INPUT_HEIGHT, SIZE } from '../../styles';
import OrgModalBottom from '../organisms/OrgModalBottom';
import MolSingleSelect from '../molecules/MolSingleSelect';
import { KeepData, ManagementData } from '../../types';

type Props = {
  label: string;
  data: KeepData[] | ManagementData[];
  textData?: string;
  isRequired?: boolean;
};

const AtomSingleSelect: FC<Props> = ({
  label,
  data,
  textData = '',
  isRequired = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState(textData);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
          setIsVisible(true);
        }}
        style={styles.itemArea}
      >
        {isRequired ? (
          <>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.requiredArea}>
              <Text style={styles.required}>必須</Text>
            </View>
            <Text style={styles.label}>：</Text>
          </>
        ) : (
          <Text style={styles.label}>{`${label}：`}</Text>
        )}
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Text style={styles.textValue}>{text}</Text>
          <View>
            <MaterialIcons
              name='keyboard-arrow-down'
              size={20}
              color={COLORS.TEXT_COLOR}
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
    height: INPUT_HEIGHT,
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: COLORS.DETAIL_BORDER,
  },
  label: {
    fontSize: FONTSIZE.SIZE18PX,
    color: COLORS.TEXT_LABEL,
    fontWeight: '400',
  },
  requiredArea: {
    borderRadius: 10,
    backgroundColor: COLORS.RED,
    marginLeft: SIZE.BASE_WP * 1.5,
  },
  required: {
    fontSize: FONTSIZE.SIZE15PX,
    color: COLORS.WHITE,
    fontWeight: '400',
    paddingHorizontal: SIZE.BASE_WP * 2,
    paddingVertical: SIZE.BASE_HP * 0.1,
  },
  textValue: {
    fontSize: FONTSIZE.SIZE18PX,
    flex: 1,
    textAlign: 'right',
    paddingRight: 10,
    color: COLORS.TEXT_COLOR,
    fontWeight: 'bold',
  },
});
