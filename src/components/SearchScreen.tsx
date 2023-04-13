import React from 'react';
import { StyleSheet } from 'react-native';
import AtomSearch from './atoms/AtomSearch';
import MolHeader from './molecules/MolHeader';
import { color } from '../../styles';

const SearchScreen = ({ navigation }: any) => {
  return (
    <MolHeader style={styles.header}>
      <AtomSearch navigation={navigation} />
    </MolHeader>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  header: {
    height: 100,
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: color.mainColor,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
