import React, { FC } from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import MolHeader from './molecules/MolHeader';
import AtomSettingRegister from './atoms/AtomSettingRegister';
import { COLORS, FONTSIZE, SIZE } from '../styles';

type Props = {
  navigation: any;
  route: any;
};

const SettingDetailScreen: FC<Props> = ({ navigation, route }) => {
  const { data } = route.params;

  const renderItem: ListRenderItem<any> = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        style={{
          width: '100%',
          backgroundColor: COLORS.WHITE,
          height: SIZE.BASE_HP * 5.5,
          borderBottomColor: COLORS.DETAIL_BORDER,
          borderBottomWidth: 0.2,
          alignItems: 'center',
          paddingHorizontal: SIZE.BASE_WP * 2,
          flexDirection: 'row',
        }}
        onPress={() => {}}
      >
        <Feather
          name='check'
          size={24}
          color={COLORS.BLUE}
          style={{ marginRight: SIZE.BASE_WP * 2 }}
        />
        <Text style={{ fontSize: FONTSIZE.SIZE18PX }}>{item.text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: COLORS.WHITE, flex: 1 }}>
        <MolHeader style={styles.header} type={'default'}>
          <AtomSettingRegister navigation={navigation} title={data.label} />
        </MolHeader>

        <FlatList
          data={data.data}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default SettingDetailScreen;

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
