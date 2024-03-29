import React, { FC } from 'react';
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

const materialCommunityIcons = {
  type: 'materialCommunityIcons',
  name: 'tag-plus-outline',
  size: 24,
  color: 'black',
} as const;

const antDesign = {
  type: 'antDesign',
  name: 'ellipsis1',
  size: 24,
  color: 'black',
} as const;

const AtomSettingRegister: FC<Props> = ({
  title,
  isRightButton,
  isRightText = '完了',
  onRightPress,
  imageType,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.left} onPress={() => navigation.goBack()}>
        <SvgIcon
          type={'ionicons'}
          name='chevron-back'
          size={24}
          color='black'
        />
      </TouchableOpacity>
      <View style={styles.center}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <View style={styles.right}>
        {imageType ? (
          <TouchableOpacity onPress={onRightPress}>
            <SvgIcon
              type={
                imageType === 'materialCommunityIcons'
                  ? materialCommunityIcons.type
                  : antDesign.type
              }
              name={
                imageType === 'materialCommunityIcons'
                  ? materialCommunityIcons.name
                  : antDesign.name
              }
              size={
                imageType === 'materialCommunityIcons'
                  ? materialCommunityIcons.size
                  : antDesign.size
              }
              color={
                imageType === 'materialCommunityIcons'
                  ? materialCommunityIcons.color
                  : antDesign.color
              }
            />
          </TouchableOpacity>
        ) : (
          isRightButton && (
            <TouchableOpacity onPress={onRightPress}>
              <Text style={styles.isRightButtonText}>{isRightText}</Text>
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
  left: {
    width: '10%',
  },
  center: {
    width: '80%',
  },
  right: {
    width: '10%',
    alignItems: 'flex-end',
  },
  headerText: {
    textAlign: 'center',
    fontSize: FONTSIZE.SIZE20PX,
    fontWeight: 'bold',
    color: COLORS.MAIN_TEXT_COLOR,
  },
  isRightButtonText: {
    fontSize: FONTSIZE.SIZE15PX,
    fontWeight: 'bold',
  },
});
