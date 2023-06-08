import React, { FC } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import MolHeader from './molecules/MolHeader';
import AtomRegister from './atoms/AtomRegister';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackPramList } from '../types';
import { SIZE, color } from '../styles';

type Props = {
  navigation: StackNavigationProp<StackPramList, 'updateRegisterScreen'>;
};

const UpdateRegisterScreen: FC<Props> = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
      <MolHeader style={styles.header} type={'default'}>
        <AtomRegister
          onPress={() => Alert.alert('変更準備中')}
          navigation={navigation}
          title={'変更'}
        />
      </MolHeader>
    </View>
  );
};

export default UpdateRegisterScreen;

const styles = StyleSheet.create({
  header: {
    height: SIZE.BASE_HP * 12,
    paddingHorizontal: SIZE.BASE_WP * 5,
    paddingTop: SIZE.BASE_HP * 4,
    backgroundColor: color.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 2,
  },
});
