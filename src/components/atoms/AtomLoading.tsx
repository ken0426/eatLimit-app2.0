import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

const AtomLoading = () => {
  return <ActivityIndicator style={styles.loading} size={'large'} />;
};

export default AtomLoading;

const styles = StyleSheet.create({
  loading: {
    backgroundColor: '#303030',
    opacity: 0.5,
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
