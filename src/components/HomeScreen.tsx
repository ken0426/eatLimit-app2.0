import React, { FC } from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { ApiData, StackPramList } from '../types';
import MolHeader from './molecules/MolHeader';
import { color } from '../styles';
import { data, noImage } from '../moc';
import AtomHome from './atoms/AtomHome';

type Props = {
  navigation: StackNavigationProp<StackPramList, 'homeScreen'>;
};

const HomeScreen: FC<Props> = ({ navigation }) => {
  const renderItem: ListRenderItem<ApiData> = ({ item, index }) => (
    <View key={Number(index)} style={{ backgroundColor: '#ffffff' }}>
      <TouchableOpacity
        style={[styles.contents, index === 0 && { borderTopWidth: 0.3 }]}
        onPress={() => {
          navigation.navigate('detailScreen', { item });
        }}
      >
        <View style={styles.imageArea}>
          <Image
            style={{ width: '90%', height: '90%' }}
            source={{ uri: item.image ?? noImage }}
          />
        </View>
        <View style={styles.textArea}>
          <Text style={styles.eatName}>{item.eatName}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <View style={styles.arrow}>
          <MaterialIcons
            name='keyboard-arrow-right'
            size={24}
            color={color.textColor}
          />
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <MolHeader
        style={{
          height: 100,
          paddingHorizontal: 20,
          paddingTop: 30,
          backgroundColor: color.mainColor,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}
        type={'default'}
      >
        <AtomHome navigation={navigation} />
      </MolHeader>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  contents: {
    height: 90,
    borderBottomWidth: 0.3,
    borderColor: color.borderLine,
    flexDirection: 'row',
  },
  imageArea: {
    width: 130,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateArea: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.mainColor,
  },
  iconArea: {
    position: 'absolute',
    right: 10,
  },
  textArea: {
    justifyContent: 'space-around',
    marginVertical: 4,
  },
  arrow: {
    height: '100%',
    width: 30,
    right: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eatName: {
    fontSize: 20,
  },
  date: {
    fontSize: 15,
  },
});
