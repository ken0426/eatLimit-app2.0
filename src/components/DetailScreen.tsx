/** React */
import React, { FC, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  FlatList,
  ListRenderItem,
} from 'react-native';
/** Redux */
import { useRootSelector } from '../redux/store/store';
/** ライブラリ */
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
/** その他ファイル */
import AtomDetailMemo from './atoms/AtomDetailMemo';
import AtomButton from './atoms/AtomButton';
import MolHeader from './molecules/MolHeader';
import MolDetailOthers from './molecules/MolDetailOthers';
import MolDetailHeader from './molecules/MolDetailHeader';
import MolDetailTopItem from './molecules/MolDetailTopItem';
import { ApiData, StackPramList } from '../types';
import { useDetailAnimation } from '../hooks/useDetailAnimation';
import { WINDOW_HEIGHT } from '../utils';
import { COLORS, DETAIL_IMAGE_HEIGHT, FONTSIZE, SIZE } from '../styles';

type RouteItem = {
  params: {
    item: ApiData;
  };
};

type Props = {
  route: RouteProp<StackPramList, 'detailScreen'> & RouteItem;
};

const DetailScreen: FC<Props> = ({ route }) => {
  const navigation =
    useNavigation<StackNavigationProp<StackPramList, 'detailScreen'>>();
  const updateRegisterData = useRootSelector(
    (state) => state.commonRegister.updateRegisterData
  );
  const { item } = route.params;
  const [detailData, setDetailData] = useState(item);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const updateData: ApiData = { ...updateRegisterData };
    setDetailData(updateData);
  }, [updateRegisterData]);

  const { bannerAnimation, blurRadius, onScroll } =
    useDetailAnimation(animatedValue);

  /** 画像がある際にヘッダーのアニメーションで使用 */
  const ListHeaderComponent = () => <View style={styles.paddingForBanner} />;

  /** 詳細画面に表示するメインのコンテンツ */
  const renderItem: ListRenderItem<ApiData> = ({ item, index }) => {
    return (
      <View key={index}>
        <MolDetailTopItem item={item} />

        <MolDetailOthers item={item} />

        {item?.memo && <AtomDetailMemo item={item} />}
      </View>
    );
  };

  /** 詳細画面の一番下に表示するコピーボタン */
  const ListFooterComponent = () => (
    <View style={styles.button}>
      <AtomButton
        onPress={() =>
          navigation.navigate('registerScreen', { data: detailData })
        }
        color={COLORS.WHITE}
        fontSize={FONTSIZE.SIZE30PX}
        backgroundColor={COLORS.ORANGE}
        width={200}
        buttonText={'コピー'}
        fontWeight={'bold'}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* ヘッダー */}
      {detailData.image && <MolHeader type={'detail'} />}
      {detailData.image && (
        <Animated.View style={[styles.bannerContainer, bannerAnimation]}>
          <Animated.Image
            blurRadius={blurRadius}
            style={styles.banner}
            source={{ uri: detailData.image }}
          />
        </Animated.View>
      )}
      {!detailData.image && (
        <View style={styles.noImageHeader}>
          <MolDetailHeader top={SIZE.BASE_HP * 1.2} />
        </View>
      )}

      {/* 詳細画面に表示するコンテンツ */}
      <FlatList
        onScroll={onScroll}
        scrollEventThrottle={16}
        data={[detailData]}
        ListHeaderComponent={detailData.image ? ListHeaderComponent : <></>}
        renderItem={renderItem}
        ListFooterComponent={ListFooterComponent}
        keyExtractor={(_, index) => index.toString()}
        style={styles.list}
      />
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DETAIL_BACKGROUND,
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
    backgroundColor: COLORS.DETAIL_BACKGROUND,
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
  button: {
    alignItems: 'center',
    marginVertical: SIZE.BASE_WP * 10,
  },
  list: {
    flex: 1,
  },
});
