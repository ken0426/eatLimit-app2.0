import React, { FC } from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity } from 'react-native';

type Props = {
  onPress: () => void;
  buttonText: string;
  color: string;
  fontSize: number;
  backgroundColor: string;
  width: number;
  borderColor?: string;
  borderWidth?: number;
  fontWeight?: 'normal' | 'bold';
};

const AtomButton: FC<Props> = ({
  onPress,
  fontSize,
  color,
  backgroundColor,
  width,
  buttonText,
  borderColor,
  borderWidth = 0,
  fontWeight = 'normal',
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.contents,
        {
          backgroundColor,
          width,
          borderColor,
          borderWidth,
        },
      ]}
      onPress={onPress}
      activeOpacity={1}
    >
      <Text style={{ fontSize, color, fontWeight }}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default AtomButton;

const styles = StyleSheet.create({
  contents: {
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 2,
  },
});