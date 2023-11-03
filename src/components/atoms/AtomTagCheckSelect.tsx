import React, { FC } from 'react';
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';
import { COLORS, FONTSIZE, SIZE } from '../../styles';
import { StyleSheet } from 'react-native';

type Props = {
  name: string;
  style?: StyleProp<ViewStyle>;
};

const AtomTagCheckSelect: FC<Props> = ({ name, style }) => {
  return (
    <TouchableOpacity style={[styles.tagTouchArea, style]}>
      <View style={styles.checkArea}>
        <AntDesign
          name='check'
          size={FONTSIZE.SIZE15PX}
          color={COLORS.MAIN_TEXT_COLOR}
        />
      </View>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

export default AtomTagCheckSelect;

const styles = StyleSheet.create({
  tagTouchArea: {
    width: wp('90%'),
    alignItems: 'center',
    paddingBottom: SIZE.BASE_WP * 2,
    flexDirection: 'row',
    borderBottomWidth: 0.3,
    borderBottomColor: COLORS.DETAIL_BORDER,
    marginBottom: SIZE.BASE_WP * 2,
  },
  checkArea: {
    width: SIZE.BASE_WP * 3,
  },
  text: {
    flex: 1,
    paddingLeft: SIZE.BASE_WP * 2,
    fontSize: FONTSIZE.SIZE15PX,
  },
});
