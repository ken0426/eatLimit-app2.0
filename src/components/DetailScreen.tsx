import React, { FC, useRef } from 'react';
import { StyleSheet, View, ScrollView, Animated } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { WINDOW_HEIGHT } from '../utils';
import MolHeader from './molecules/MolHeader';
import { ApiData, StackPramList } from '../types';
import { useDetailAnimation } from '../hooks/useDetailAnimation';
import AtomSingleItem from './atoms/AtomSingleItem';
import MolDetailHeader from './molecules/MolDetailHeader';
import { COLORS, DETAIL_IMAGE_HEIGHT, FONTSIZE, SIZE } from '../styles';
import { LABEL_TEXT } from '../contents';
import AtomButton from './atoms/AtomButton';

type RouteItem = {
  params: {
    item: ApiData;
  };
};

type Props = {
  route: RouteProp<StackPramList, 'detailScreen'> & RouteItem;
};

const DetailScreen: FC<Props> = ({ route }) => {
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
          <MolDetailHeader top={SIZE.BASE_HP * 1.2} />
        </View>
      )}
      <ScrollView onScroll={onScroll} scrollEventThrottle={16}>
        {item.image && <View style={styles.paddingForBanner} />}
        <View style={styles.scrollViewContent}>
          <AtomSingleItem value={item.eatName} label={LABEL_TEXT.PRODUCT} />
          <AtomSingleItem value={`${item.count}`} label={LABEL_TEXT.QUANTITY} />
          <AtomSingleItem value={item.date} label={item.management} />
          {item?.approximateDeadline && (
            <AtomSingleItem
              value={item.approximateDeadline}
              label={LABEL_TEXT.APPROXIMATE_DEADLINE}
            />
          )}
          <AtomSingleItem
            value={item.preservation}
            label={LABEL_TEXT.PRESERVATION}
          />
          {item?.placeOfPurchase && (
            <AtomSingleItem
              value={item.placeOfPurchase}
              label={LABEL_TEXT.PLACE_OF_PURCHASE}
            />
          )}
          {item?.price && (
            <AtomSingleItem
              value={item.price}
              label={LABEL_TEXT.AMOUNT_OF_MONEY}
            />
          )}

          <View style={{ alignItems: 'center', marginTop: SIZE.BASE_WP * 10 }}>
            <AtomButton
              onPress={() => {}}
              color={COLORS.WHITE}
              fontSize={FONTSIZE.SIZE30PX}
              backgroundColor={COLORS.ORANGE}
              width={200}
              buttonText={'コピー'}
              fontWeight={'bold'}
            />
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
