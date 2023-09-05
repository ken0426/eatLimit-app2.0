import React, { FC, useRef } from 'react';
import { StyleSheet, View, ScrollView, Animated } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { WINDOW_HEIGHT } from '../utils';
import MolHeader from './molecules/MolHeader';
import { ApiData, StackPramList } from '../types';
import { useDetailAnimation } from '../hooks/useDetailAnimation';
import AtomSingleItem from './atoms/AtomSingleItem';
import MolDetailHeader from './molecules/MolDetailHeader';
import { COLORS, DETAIL_IMAGE_HEIGHT, SIZE } from '../styles';

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
      {item.image && <MolHeader type={'detail'} />}
      {item.image && (
        <Animated.View style={[styles.bannerContainer, bannerAnimation]}>
          <Animated.Image
            blurRadius={blurRadius}
            style={styles.banner}
            source={{ uri: item.image }}
          />
        </Animated.View>
      )}
      {!item.image && (
        <View style={styles.noImageHeader}>
          <MolDetailHeader navigation={navigation} top={SIZE.BASE_HP * 1.2} />
        </View>
      )}
      <ScrollView onScroll={onScroll} scrollEventThrottle={16}>
        {item.image && <View style={styles.paddingForBanner} />}
        <View style={styles.scrollViewContent}>
          <AtomSingleItem value={item.eatName} label={'商品名'} />
          <AtomSingleItem value={item.date} label={item.management} />
          {item?.approximateDeadline && (
            <AtomSingleItem
              value={item.approximateDeadline}
              label={'期限目安'}
            />
          )}
          <AtomSingleItem value={item.keep} label={'保存方法'} />
          {item?.placeOfPurchase && (
            <AtomSingleItem value={item.placeOfPurchase} label={'購入場所'} />
          )}
          {item?.price && <AtomSingleItem value={item.price} label={'金額'} />}
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  noImageHeader: {
    height: SIZE.BASE_HP * 12,
    backgroundColor: COLORS.MAIN_COLOR,
    paddingTop: SIZE.BASE_HP * 2.3,
    justifyContent: 'center',
    borderBottomColor: '#a1a1a1',
    borderBottomWidth: 0.5,
  },
  paddingForBanner: {
    height: SIZE.BASE_HP * 18,
  },
  scrollViewContent: {
    height: WINDOW_HEIGHT,
    backgroundColor: COLORS.WHITE,
    padding: SIZE.BASE_HP * 1.2,
  },
  bannerContainer: {
    position: 'absolute',
    height: DETAIL_IMAGE_HEIGHT,
    width: '100%',
    zIndex: 10,
    backgroundColor: COLORS.WHITE,
  },
  banner: {
    width: '100%',
    height: DETAIL_IMAGE_HEIGHT,
  },
});
