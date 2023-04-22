import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { color } from '../../styles';

const MolDetailHeader = ({ navigation }: any) => {
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <View style={styles.headerButtonBackGround}>
            <Ionicons
              name='chevron-back'
              size={28}
              color={color.textWhite}
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
              color={color.textWhite}
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
    height: 80,
    flexDirection: 'row',
    zIndex: 11,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '100%',
    top: 30,
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
