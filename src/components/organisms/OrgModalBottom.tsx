import React, { FC, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import MolModalHeader from '../molecules/MolModalHeader';
import Modal from 'react-native-modal';
import { WINDOW_HEIGHT } from '../../utils';
import { COLORS } from '../../styles';

type Props = {
  isVisible: boolean;
  children: ReactNode;
  cancelOnPress: () => void;
  completedOnPress: () => void;
};

const OrgModalBottom: FC<Props> = ({
  isVisible,
  children,
  cancelOnPress,
  completedOnPress,
}) => {
  return (
    <Modal
      animationIn={'slideInUp'}
      isVisible={isVisible}
      backdropOpacity={0}
      style={styles.contents}
      onBackdropPress={cancelOnPress}
    >
      <View style={styles.modal}>
        <MolModalHeader
          cancelOnPress={cancelOnPress}
          completedOnPress={completedOnPress}
        />
        {children}
      </View>
    </Modal>
  );
};

export default OrgModalBottom;

const styles = StyleSheet.create({
  contents: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modal: {
    backgroundColor: COLORS.WHITE,
    width: '100%',
    height: WINDOW_HEIGHT / 3.2,
  },
});
