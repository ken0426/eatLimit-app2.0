import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { aaa } from '../moc';
import { FontAwesome5 } from '@expo/vector-icons';
import moment from 'moment';

const HomeScreen = ({ navigation }: any) => {
  const [text, setText] = useState<string>('');
  const [isScroll, setIsScroll] = useState(true);
  console.log(isScroll);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: '検索',
        cancelButtonText: 'キャンセル',
        onBlur: () => {
          console.log('フォーカスが外れた');
          Keyboard.dismiss();
        },
        onChangeText: (e: { nativeEvent: { text: string } }) =>
          setText(e.nativeEvent.text),
      },
    });
  }, [navigation, isScroll]);

  const renderItem = ({ item, index }: any) => {
    return (
      <View>
        {Number(index) === 0 && (
          <View style={styles.dateArea}>
            <View>
              <Text>{moment().format('YYYY-MM-DD')}</Text>
            </View>
            <TouchableOpacity
              style={styles.iconArea}
              activeOpacity={1}
              onPress={() => {
                setIsScroll(false);
              }}
            >
              <FontAwesome5 name='sort-amount-down' size={20} color='black' />
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          style={styles.contents}
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.imageArea}></View>
          <View>
            <Text>{item.eatName}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={aaa}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        onScrollBeginDrag={() => {
          console.log('スクロールされた');
        }}
        // onScrollEndDrag={() => console.log('一番下')}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  contents: {
    height: 90,
    borderBottomWidth: 0.3,
    borderColor: '#c2c2c2',
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
  },
  dateArea: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconArea: {
    position: 'absolute',
    right: 10,
  },
});
