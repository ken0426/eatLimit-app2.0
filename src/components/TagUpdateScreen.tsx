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
import { useRootDispatch, useRootSelector } from '../redux/store/store';
import { setTagList } from '../redux/slices/commonSlice';
import { auth } from '../firebase';
import { saveTagOrder } from '../api';

const TagUpdateScreen = () => {
  const dispatch = useRootDispatch();
  const tagList = useRootSelector((state) => state.common.tagList);
  const tagsOrderId = useRootSelector((state) => state.common.tagsOrderId);
  const [listData, setListData] = useState([...tagList]);
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const onSortPress = async (type: 'up' | 'down') => {
    if (auth.currentUser === null) return;
    const copyListData = [...listData];
    const sortListData = copyListData.sort((a, b) => {
      if (a.name < b.name) {
        return type === 'up' ? -1 : 1;
      } else {
        return type === 'up' ? 1 : -1;
      }
    });

    // タグの並び順を保存
    await saveTagOrder(sortListData, auth.currentUser.uid, tagsOrderId);
    setListData(sortListData);
    dispatch(setTagList(sortListData));
    closeMenu();
  };

  const meuItem: Menuitem[] = [
    {
      type: 'fontAwesome5',
      name: 'sort-alpha-down',
      size: 18,
      color: COLORS.BLACK,
      text: '昇順',
      onPress: () => onSortPress('up'),
    },
    {
      type: 'fontAwesome5',
      name: 'sort-alpha-down-alt',
      size: 18,
      color: COLORS.BLACK,
      text: '降順',
      onPress: () => onSortPress('down'),
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

        <MolDragList listData={listData} setListData={setListData} />
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
