import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { color } from '../../styles';

const AtomFileSelect = () => {
  return (
    <View style={styles.fileSelectArea}>
      <Text
        onPress={() => Alert.alert('ファイルを選択するボタン')}
        style={styles.fileSelectText}
      >
        ファイルを選択
      </Text>
      <TouchableOpacity onPress={() => Alert.alert('ヒントのボタン')}>
        <AntDesign
          name='infocirlceo'
          size={17}
          color={color.detailBorderColor}
          style={{ paddingLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AtomFileSelect;

const styles = StyleSheet.create({
  fileSelectArea: {
    width: '100%',
    height: 100,
    borderBottomColor: color.detailBorderColor,
    borderBottomWidth: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  fileSelectText: {
    fontSize: 15,
    color: '#44d2d4',
    paddingRight: 5,
  },
});
