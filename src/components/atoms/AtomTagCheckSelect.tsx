import React, { FC } from 'react';
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';
import { COLORS, FONTSIZE, SIZE } from '../../styles';
import { StyleSheet } from 'react-native';

type Props = {
  name: string;
  style?: StyleProp<ViewStyle>;
  id: string;
  tagChecked: string[];
  setTagChecked: React.Dispatch<React.SetStateAction<string[]>>;
};

const AtomTagCheckSelect: FC<Props> = ({
  name,
  style,
  id,
  tagChecked,
  setTagChecked,
}) => {
  const isCheck = tagChecked.find((selectId) => selectId === id);

  const onPress = () => {
    if (isCheck) {
      setTagChecked((prevId) =>
        prevId.filter((selectedId) => selectedId !== id)
      );
    } else {
      setTagChecked((prevId) => [...(prevId ?? []), id]);
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={[styles.tagTouchArea, style]}>
      <View style={styles.checkArea}>
        {isCheck && (
          <Feather name='check' size={FONTSIZE.SIZE20PX} color={COLORS.BLUE} />
        )}
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
    paddingBottom: SIZE.BASE_WP * 3,
    flexDirection: 'row',
    borderBottomWidth: 0.3,
    borderBottomColor: COLORS.DETAIL_BORDER,
    marginBottom: SIZE.BASE_WP * 3,
  },
  checkArea: {
    width: SIZE.BASE_WP * 6,
  },
  text: {
    flex: 1,
    paddingLeft: SIZE.BASE_WP * 2,
    fontSize: FONTSIZE.SIZE20PX,
  },
});
