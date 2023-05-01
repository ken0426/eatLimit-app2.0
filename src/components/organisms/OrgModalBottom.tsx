import React, { FC, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import MolModalHeader from '../molecules/MolModalHeader';
import Modal from 'react-native-modal';

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
      style={{ justifyContent: 'flex-end', margin: 0 }}
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
  modal: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: '30%',
    // paddingTop: 10,
    // paddingHorizontal: 10,
  },
});
