import React, { FC, useRef } from 'react';
import { StyleSheet, View, ScrollView, Animated, Text } from 'react-native';

import { useDetailAnimation } from '../hooks/useDetailAnimation';
import { WINDOW_HEIGHT } from '../utils';
import { StackNavigationProp } from '@react-navigation/stack';
import { ApiData, StackPramList } from '../types';
import MolHeader from './molecules/MolHeader';
import { RouteProp } from '@react-navigation/native';

type RouteItem = {
  params: {
    item: ApiData;
  };
};

type Props = {
  navigation: StackNavigationProp<StackPramList, 'detailScreen'>;
  route: RouteProp<StackPramList, 'detailScreen'> & RouteItem;
};

const DetailScreen: FC<Props> = ({ navigation, route }) => {
  const { item } = route.params;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const BANNER_HEIGHT = 130;

  const { bannerAnimation, blurRadius, onScroll } = useDetailAnimation({
    animatedValue,
    BANNER_HEIGHT,
  });

  return (
    <View style={styles.container}>
      <MolHeader type={'detail'} navigation={navigation} />
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

const DETAIL_IMAGE_HEIGHT = 224;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  paddingForBanner: {
    height: 150,
  },
  scrollViewContent: {
    height: WINDOW_HEIGHT,
    backgroundColor: 'white',
  },
  bannerContainer: {
    position: 'absolute',
    height: DETAIL_IMAGE_HEIGHT,
    width: '100%',
    zIndex: 10,
  },
  banner: {
    width: '100%',
    height: DETAIL_IMAGE_HEIGHT,
  },
});
