import React, { FC, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTSIZE, SIZE } from '../../styles';

type Props = {
  text: string;
  id: string;
  data: { text: string; id: string }[];
  selectedId: string;
  setSelectedId: (e: string) => void;
  multiSelectedId: string[];
  setMultiSelectedId: (e: string[]) => void;
};

const AtomFilterSelectButton: FC<Props> = ({
  text,
  id,
  data,
  selectedId,
  setSelectedId,
  multiSelectedId,
  setMultiSelectedId,
}) => {
  /** ボタンの背景色を計算 */
  const getBackGroundColor = () => {
    if (data.length > 2) {
      if (multiSelectedId.find((selectedId) => selectedId === id)) {
        return { backgroundColor: COLORS.TEXT_LABEL };
      } else {
        return { backgroundColor: COLORS.TEXT_INPUT };
      }
    } else {
      if (id === selectedId) {
        return { backgroundColor: COLORS.TEXT_LABEL };
      } else {
        return { backgroundColor: COLORS.TEXT_INPUT };
      }
    }
  };

  /** ボタンの文字の色を計算 */
  const getTextColor = () => {
    if (data.length > 2) {
      if (multiSelectedId.find((selectedId) => selectedId === id)) {
        return { color: COLORS.SIGN_IN_BUTTON };
      } else {
        return { color: COLORS.MAIN_TEXT_COLOR };
      }
    } else {
      if (id === selectedId) {
        return { color: COLORS.SIGN_IN_BUTTON };
      } else {
        return { color: COLORS.MAIN_TEXT_COLOR };
      }
    }
  };

  const onPress = () => {
    if (data.length > 2) {
      if (multiSelectedId.find((selectedId) => selectedId === id)) {
        const newMultiSelectedId = multiSelectedId.filter(
          (selectedId) => selectedId !== id
        );
        setMultiSelectedId(newMultiSelectedId);
      } else {
        setMultiSelectedId([...multiSelectedId, id]);
      }
    } else {
      setSelectedId(id);
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, getBackGroundColor()]}
    >
      <Text style={[styles.buttonText, getTextColor()]}>{text}</Text>
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
    fontWeight: 'bold',
  },
});
