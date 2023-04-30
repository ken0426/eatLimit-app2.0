import React, { FC } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
        <AntDesign
          name='close'
          size={24}
          color={color.textWhite}
          style={{ right: 1, padding: 2 }}
        />
      </TouchableOpacity>
      <View style={{ width: '33%' }}>
        <Text style={styles.headerText}>登録画面</Text>
      </View>
      <TouchableOpacity
        onPress={() => Alert.alert('登録ボタン準備中')}
        style={{ width: '33%', alignItems: 'flex-end' }}
      >
        <FontAwesome name='pencil-square-o' size={24} color={color.textWhite} />
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
