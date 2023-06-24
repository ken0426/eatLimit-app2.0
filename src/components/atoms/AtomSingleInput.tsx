import React, { FC, useEffect, useState } from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { COLORS, FONTSIZE, INPUT_HEIGHT, SIZE } from '../../styles';
import { getText } from '../../utils';
import AtomRequire from './AtomRequire';
import { PostData } from '../../types';

type Props = {
  label: string;
  onPressIn: () => void;
  keyboardType?: KeyboardTypeOptions;
  textData?: string;
  isRequired?: boolean;
  setData: ({ key, value }: PostData) => void;
};

const AtomSingleInput: FC<Props> = ({
  label,
  onPressIn,
  keyboardType = 'default',
  textData = '',
  isRequired = false,
  setData,
}) => {
  const [text, setText] = useState<string>(textData);

  useEffect(() => {
    setData({ key: label, value: text });
  }, [text]);

  return (
    <View style={styles.itemArea}>
      {isRequired ? (
        <AtomRequire label={label} />
      ) : (
        <Text style={styles.label}>{`${label}：`}</Text>
      )}

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
