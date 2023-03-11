import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { color } from '../../styles';

const HomeScreen = () => {
  const aaa = [
    { name: 'スタート' },
    { name: 'aaa' },
    { name: 'aaa' },
    { name: 'aaa' },
    { name: 'aaa' },
    { name: 'aaa' },
    { name: 'aaa' },
    { name: 'aaa' },
    { name: 'aaa' },
    { name: 'aaa' },
    { name: 'aaa' },
    { name: 'aaa' },
    { name: 'aaa' },
  ];

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.contents}>
        <Text>{item.name}</Text>
      </View>
    );
  };
  return (
    // <View style={styles.contents}>
    //   <View style={styles.topBar}>{/* <Text>aaa</Text> */}</View>
    // </View>
    <FlatList data={aaa} renderItem={renderItem}></FlatList>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  contents: {
    height: 100,
    backgroundColor: 'red',
  },
  topBar: {
    height: 180,
    backgroundColor: 'red',
    // backgroundColor: color.rightBlue,
  },
  searchArea: {
    height: 100,
    backgroundColor: 'red',
    // backgroundColor: 'red',
    // borderColor: color.rightBlue,
    // borderWidth: 0,
  },
});
