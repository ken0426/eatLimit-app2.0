import React, { FC } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackPramList } from '../../types';
import { color } from '../../styles';

type Props = {
  navigation: StackNavigationProp<StackPramList, 'registerScreen'>;
};

const AtomRegister: FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={{ width: '33%' }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons
          name='chevron-back'
          size={20}
          color={color.textWhite}
          style={{ right: 1, padding: 2 }}
        />
      </TouchableOpacity>
      <View style={{ width: '33%' }}>
        <Text style={styles.headerText}>登録画面</Text>
      </View>
      <TouchableOpacity style={{ width: '33%', alignItems: 'flex-end' }}>
        <AntDesign name='plus' size={20} color={color.textWhite} />
      </TouchableOpacity>
    </View>
  );
};

export default AtomRegister;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: color.textWhite,
  },
});
