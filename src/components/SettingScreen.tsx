import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SIZE } from '../styles';
import MolHeader from './molecules/MolHeader';
import AtomRegister from './atoms/AtomRegister';
import AtomSettingRegister from './atoms/AtomSettingRegister';

type Props = {
  navigation: any;
  route: any;
};

const SettingScreen: FC<Props> = ({ navigation, route }) => {
  const { item } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: COLORS.WHITE, flex: 1 }}>
        <MolHeader style={styles.header} type={'default'}>
          <AtomSettingRegister navigation={navigation} title={'設定'} />
        </MolHeader>

        <Text>これは設定画面です</Text>
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
