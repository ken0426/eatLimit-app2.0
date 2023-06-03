import React, { FC, useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AtomSearch from './atoms/AtomSearch';
import MolHeader from './molecules/MolHeader';
import { ApiData, StackPramList } from '../types';
import { SIZE, color } from '../styles';
import OrgList from './organisms/OrgList';
import { filterData } from '../utils';

type RouteItem = {
  params: {
    data: ApiData[];
  };
};

type Props = {
  navigation: StackNavigationProp<StackPramList, 'searchScreen'>;
  route: RouteProp<StackPramList, 'searchScreen'> & RouteItem;
};

const SearchScreen: FC<Props> = ({ navigation, route }) => {
  const { data } = route.params;
  const [text, setText] = useState('');

  const renderItem: ListRenderItem<ApiData> = ({ item, index }) => (
    <OrgList item={item} index={index} navigation={navigation} />
  );

  const getData = () => {
    if (text === '') {
      return [];
    } else {
      return filterData(data, text);
    }
  };

  return (
    <View>
      <MolHeader style={styles.header} type={'default'}>
        <AtomSearch navigation={navigation} text={text} setText={setText} />
      </MolHeader>

      <FlatList
        data={getData()}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  header: {
    height: SIZE.BASE_HP * 12,
    paddingHorizontal: SIZE.BASE_WP * 5,
    paddingTop: SIZE.BASE_HP * 4,
    backgroundColor: color.mainColor,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
