import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Platform,
  StatusBar,
  Animated,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import { WINDOW_HEIGHT } from '../utils';

const DetailScreen = ({ navigation, route }: any) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const { width, height } = Dimensions.get('window');
  const { item } = route.params;

  const bannerAnimation = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [-200, 0],
          outputRange: [2, 1],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const searchInputContainerAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 40],
      outputRange: [0, 1],
    }),
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1, 40],
          outputRange: [0, 1, 1],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />

      {/* <Animated.View
        style={[styles.searchInputContainer, searchInputContainerAnimation]}
      /> */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Animated.Image
          source={require('../images/left-arrow.png')}
          style={[styles.backIcon]}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.searchButton}>
        <Text style={styles.rightTextStyle}>編集</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.bannerContainer, bannerAnimation]}>
        <Image style={styles.banner} source={{ uri: item.image }} />
      </Animated.View>
      <ScrollView
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y: animatedValue },
              },
            },
          ],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.paddingForBanner} />
        <View style={styles.scrollViewContent}>
          <Text>aaaaaaaaaaaaaaaaa</Text>
          <Text>aaaaaaaaaaaaaaaaa</Text>
          <Text>aaaaaaaaaaaaaaaaa</Text>
          <Text>aaaaaaaaaaaaaaaaa</Text>
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
    backgroundColor: 'white',
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
  // searchInputContainer: {
  //   position: 'absolute',
  //   zIndex: 100,
  //   width: '100%',
  //   padding: 60,
  //   backgroundColor: 'rgba(255, 255, 255, 0.5)',
  //   blurRadius: 100,
  //   ...Platform.select({
  //     android: { elevation: 3 },
  //     ios: {
  //       shadowColor: '#a8bed2',
  //       shadowOpacity: 1,
  //       shadowRadius: 4,
  //       shadowOffset: {
  //         width: 2,
  //         height: 2,
  //       },
  //     },
  //   }),
  // },
  bannerContainer: {
    position: 'absolute',
    height: BANNER_HEIGHT,
    width: '100%',
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  paddingForBanner: {
    height: BANNER_HEIGHT,
  },
  scrollViewContent: {
    height: WINDOW_HEIGHT,
    backgroundColor: 'white',
  },
});
