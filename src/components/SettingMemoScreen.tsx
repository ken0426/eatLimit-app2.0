import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import MolHeader from './molecules/MolHeader';
import AtomSettingRegister from './atoms/AtomSettingRegister';
import { COLORS, SIZE, STYLE_FLEX } from '../styles';
import MolSettingList from './molecules/MolSettingList';
import AtomSettingLabel from './atoms/AtomSettingLabel';
import { StackPramList } from '../types';
import { useRootSelector } from '../redux/store/store';
import { HEADER_TYPE } from '../contents';

const SettingMemoScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<StackPramList, 'settingMemoScreen'>>();
  const selectMemoTemplate = useRootSelector(
    (state) => state.common.selectMemoTemplate
  );
  const templateMemoData = useRootSelector(
    (state) => state.memo.templateMemoData
  );

  const [memoData, setMemoData] = useState<
    { label: string; text: string; id: string }[]
  >([...templateMemoData]);

  useEffect(() => {
    setMemoData([...templateMemoData]);
  }, [templateMemoData]);

  return (
    <View style={STYLE_FLEX}>
      <View style={styles.contents}>
        <MolHeader style={styles.header} type={HEADER_TYPE.DEFAULT}>
          <AtomSettingRegister
            title={'メモのテンプレート'}
            isRightText={'追加'}
            isRightButton={true}
            onRightPress={() => {
              navigation.navigate('memoTemplateRegisterScreen', {
                data: [
                  {
                    label: '',
                    text: '',
                  },
                ],
              });
            }}
          />
        </MolHeader>

        <View>
          <AtomSettingLabel text={'選択中のテンプレート'} />
          <MolSettingList
            onPress={() =>
              navigation.navigate('settingDetailScreen', {
                data: {
                  isTemplate: true,
                  data: memoData,
                },
              })
            }
            text={
              selectMemoTemplate.text
                ? selectMemoTemplate.text
                : 'テンプレートなし'
            }
          />
          <AtomSettingLabel text={'テンプレート一覧'} />
          {memoData.map((memo, index) => {
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
});
