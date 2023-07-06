import React, { FC } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { COLORS, SIZE } from '../styles';
import { StackPramList } from '../types';
import AtomSettingRegister from './atoms/AtomSettingRegister';
import MolHeader from './molecules/MolHeader';

type Props = {
  navigation: StackNavigationProp<
    StackPramList,
    'memoTemplateSettingDetailScreen'
  >;
};

const MemoTemplateSettingDetailScreen: FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: COLORS.WHITE, flex: 1 }}>
        <MolHeader style={styles.header} type={'default'}>
          <AtomSettingRegister
            navigation={navigation}
            title={'メモのテンプレート'}
          />
        </MolHeader>

        {/* <FlatList
          data={listData}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          style={{ marginTop: -1 }}
        /> */}
      </View>
    </View>
  );
};

export default MemoTemplateSettingDetailScreen;

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
