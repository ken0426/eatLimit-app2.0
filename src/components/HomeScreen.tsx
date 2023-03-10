import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
  return (
    <>
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
});
