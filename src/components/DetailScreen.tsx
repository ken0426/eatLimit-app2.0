import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { useDetailAnimation } from '../hooks/useDetailAnimation';
import { WINDOW_HEIGHT } from '../utils';

const DetailScreen = ({ navigation, route }: any) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const { item } = route.params;
  const BANNER_HEIGHT = 100;

  const { bannerAnimation, blurRadius, onScroll } = useDetailAnimation({
    animatedValue,
    BANNER_HEIGHT,
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require('../images/left-arrow.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.searchButton}>
        <Text style={styles.rightTextStyle}>編集</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.bannerContainer, bannerAnimation]}>
        <Animated.Image
          blurRadius={blurRadius}
          style={styles.banner}
          source={{ uri: item.image }}
        />
      </Animated.View>
      <ScrollView onScroll={onScroll} scrollEventThrottle={16}>
        <View style={styles.paddingForBanner} />
        <View style={styles.scrollViewContent}>
          <Text>{`これは【${item.eatName}】の詳細画面です`}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailScreen;

const BANNER_HEIGHT = 224;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  searchButton: {
    position: 'absolute',
    right: 0,
    top: 48,
    width: 48,
    height: 48,
    zIndex: 100,
  },
  rightTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    top: 20,
  },
  searchIcon: {
    width: 32,
    height: 32,
    tintColor: 'white',
    zIndex: 50,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 78,
    width: 48,
    height: 48,
    zIndex: 100,
  },
  backIcon: {
    width: 16,
    height: 16,
    tintColor: 'white',
    zIndex: 50,
  },
  bannerContainer: {
    position: 'absolute',
    height: BANNER_HEIGHT,
    width: '100%',
    zIndex: 10,
  },
  banner: {
    width: '100%',
    height: BANNER_HEIGHT,
  },
  paddingForBanner: {
    height: BANNER_HEIGHT,
  },
  scrollViewContent: {
    height: WINDOW_HEIGHT,
    backgroundColor: 'white',
  },
});
