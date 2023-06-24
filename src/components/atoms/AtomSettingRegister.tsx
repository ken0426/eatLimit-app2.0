import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTSIZE } from '../../styles';

type Props = {
  navigation: any;
  title: string;
};

const AtomSettingRegister: FC<Props> = ({ navigation, title }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={{ width: '20%' }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name='chevron-back' size={24} color='black' />
      </TouchableOpacity>
      <View style={{ width: '60%' }}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <View style={{ width: '20%', alignItems: 'flex-end' }}></View>
    </View>
  );
};

export default AtomSettingRegister;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    textAlign: 'center',
    fontSize: FONTSIZE.SIZE20PX,
    fontWeight: 'bold',
    color: COLORS.MAIN_TEXT_COLOR,
  },
});
