import React, { FC, useState } from 'react';
import {
  FlatList,
  Keyboard,
  ListRenderItem,
  StyleSheet,
  View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import AtomSearch from './atoms/AtomSearch';
import MolHeader from './molecules/MolHeader';
import { ApiData, StackPramList } from '../types';
import { COLORS, SIZE } from '../styles';
import OrgList from './organisms/OrgList';
import { filterData } from '../utils';
import { HEADER_TYPE } from '../contents';
import AtomCountDisplay from './atoms/AtomCountDisplay';

type RouteItem = {
  params: {
    data: ApiData[];
  };
};

type Props = {
  route: RouteProp<StackPramList, 'searchScreen'> & RouteItem;
};

const SearchScreen: FC<Props> = ({ route }) => {
  const navigation =
    useNavigation<StackNavigationProp<StackPramList, 'searchScreen'>>();
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
    <View style={{ flex: 1 }}>
      <MolHeader style={styles.header} type={HEADER_TYPE.DEFAULT}>
        <AtomSearch navigation={navigation} text={text} setText={setText} />
      </MolHeader>

      <AtomCountDisplay listData={getData()} />
      <FlatList
        data={getData()}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        onScroll={() => Keyboard.dismiss()}
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
    backgroundColor: COLORS.MAIN_COLOR,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
