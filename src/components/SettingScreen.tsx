import React, { FC } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { COLORS, SIZE } from '../styles';
import MolHeader from './molecules/MolHeader';
import AtomSettingRegister from './atoms/AtomSettingRegister';
import { LABEL, settingData } from '../contents';
import {
  SettingData,
  SettingDataItem,
  SettingMemoSelectItem,
  StackPramList,
} from '../types';
import { getEditDataFormat, getKey } from '../utils';
import { useRootSelector } from '../redux/store/store';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AtomSettingLabel from './atoms/AtomSettingLabel';
import MolSettingList from './molecules/MolSettingList';

type RouteItem = {
  params?: {
    data: {
      data: {
        [key: string]: {
          headline: string;
          item: SettingMemoSelectItem[];
        };
      }[];
      label: string;
    };
  };
};

export type MemoTemplateData = {
  [key: string]: {
    headline: string;
    item: {
      label: string;
      isMemoTemplate: boolean;
      isTemplate: boolean;
      data: {
        id: number & {
          headline: string;
          item: {
            data: SettingDataItem[];
            isTemplate: boolean;
            label: string;
            isMemoTemplate: boolean;
            id: number;
            input: string;
          }[];
        };
      }[];
      id: number;
      input: string;
    }[];
  };
};

type Props = {
  navigation: StackNavigationProp<StackPramList, 'settingScreen'>;
  route: RouteProp<StackPramList, 'settingScreen'> & RouteItem;
};

const SettingScreen: FC<Props> = ({ navigation, route }) => {
  const data = route.params?.data;
  const memoTemplateData = data?.data;
  const dateFormatDisplayId = useRootSelector(
    (state) => state.common.dateFormatDisplayId
  );
  const id = dateFormatDisplayId;

  const renderItem: ListRenderItem<SettingData> = ({ item, index }) => {
    const key = getKey(item);
    const headline = item[key].headline;
    return (
      <View key={index}>
        <AtomSettingLabel text={headline} />
        {item[key].item.map((data, index) => (
          <MolSettingList
            key={index}
            onPress={() => {
              if (data.label === LABEL.DATE_DISPLAY) {
                const editFormat = getEditDataFormat(data, id);
                navigation.navigate('settingDetailScreen', {
                  data: editFormat,
                });
              } else if (data.label === LABEL.MEMO_TEMPLATE) {
                navigation.push('settingMemoScreen');
              } else {
                navigation.navigate('settingDetailScreen', { data });
              }
            }}
            text={data.label}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: COLORS.WHITE, flex: 1 }}>
        <MolHeader style={styles.header} type={'default'}>
          <AtomSettingRegister navigation={navigation} title={'設定'} />
        </MolHeader>

        <FlatList
          data={settingData}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  header: {
    height: SIZE.BASE_HP * 12,
    paddingHorizontal: SIZE.BASE_WP * 5,
    paddingTop: SIZE.BASE_HP * 4,
    backgroundColor: COLORS.MAIN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 2,
  },
});
