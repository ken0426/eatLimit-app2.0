import React, { FC } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import SvgIcon from '../../images/SvgIcon';
import { FONTSIZE, SIZE } from '../../styles';

type Props = {
  type: 'materialCommunityIcons' | 'materialIcons';
  name: 'timer' | 'local-fire-department';
  iconColor: string;
  textColor?: StyleProp<TextStyle>;
  text: string;
  style?: StyleProp<ViewStyle>;
};

const AtomDetailDateDisplay: FC<Props> = ({
  type,
  name,
  iconColor,
  textColor,
  text,
  style,
}) => {
  return (
    <View style={[styles.contents, style]}>
      <SvgIcon type={type} name={name} size={20} color={iconColor} />
      <Text style={[styles.text, textColor]}>{text}</Text>
    </View>
  );
};

export default AtomDetailDateDisplay;

const styles = StyleSheet.create({
  contents: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: SIZE.BASE_WP,
    fontSize: FONTSIZE.SIZE20PX,
  },
});
