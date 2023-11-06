import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZE } from '../../styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackPramList } from '../../types';
import SvgIcon from '../../images/SvgIcon';

type Props = {
  top?: number;
};

const MolDetailHeader: FC<Props> = ({ top = SIZE.BASE_HP * 3.8 }) => {
  const navigation = useNavigation<StackNavigationProp<StackPramList>>();
  return (
    <View style={[styles.header, { top }]}>
      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
      >
        <View style={styles.headerButtonBackGround}>
          <SvgIcon
            type={'ionicons'}
            name={'chevron-back'}
            size={28}
            color={COLORS.WHITE}
            style={styles.leftBackButton}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.searchButton}
        onPress={() => navigation.navigate('updateRegisterScreen')}
      >
        <View style={styles.headerButtonBackGround}>
          <SvgIcon
            type={'entypo'}
            name={'dots-three-horizontal'}
            size={28}
            color={COLORS.WHITE}
            style={styles.rightHamburgerButton}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MolDetailHeader;

const styles = StyleSheet.create({
  header: {
    height: SIZE.BASE_HP * 10,
    flexDirection: 'row',
    zIndex: 11,
    justifyContent: 'space-between',
    paddingHorizontal: SIZE.BASE_WP * 5,
    width: '100%',
  },
  backButton: {
    height: '100%',
    justifyContent: 'center',
    zIndex: 100,
  },
  headerButtonBackGround: {
    backgroundColor: COLORS.DETAIL_HEADER_BUTTON,
    borderRadius: 50,
    width: '100%',
  },
  searchButton: {
    justifyContent: 'center',
    height: '100%',
    zIndex: 100,
  },
  leftBackButton: {
    right: 1,
    padding: 2,
  },
  rightHamburgerButton: {
    padding: 2,
  },
});
