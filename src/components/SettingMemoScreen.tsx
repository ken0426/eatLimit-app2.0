import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import MolHeader from './molecules/MolHeader';
import AtomSettingRegister from './atoms/AtomSettingRegister';
import { COLORS, SIZE } from '../styles';
import MolSettingList from './molecules/MolSettingList';
import AtomSettingLabel from './atoms/AtomSettingLabel';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackPramList } from '../types';
import { useRootSelector } from '../redux/store/store';

type Props = {
  navigation: StackNavigationProp<StackPramList, 'settingMemoScreen'>;
};

const SettingMemoScreen: FC<Props> = ({ navigation }) => {
  const selectMemoTemplateData = useRootSelector(
    (state) => state.common.selectMemoTemplateData
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: COLORS.WHITE, flex: 1 }}>
        <MolHeader style={styles.header} type={'default'}>
          <AtomSettingRegister
            navigation={navigation}
            title={'メモのテンプレート'}
            isRightText={'追加'}
            isRightButton={true}
          />
        </MolHeader>

        <View>
          <AtomSettingLabel text={'選択中のテンプレート'} />
          <MolSettingList
            onPress={() =>
              navigation.navigate('settingDetailScreen', {
                data: selectMemoTemplateData,
              })
            }
            text={'テンプレートなし'}
          />
          <AtomSettingLabel text={'テンプレート一覧'} />
          {selectMemoTemplateData.data.map((memo, index) => {
            return (
              <MolSettingList
                key={index}
                onPress={() =>
                  navigation.navigate('memoTemplateUpdateScreen', {
                    data: memo,
                  })
                }
                text={memo.label}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default SettingMemoScreen;

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
