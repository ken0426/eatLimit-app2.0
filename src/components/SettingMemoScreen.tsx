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
import { COLORS, FONTSIZE, SIZE } from '../styles';
import { MaterialIcons } from '@expo/vector-icons';
import { settingMemoData } from '../contents';

type Props = {
  navigation: any;
};

const SettingMemoScreen: FC<Props> = ({ navigation }) => {
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
          <View style={styles.headline}>
            <Text style={styles.text}>選択中のテンプレート</Text>
          </View>
          <TouchableOpacity
            style={styles.touch}
            onPress={() =>
              navigation.navigate('settingDetailScreen', {
                data: [], // 現状アプリは落ちるが仮実装
              })
            }
          >
            <Text style={styles.text}>テンプレートなし</Text>
            <MaterialIcons
              name='navigate-next'
              size={26}
              color={COLORS.TEXT_COLOR}
            />
          </TouchableOpacity>
          <View style={styles.headline}>
            <Text style={styles.text}>テンプレート一覧</Text>
          </View>
          {settingMemoData.map((memo) => {
            return (
              <TouchableOpacity
                style={styles.touch}
                onPress={() =>
                  navigation.navigate('memoTemplateUpdateScreen', {
                    data: memo,
                  })
                }
              >
                <Text style={styles.text}>{memo.label}</Text>
                <MaterialIcons
                  name='navigate-next'
                  size={26}
                  color={COLORS.TEXT_COLOR}
                />
              </TouchableOpacity>
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
  headline: {
    width: '100%',
    backgroundColor: COLORS.SETTING_LABEL,
    height: SIZE.BASE_HP * 4,
    justifyContent: 'center',
    paddingHorizontal: SIZE.BASE_WP * 2,
  },
  item: {
    width: '100%',
    backgroundColor: COLORS.WHITE,
    height: SIZE.BASE_HP * 6.5,
    borderBottomColor: COLORS.DETAIL_BORDER,
    borderBottomWidth: 0.2,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZE.BASE_WP * 2,
    flexDirection: 'row',
  },
  text: {
    fontSize: FONTSIZE.SIZE18PX,
  },
  touch: {
    width: '100%',
    backgroundColor: COLORS.WHITE,
    height: SIZE.BASE_HP * 6.5,
    borderBottomColor: COLORS.DETAIL_BORDER,
    borderBottomWidth: 0.2,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZE.BASE_WP * 2,
    flexDirection: 'row',
  },
});
