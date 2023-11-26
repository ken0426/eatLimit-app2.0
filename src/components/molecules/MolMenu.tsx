import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Menu } from 'react-native-paper';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { COLORS } from '../../styles';
import AtomMenuItem from '../atoms/AtomMenuItem';
import { Menuitem } from '../../types';

type Props = {
  visible: boolean;
  closeMenu: () => void;
  x: string;
  y: string;
  menuItem: Menuitem[];
};

const MolMenu: FC<Props> = ({ visible, closeMenu, x, y, menuItem }) => {
  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={{ x: wp(x), y: wp(y) }}
      contentStyle={styles.menuStyle}
    >
      {menuItem.map((item) => (
        <Menu.Item
          key={item.text}
          onPress={item.onPress}
          title={
            <AtomMenuItem
              text={item.text}
              type={item.type}
              name={item.name}
              size={item.size}
              color={item.color}
            />
          }
        />
      ))}
    </Menu>
  );
};

export default MolMenu;

const styles = StyleSheet.create({
  menuStyle: {
    backgroundColor: COLORS.WHITE,
  },
});
