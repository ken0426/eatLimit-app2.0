import React, { FC, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTSIZE } from '../../styles';
import SvgIcon from '../../images/SvgIcon';

type Props = {
  title: string;
  isRightButton?: boolean;
  isRightText?: string;
  onRightPress?: () => void;
  imageType?: 'materialCommunityIcons' | 'ellipsis';
};

type ImagTypeAndName = {
  type: 'materialCommunityIcons' | 'antDesign';
  name: 'tag-plus-outline' | 'ellipsis1';
  size: number;
  color: string;
};

const AtomSettingRegister: FC<Props> = ({
  title,
  isRightButton,
  isRightText = '完了',
  onRightPress,
  imageType,
}) => {
  const navigation = useNavigation();

  const imagTypeAndName: ImagTypeAndName = useMemo(() => {
    if (imageType === 'materialCommunityIcons') {
      return {
        type: 'materialCommunityIcons',
        name: 'tag-plus-outline',
        size: 24,
        color: 'black',
      };
    } else {
      return {
        type: 'antDesign',
        name: 'ellipsis1',
        size: 24,
        color: 'black',
      };
    }
  }, [imageType]);

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={{ width: '10%' }}
        onPress={() => navigation.goBack()}
      >
        <SvgIcon
          type={'ionicons'}
          name='chevron-back'
          size={24}
          color='black'
        />
      </TouchableOpacity>
      <View style={{ width: '80%' }}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <View style={{ width: '10%', alignItems: 'flex-end' }}>
        {imageType ? (
          <TouchableOpacity onPress={onRightPress}>
            <SvgIcon
              type={imagTypeAndName.type}
              name={imagTypeAndName.name}
              size={imagTypeAndName.size}
              color={imagTypeAndName.color}
            />
          </TouchableOpacity>
        ) : (
          isRightButton && (
            <TouchableOpacity onPress={onRightPress}>
              <Text style={{ fontSize: FONTSIZE.SIZE15PX, fontWeight: 'bold' }}>
                {isRightText}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
};

export default AtomSettingRegister;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    textAlign: 'center',
    fontSize: FONTSIZE.SIZE20PX,
    fontWeight: 'bold',
    color: COLORS.MAIN_TEXT_COLOR,
  },
});
