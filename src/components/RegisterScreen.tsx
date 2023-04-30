import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackPramList } from '../types';
import MolHeader from './molecules/MolHeader';
import { color } from '../styles';
import AtomRegister from './atoms/AtomRegister';
import AtomFileSelect from './atoms/AtomFileSelect';
import AtomSingleSelect from './atoms/AtomSingleSelect';
import AtomSingleInput from './atoms/AtomSingleInput';
import Modal from 'react-native-modal';

type Props = {
  navigation: StackNavigationProp<StackPramList, 'registerScreen'>;
};

const RegisterScreen: FC<Props> = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <View style={{ backgroundColor: '#ffffff' }}>
      <MolHeader style={styles.header} type={'default'}>
        <AtomRegister navigation={navigation} />
      </MolHeader>

      <View style={{ width: '100%', height: '100%' }}>
        <AtomFileSelect />
        <View style={styles.inputForm}>
          <AtomSingleInput label={'商品名'} />
          <AtomSingleSelect
            label={'保存方法'}
            onPress={() => navigation.navigate('singleSelectScreen')}
          />
          <AtomSingleSelect
            label={'消費期限'}
            onPress={() => setIsVisible(true)}
          />
        </View>
      </View>
      <Modal
        animationIn={'slideInUp'}
        isVisible={isVisible}
        backdropOpacity={0.2}
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <View
          style={{
            backgroundColor: '#ffffff',
            width: '100%',
            height: '30%',
            paddingTop: 10,
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity onPress={() => setIsVisible(false)}>
              <Text
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  fontSize: 20,
                  color: color.mainTextColor,
                }}
              >
                キャンセル
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsVisible(false)}>
              <Text
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  fontSize: 20,
                  color: color.blue,
                }}
              >
                完了
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RegisterScreen;

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
  inputForm: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
