import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  onPress: () => void;
  label: string;
  color: string;
  fontSize: number;
  backgroundColor: string;
  width: number;
  borderColor?: string;
  borderWidth?: number;
};

const AtomButton: FC<Props> = ({
  onPress,
  fontSize,
  color,
  backgroundColor,
  width,
  label,
  borderColor,
  borderWidth = 0,
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
      <Text style={{ fontSize, color }}>{label}</Text>
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
