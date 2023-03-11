import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { color } from '../../styles';

const HomeScreen = () => {
  return (
    <>
      <View style={styles.searchArea}></View>
      <View style={styles.topBar}></View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  topBar: {
    height: 30,
    backgroundColor: '#ffffff',
  },
  searchArea: {
    height: 30,
    backgroundColor: color.rightBlue,
    // backgroundColor: 'red',
    // borderColor: color.rightBlue,
    borderWidth: 0,
  },
});
