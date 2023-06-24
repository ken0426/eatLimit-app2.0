import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONTSIZE, SIZE } from '../styles';
import MolHeader from './molecules/MolHeader';
import AtomSettingRegister from './atoms/AtomSettingRegister';

type Props = {
  navigation: any;
};

const SettingScreen: FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: COLORS.WHITE, flex: 1 }}>
        <MolHeader style={styles.header} type={'default'}>
          <AtomSettingRegister navigation={navigation} title={'設定'} />
        </MolHeader>

        <View
          style={{
            width: '100%',
            backgroundColor: COLORS.SETTING_LABEL,
            height: SIZE.BASE_HP * 4,
            justifyContent: 'center',
            paddingHorizontal: SIZE.BASE_WP * 2,
          }}
        >
          <Text style={{ fontSize: FONTSIZE.SIZE18PX }}>一覧リスト</Text>
        </View>
        <TouchableOpacity
          style={{
            width: '100%',
            backgroundColor: COLORS.WHITE,
            height: SIZE.BASE_HP * 5.5,
            borderBottomColor: COLORS.DETAIL_BORDER,
            borderBottomWidth: 0.2,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: SIZE.BASE_WP * 2,
            flexDirection: 'row',
          }}
          onPress={() => navigation.navigate('settingDetailScreen')}
        >
          <Text style={{ fontSize: FONTSIZE.SIZE18PX }}>画像表示</Text>
          <MaterialIcons
            name='navigate-next'
            size={26}
            color={COLORS.TEXT_COLOR}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '100%',
            backgroundColor: COLORS.WHITE,
            height: SIZE.BASE_HP * 5.5,
            borderBottomColor: COLORS.DETAIL_BORDER,
            borderBottomWidth: 0.2,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: SIZE.BASE_WP * 2,
            flexDirection: 'row',
          }}
          onPress={() => {}}
        >
          <Text style={{ fontSize: FONTSIZE.SIZE18PX }}>年月日の表示</Text>
          <MaterialIcons
            name='navigate-next'
            size={26}
            color={COLORS.TEXT_COLOR}
          />
        </TouchableOpacity>
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
