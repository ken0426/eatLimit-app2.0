import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { DatePicker } from 'react-native-woodpicker';
import React, { FC, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackPramList } from '../types';
import MolHeader from './molecules/MolHeader';
import { color } from '../styles';
import AtomRegister from './atoms/AtomRegister';
import AtomFileSelect from './atoms/AtomFileSelect';
import AtomSingleSelect from './atoms/AtomSingleSelect';
import AtomSingleInput from './atoms/AtomSingleInput';
import OrgModalBottom from './organisms/OrgModalBottom';

type Props = {
  navigation: StackNavigationProp<StackPramList, 'registerScreen'>;
};

const RegisterScreen: FC<Props> = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [pickedDate, setPickedDate] = useState<Date>(new Date());
  const handleText = () => {
    if (pickedDate) {
      const year = pickedDate.getFullYear();
      const month = pickedDate.getMonth() + 1;
      const date = pickedDate.getDate();
      return `${year}年${month}月${date}日`;
    } else {
      return '';
    }
  };
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
            label={'管理方法'}
            onPress={() => setIsVisible(true)}
          />
          <View
            style={{
              flexDirection: 'row',
              height: 45,
              alignItems: 'center',
              borderBottomWidth: 0.3,
              borderBottomColor: color.detailBorderColor,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: color.textLabel,
                fontWeight: '400',
              }}
            >
              日付：
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
            >
              <DatePicker
                textColor='#000000'
                value={pickedDate}
                doneButtonLabel={'完了'}
                text={handleText()}
                iosDisplay='spinner'
                androidDisplay='spinner'
                onDateChange={(e) => {
                  if (e) {
                    setPickedDate(e);
                  }
                }}
                style={{
                  height: '100%',
                  shadowColor: '#000000',
                }}
                backdropAnimation={{ opacity: 0, duration: 0.3, delay: 1 }}
              />
              <View
                style={{
                  height: '100%',
                  justifyContent: 'center',
                }}
              >
                <MaterialIcons
                  name='keyboard-arrow-down'
                  size={20}
                  color={color.textColor}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <OrgModalBottom
        isVisible={isVisible}
        cancelOnPress={() => setIsVisible(false)}
        completedOnPress={() => setIsVisible(false)}
      >
        <View></View>
      </OrgModalBottom>
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
