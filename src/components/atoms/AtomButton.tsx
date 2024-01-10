import React, { FC } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { SIZE } from '../../styles';

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
  textStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
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
  textStyle,
  buttonStyle,
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
        buttonStyle,
      ]}
      onPress={onPress}
      activeOpacity={1}
    >
      <Text
        style={[
          { fontSize },
          { color },
          { fontWeight },
          textStyle,
          styles.text,
        ]}
      >
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default AtomButton;

const styles = StyleSheet.create({
  contents: {
    marginHorizontal: SIZE.BASE_WP * 3,
    alignItems: 'center',
    borderRadius: SIZE.BASE_WP * 20,
    paddingVertical: 2,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
