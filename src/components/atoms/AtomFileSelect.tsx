import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { color } from '../../styles';
import OrgModalDefault from '../organisms/OrgModalDefault';

const AtomFileSelect = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.fileSelectArea}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          Keyboard.dismiss();
          Alert.alert('ファイルを選択するボタン');
        }}
      >
        <Text style={styles.fileSelectText}>画像を追加する</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={{ position: 'absolute', right: '30%' }}
        onPress={() => setIsVisible(true)}
      >
        <AntDesign
          name='infocirlceo'
          size={17}
          color={color.detailBorderColor}
        />
      </TouchableOpacity>
      <OrgModalDefault
        isVisible={isVisible}
        cancelOnPress={() => setIsVisible(false)}
        onPress={() => setIsVisible(false)}
        text={`画像を追加することができます。\n画像を追加できない場合はアプリへの画像の権限を許可してください。`}
        label={'閉じる'}
      />
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
    fontSize: 18,
    color: color.blue,
    paddingRight: 5,
    fontWeight: 'bold',
  },
});
