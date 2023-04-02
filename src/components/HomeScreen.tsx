import React, { useState } from 'react';
import {
  Animated,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { aaa } from '../moc';
import { FontAwesome5 } from '@expo/vector-icons';
import moment from 'moment';
import { StackPramList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { color } from '../../styles';

type Props = {
  navigation: StackNavigationProp<StackPramList, 'homeScreen'>;
};

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const HomeScreen = ({ navigation }: Props) => {
  const [text, setText] = useState<string>('');
  const [animatedValue] = useState(new Animated.Value(0));

  const ListHeaderComponent = () => {
    return (
      <Animated.View
        style={[
          styles.dateArea,
          {
            backgroundColor: 'transparent',
          },
        ]}
      >
        <View>
          <Animated.Text
            style={{
              fontSize: 15,
              opacity: animatedValue.interpolate({
                inputRange: [0, 40],
                outputRange: [1, 0],
                extrapolate: 'clamp',
              }),
            }}
          >{`本日 ${moment().format('YYYY-MM-DD')}`}</Animated.Text>
        </View>
        <Animated.View
          style={[
            styles.iconArea,
            {
              opacity: animatedValue.interpolate({
                inputRange: [0, 40],
                outputRange: [1, 0],
                extrapolate: 'clamp',
              }),
            },
          ]}
        >
          <TouchableOpacity activeOpacity={1}>
            <FontAwesome5 name='sort-amount-down' size={20} color='black' />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  };

  const renderItem = ({ item, index }: any) => {
    if (item.eatName.match(text)) {
      return (
        <View key={Number(index)} style={{ backgroundColor: '#ffffff' }}>
          <TouchableOpacity
            style={styles.contents}
            onPress={() => {
              navigation.navigate('detailScreen', { item });
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
    } else {
      return null;
    }
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: animatedValue } } }],
    {
      useNativeDriver: true,
      listener: () => {
        Keyboard.dismiss();
      },
    }
  );

  const translateY = animatedValue.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -80],
    extrapolate: 'clamp',
  });

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={[
          {
            backgroundColor: color.mainColor,
            height: 0,
          },
          { transform: [{ translateY: translateY }] },
        ]}
      >
        <TextInput
          onChangeText={(e) => {
            setText(e);
          }}
          placeholder='検索'
          style={[
            {
              backgroundColor: '#ffffff',
              marginHorizontal: 5,
              height: 30,
              borderRadius: 3,
              paddingHorizontal: 5,
            },
          ]}
        />
      </Animated.View>
      <AnimatedFlatList
        data={aaa}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
        keyExtractor={(_, index) => index.toString()}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps='always'
        stickyHeaderIndices={[0]}
        contentContainerStyle={{
          paddingTop: 40,
        }}
        style={{ zIndex: -1, backgroundColor: color.mainColor }}
      />
    </View>
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
    backgroundColor: color.mainColor,
  },
  iconArea: {
    position: 'absolute',
    right: 10,
  },
});
