import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTSIZE } from '../../styles';

type Props = {
  title: string;
  isRightButton?: boolean;
  isRightText?: string;
  onRightPress?: () => void;
  imageType?: 'plus';
};

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
      <TouchableOpacity
        style={{ width: '10%' }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name='chevron-back' size={24} color='black' />
      </TouchableOpacity>
      <View style={{ width: '80%' }}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <View style={{ width: '10%', alignItems: 'flex-end' }}>
        {imageType ? (
          <MaterialCommunityIcons
            onPress={onRightPress}
            name='tag-plus-outline'
            size={24}
            color='black'
          />
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
