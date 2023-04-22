import { Animated } from 'react-native';

type UseDetailAnimation = {
  animatedValue: Animated.Value;
  BANNER_HEIGHT: number;
};

export const useDetailAnimation = ({
  animatedValue,
  BANNER_HEIGHT,
}: UseDetailAnimation) => {
  /** 詳細画面を上下にスクロール時した時のアニメーションの処理 */
  const bannerAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, BANNER_HEIGHT],
          outputRange: [0, -BANNER_HEIGHT],
          extrapolate: 'clamp',
        }),
      },
      {
        scale: animatedValue.interpolate({
          inputRange: [-BANNER_HEIGHT, 0],
          outputRange: [1.5, 1],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  /** 画像をぼかすための処理 */
  const blurRadius = animatedValue.interpolate({
    inputRange: [BANNER_HEIGHT + 20, BANNER_HEIGHT + 70],
    outputRange: [0, 10],
    extrapolate: 'clamp',
  });

  /** スクロール時のイベント */
  const onScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: { y: animatedValue },
        },
      },
    ],
    { useNativeDriver: false }
  );

  return {
    bannerAnimation,
    blurRadius,
    onScroll,
  };
};
