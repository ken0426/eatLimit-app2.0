import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useDetailAnimation } from '../hooks/useDetailAnimation';
import { WINDOW_HEIGHT } from '../utils';
import { color } from '../styles';

const DetailScreen = ({ navigation, route }: any) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const { item } = route.params;
  const BANNER_HEIGHT = 130;

  const { bannerAnimation, blurRadius, onScroll } = useDetailAnimation({
    animatedValue,
    BANNER_HEIGHT,
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 80,
          flexDirection: 'row',
          zIndex: 11,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          width: '100%',
          top: 30,
        }}
      >
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <View
            style={{
              backgroundColor: color.detailHeaderButton,
              borderRadius: 50,
              width: '100%',
            }}
          >
            <Ionicons
              name='chevron-back'
              size={28}
              color={color.textWhite}
              style={{ right: 1, padding: 2 }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.searchButton}
          onPress={() => console.log('編集ボタンです')}
        >
          <View
            style={{
              backgroundColor: color.detailHeaderButton,
              borderRadius: 50,
              width: '100%',
            }}
          >
            <Entypo
              name='dots-three-horizontal'
              size={28}
              color={color.textWhite}
              style={{ padding: 2 }}
            />
          </View>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'center',
    height: '100%',
    zIndex: 100,
  },
  backButton: {
    height: '100%',
    justifyContent: 'center',
    zIndex: 100,
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
    height: 150,
  },
  scrollViewContent: {
    height: WINDOW_HEIGHT,
    backgroundColor: 'white',
  },
});
