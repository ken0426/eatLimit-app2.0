import React, { FC, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTSIZE, SIZE } from '../../styles';

type Props = {
  text: string;
  id: string;
};

const AtomFilterSelectButton: FC<Props> = ({ text, id }) => {
  // TODO 一旦複数選択の挙動のみ実装
  const [isSelected, setIsSelected] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => setIsSelected(!isSelected)}
      style={[
        styles.button,
        isSelected
          ? { backgroundColor: COLORS.TEXT_LABEL }
          : { backgroundColor: COLORS.TEXT_INPUT },
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          isSelected
            ? { color: COLORS.SIGN_IN_BUTTON }
            : { color: COLORS.MAIN_TEXT_COLOR },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default AtomFilterSelectButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    width: '49%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.TEXT_INPUT,
    marginBottom: SIZE.BASE_WP * 1.6,
  },
  buttonText: {
    fontSize: FONTSIZE.SIZE15PX,
    paddingHorizontal: SIZE.BASE_WP * 3,
    paddingVertical: SIZE.BASE_HP * 1.5,
  },
});
