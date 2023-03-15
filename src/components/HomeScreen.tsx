import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { aaa } from '../moc';

const HomeScreen = ({ navigation }: any) => {
  const [text, setText] = useState('');
  console.log(text);
  const handleEndReached = () => {
    // 末尾に到達したときにナビゲーションバーを非表示にする
    return navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: '検索',
        hideWhenScrolling: true,
        onChangeText: (event: any) => setText(event.nativeEvent.text),
      },
    });
  };

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.contents}>
        <Text>{item.name}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={aaa}
        renderItem={renderItem}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
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
