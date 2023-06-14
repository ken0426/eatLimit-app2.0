import React, { FC } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackPramList } from '../../types';
import { COLORS, FONTSIZE } from '../../styles';

type Props = {
  navigation:
    | StackNavigationProp<StackPramList, 'registerScreen'>
    | StackNavigationProp<StackPramList, 'updateRegisterScreen'>;
  onPress: () => void;
  title: string;
};

const AtomRegister: FC<Props> = ({ navigation, onPress, title }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={{ width: '33%' }}
        onPress={() => navigation.goBack()}
      >
        <AntDesign
          name='close'
          size={24}
          color={COLORS.mainTextColor}
          style={{ right: 1, padding: 2 }}
        />
      </TouchableOpacity>
      <View style={{ width: '33%' }}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <TouchableOpacity
        onPress={onPress}
        style={{ width: '33%', alignItems: 'flex-end' }}
      >
        <FontAwesome
          name='pencil-square-o'
          size={24}
          color={COLORS.mainTextColor}
        />
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
    fontSize: FONTSIZE.SIZE24PX,
    fontWeight: 'bold',
    color: COLORS.mainTextColor,
  },
});
