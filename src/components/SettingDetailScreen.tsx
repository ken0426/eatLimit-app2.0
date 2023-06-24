import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MolHeader from './molecules/MolHeader';
import AtomSettingRegister from './atoms/AtomSettingRegister';
import { COLORS, FONTSIZE, SIZE } from '../styles';

type Props = {
  navigation: any;
};

const SettingDetailScreen: FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: COLORS.WHITE, flex: 1 }}>
        <MolHeader style={styles.header} type={'default'}>
          <AtomSettingRegister navigation={navigation} title={'設定'} />
        </MolHeader>

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
          <Text style={{ fontSize: FONTSIZE.SIZE18PX }}>画像表示</Text>
        </TouchableOpacity>
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
