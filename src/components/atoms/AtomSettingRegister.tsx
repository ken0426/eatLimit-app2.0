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
        style={{ width: '33%' }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name='chevron-back' size={24} color='black' />
      </TouchableOpacity>
      <View style={{ width: '33%' }}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {}}
        style={{ width: '33%', alignItems: 'flex-end' }}
      >
        <Text style={{ fontSize: FONTSIZE.SIZE20PX, fontWeight: 'bold' }}>
          完了
        </Text>
      </TouchableOpacity>
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
    fontSize: FONTSIZE.SIZE24PX,
    fontWeight: 'bold',
    color: COLORS.MAIN_TEXT_COLOR,
  },
});
