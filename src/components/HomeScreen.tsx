import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { aaa } from '../moc';

const HomeScreen = ({ navigation }: any) => {
  const [text, setText] = useState<string>('');

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

  const renderItem = ({ item, index }: any) => {
    if (index === 0) {
      return (
        <View>
          <View style={styles.searchArea}></View>
          <View style={styles.contents}>
            <View style={styles.imageArea}></View>
            <View>
              <Text>{item.eatName}</Text>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.contents}>
          <View style={styles.imageArea}></View>
          <View>
            <Text>{item.eatName}</Text>
          </View>
        </View>
      );
    }
  };

  const keyExtractor = (_: any, index: any) => index;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* ここに本来なら日付項目がほしい */}
      <FlatList
        data={aaa}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        // onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  contents: {
    height: 100,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  imageArea: {
    width: 130,
    height: '100%',
    backgroundColor: 'red',
  },
  topBar: {
    height: 180,
    backgroundColor: 'red',
    // backgroundColor: color.rightBlue,
  },
  searchArea: {
    height: 40,
    backgroundColor: 'blue',
    // backgroundColor: 'red',
    // borderColor: color.rightBlue,
    // borderWidth: 0,
  },
});
