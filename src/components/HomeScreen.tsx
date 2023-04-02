import React, { useState } from 'react';
import {
  Animated,
  FlatList,
  Keyboard,
  RefreshControl,
  SafeAreaView,
  ScrollView,
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

type TextType = {
  nativeEvent: { text: string };
};

type SearchBarProp = {
  headerSearchBarOptions: {
    placeholder: string;
    cancelButtonText: string;
    onChangeText: (e: TextType) => void;
  };
};

type Props = {
  navigation: StackNavigationProp<StackPramList, 'homeScreen'> & {
    setOptions: (e: SearchBarProp) => void;
  };
};

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const HomeScreen = ({ navigation }: Props) => {
  const [text, setText] = useState<string>('');
  const [animatedValue] = useState(new Animated.Value(0));

  const ListHeaderComponent = () => {
    return (
      <View style={styles.dateArea}>
        <View>
          <Text>{moment().format('YYYY-MM-DD')}</Text>
        </View>
        <TouchableOpacity style={styles.iconArea} activeOpacity={1}>
          <FontAwesome5 name='sort-amount-down' size={20} color='black' />
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item, index }: any) => {
    return (
      <View key={Number(index)} style={{ backgroundColor: '#ffffff' }}>
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
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: animatedValue } } }],
    { useNativeDriver: true }
  );

  const translateY = animatedValue.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -80],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView>
      <Animated.View
        style={[
          { backgroundColor: color.mainColor, height: 40 },
          { transform: [{ translateY: translateY }] },
        ]}
      >
        <AnimatedTextInput
          style={[{ backgroundColor: 'blue', marginHorizontal: 20 }]}
        />
      </Animated.View>
      <AnimatedFlatList
        data={aaa}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
        keyExtractor={(_, index) => index.toString()}
        onScroll={handleScroll}
        scrollEventThrottle={16}
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
    backgroundColor: 'yellow',
  },
  iconArea: {
    position: 'absolute',
    right: 10,
  },
});
