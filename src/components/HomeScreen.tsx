import React, { FC } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ApiData, StackPramList } from '../types';
import MolHeader from './molecules/MolHeader';
import { COLORS, SIZE } from '../styles';
import { data } from '../moc';
import AtomHome from './atoms/AtomHome';
import OrgList from './organisms/OrgList';

type Props = {
  navigation: StackNavigationProp<StackPramList, 'homeScreen'>;
};

const HomeScreen: FC<Props> = ({ navigation }) => {
  const renderItem: ListRenderItem<ApiData> = ({ item, index }) => (
    <OrgList item={item} index={index} navigation={navigation} />
  );

  return (
    <View style={{ flex: 1 }}>
      <MolHeader
        style={{
          height: SIZE.BASE_HP * 12,
          paddingHorizontal: SIZE.BASE_WP * 5,
          paddingTop: SIZE.BASE_HP * 4,
          backgroundColor: COLORS.mainColor,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}
        type={'default'}
      >
        <AtomHome navigation={navigation} data={data} />
      </MolHeader>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default HomeScreen;
