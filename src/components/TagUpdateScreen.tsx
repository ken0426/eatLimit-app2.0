import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AtomSettingRegister from './atoms/AtomSettingRegister';
import MolHeader from './molecules/MolHeader';
import { HEADER_TYPE, LABEL } from '../contents';
import { COLORS, SIZE } from '../styles';
import MolDragList from './molecules/MolDragList';
import MolMenu from './molecules/MolMenu';
import { Menuitem } from '../types';

const TagUpdateScreen = () => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const meuItem: Menuitem[] = [
    {
      type: 'fontAwesome5',
      name: 'sort-alpha-down',
      size: 18,
      color: COLORS.BLACK,
      text: '昇順',
      onPress: closeMenu,
    },
    {
      type: 'fontAwesome5',
      name: 'sort-alpha-down-alt',
      size: 18,
      color: COLORS.BLACK,
      text: '降順',
      onPress: closeMenu,
    },
  ];

  return (
    <PaperProvider>
      <View style={styles.contents}>
        <MolHeader style={styles.header} type={HEADER_TYPE.DEFAULT}>
          <AtomSettingRegister
            title={LABEL.TAG_EDIT}
            imageType={'ellipsis'}
            onRightPress={openMenu}
          />
        </MolHeader>

        <MolDragList />
      </View>

      <View style={styles.menuWrapper}>
        <MolMenu
          visible={visible}
          closeMenu={closeMenu}
          x={'100%'}
          y={'23%'}
          menuItem={meuItem}
        />
      </View>
    </PaperProvider>
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
  menuWrapper: {
    flexDirection: 'column',
  },
});
