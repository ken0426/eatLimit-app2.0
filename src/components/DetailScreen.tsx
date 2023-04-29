import React, { FC, useRef } from 'react';
import { StyleSheet, View, ScrollView, Animated, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { WINDOW_HEIGHT } from '../utils';
import MolHeader from './molecules/MolHeader';
import { ApiData, StackPramList } from '../types';
import { DETAIL_IMAGE_HEIGHT } from '../contents';
import { useDetailAnimation } from '../hooks/useDetailAnimation';
import { color } from '../styles';

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

  const { bannerAnimation, blurRadius, onScroll } =
    useDetailAnimation(animatedValue);

  return (
    <View style={styles.container}>
      <MolHeader type={'detail'} />
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
          <View style={styles.itemArea}>
            <Text style={styles.label}>商品名</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              {item.eatName}
            </Text>
          </View>
          <View style={styles.itemArea}>
            <Text style={styles.label}>消費期限</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              {item.date}
            </Text>
          </View>
          <View style={styles.itemArea}>
            <Text style={styles.label}>保存方法</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>冷蔵</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailScreen;

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
    padding: 10,
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
  itemArea: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: color.detailBorderColor,
  },
  label: {
    width: '40%',
    fontSize: 20,
  },
});
