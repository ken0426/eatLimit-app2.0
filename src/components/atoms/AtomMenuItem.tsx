import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SvgIcon from '../../images/SvgIcon';
import { FONTSIZE, SIZE } from '../../styles';

type Props = {
  text: string;
  type:
    | 'ionicons'
    | 'entypo'
    | 'antDesign'
    | 'feather'
    | 'fontAwesome'
    | 'fontAwesome5'
    | 'materialIcons'
    | 'materialCommunityIcons'
    | 'foundation';
  name: string;
  size: number;
  color: string;
};

const AtomMenuItem: FC<Props> = ({ text, type, name, size, color }) => {
  return (
    <View style={styles.item}>
      <SvgIcon type={type} name={name} size={size} color={color} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default AtomMenuItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: FONTSIZE.SIZE18PX,
    marginLeft: SIZE.BASE_WP * 2,
  },
});
