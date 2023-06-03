import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { SIZE, color } from '../../styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackPramList } from '../../types';

type Props = {
  navigation: StackNavigationProp<StackPramList>;
  top?: number;
};

const MolDetailHeader: FC<Props> = ({
  navigation,
  top = SIZE.BASE_HP * 3.8,
}) => {
  return (
    <>
      <View style={[styles.header, { top }]}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <View style={styles.headerButtonBackGround}>
            <Ionicons
              name='chevron-back'
              size={28}
              color={'#ffffff'}
              style={{ right: 1, padding: 2 }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.searchButton}
          onPress={() => console.log('編集ボタンです')}
        >
          <View style={styles.headerButtonBackGround}>
            <Entypo
              name='dots-three-horizontal'
              size={28}
              color={'#ffffff'}
              style={{ padding: 2 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </>
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
    backgroundColor: color.detailHeaderButton,
    borderRadius: 50,
    width: '100%',
  },
  searchButton: {
    justifyContent: 'center',
    height: '100%',
    zIndex: 100,
  },
});
