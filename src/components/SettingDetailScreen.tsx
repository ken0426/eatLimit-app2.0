import React, { FC } from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MolHeader from './molecules/MolHeader';
import AtomSettingRegister from './atoms/AtomSettingRegister';
import { COLORS, FONTSIZE, SIZE, STYLE_FLEX } from '../styles';
import { commonSettingAdaptor } from '../adaptor/commonSettingAdaptor';
import { useRootDispatch } from '../redux/store/store';
import { onSettingPress } from '../functions';
import {
  ListData,
  SettingItem,
  SettingMemoSelectItem,
  StackPramList,
} from '../types';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { HEADER_TYPE } from '../contents';
import SvgIcon from '../images/SvgIcon';

type RouteItem = {
  params: {
    data: SettingItem | SettingMemoSelectItem;
  };
};

type Props = {
  route: RouteProp<StackPramList, 'settingDetailScreen'> & RouteItem;
};

const SettingDetailScreen: FC<Props> = ({ route }) => {
  const dispatch = useRootDispatch();
  const navigation = useNavigation();
  const { data } = route.params;
  const isTemplate = data.isTemplate;
  const formatData = commonSettingAdaptor(data);

  const listData = formatData.data;

  const renderItem: ListRenderItem<ListData> = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.item,
          {
            borderTopWidth: index === 0 ? 0.2 : 0,
            borderTopColor: COLORS.DETAIL_BORDER,
          },
        ]}
        onPress={() => {
          onSettingPress(dispatch, formatData.label, item, isTemplate);
          navigation.goBack();
        }}
      >
        <SvgIcon
          type={'feather'}
          name={'check'}
          size={24}
          color={COLORS.BLUE}
          style={[styles.check, { opacity: item.check ? 1 : 0 }]}
        />
        <Text style={styles.text}>{item.text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={STYLE_FLEX}>
      <View style={styles.contents}>
        <MolHeader style={styles.header} type={HEADER_TYPE.DEFAULT}>
          <AtomSettingRegister
            title={isTemplate ? 'テンプレート選択' : data.label}
          />
        </MolHeader>

        <FlatList
          data={listData}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          style={styles.list}
        />
      </View>
    </View>
  );
};

export default SettingDetailScreen;

const styles = StyleSheet.create({
  contents: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
  },
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
  item: {
    width: '100%',
    backgroundColor: COLORS.WHITE,
    height: SIZE.BASE_HP * 5.5,
    borderBottomColor: COLORS.DETAIL_BORDER,
    borderBottomWidth: 0.2,
    alignItems: 'center',
    paddingHorizontal: SIZE.BASE_WP * 2,
    flexDirection: 'row',
  },
  check: {
    marginRight: SIZE.BASE_WP * 2,
  },
  text: {
    fontSize: FONTSIZE.SIZE18PX,
  },
  list: {
    marginTop: -1,
  },
});
