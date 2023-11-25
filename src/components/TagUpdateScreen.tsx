import React from 'react';
import { StyleSheet, View } from 'react-native';
import AtomSettingRegister from './atoms/AtomSettingRegister';
import MolHeader from './molecules/MolHeader';
import { HEADER_TYPE, LABEL } from '../contents';
import { COLORS, SIZE } from '../styles';
import MolDragList from './molecules/MolDragList';

const TagUpdateScreen = () => {
  return (
    <View style={styles.contents}>
      <MolHeader style={styles.header} type={HEADER_TYPE.DEFAULT}>
        <AtomSettingRegister title={LABEL.TAG_EDIT} />
      </MolHeader>

      <MolDragList />
    </View>
  );
};

export default TagUpdateScreen;

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
