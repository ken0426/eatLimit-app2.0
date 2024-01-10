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
import { LABEL_TEXT } from '../../contents';

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
    if (label === LABEL_TEXT.AMOUNT_OF_MONEY) {
      const pattern = /,/g;
      const ediText = text.replace(pattern, '');
      setData({ key: label, value: ediText, isRequired });
    } else {
      setData({ key: label, value: text, isRequired });
    }
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
        onChangeText={(inputText) =>
          inputText !== '' ? setText(inputText) : setText('')
        }
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
  textValue: {
    fontSize: FONTSIZE.SIZE18PX,
    flex: 1,
    textAlign: 'right',
    paddingRight: 10,
    color: COLORS.TEXT_COLOR,
    fontWeight: 'bold',
  },
});
