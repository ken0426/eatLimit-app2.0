import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import AtomSearch from './atoms/AtomSearch';
import MolHeader from './molecules/MolHeader';
import { StackPramList } from '../types';
import { SIZE, color } from '../styles';

type Props = {
  navigation: StackNavigationProp<StackPramList, 'searchScreen'>;
};

const SearchScreen: FC<Props> = ({ navigation }) => {
  return (
    <View>
      <MolHeader style={styles.header} type={'default'}>
        <AtomSearch navigation={navigation} />
      </MolHeader>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  header: {
    height: SIZE.BASE_HP * 12,
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: color.mainColor,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
