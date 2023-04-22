import { Animated } from 'react-native';

type UseDetailAnimation = {
  animatedValue: Animated.Value;
  BANNER_HEIGHT: number;
};

export const useDetailAnimation = ({
  animatedValue,
  BANNER_HEIGHT,
}: UseDetailAnimation) => {
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
          outputRange: [2, 1],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const blurRadius = animatedValue.interpolate({
    inputRange: [BANNER_HEIGHT + 20, BANNER_HEIGHT + 70],
    outputRange: [0, 10],
    extrapolate: 'clamp',
  });

  return {
    bannerAnimation,
    blurRadius,
  };
};
