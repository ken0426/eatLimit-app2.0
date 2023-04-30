import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackPramList } from '../types';
import MolHeader from './molecules/MolHeader';
import { color } from '../styles';

type Props = {
  navigation: StackNavigationProp<StackPramList, 'singleSelectScreen'>;
};

const SingleSelectScreen: FC<Props> = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: '#ffffff' }}>
      <MolHeader style={styles.header} type={'default'}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{ position: 'absolute', left: 0 }}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.goBack}>戻る</Text>
          </TouchableOpacity>
          <Text style={styles.title}>保存方法</Text>
        </View>
      </MolHeader>
    </View>
  );
};

export default SingleSelectScreen;

const styles = StyleSheet.create({
  header: {
    height: 100,
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: color.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  goBack: {
    fontSize: 24,
    fontWeight: 'bold',
    color: color.blue,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: color.mainTextColor,
  },
});
