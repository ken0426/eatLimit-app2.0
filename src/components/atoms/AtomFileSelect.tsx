import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Camera } from 'expo-camera';
import { AntDesign } from '@expo/vector-icons';
import { color } from '../../styles';
import OrgModalDefault from '../organisms/OrgModalDefault';
import { onPressAction } from '../../functions';
import { WINDOW_WIDTH } from '../../utils';

const AtomFileSelect = () => {
  const [isVisible, setIsVisible] = useState(false);

  /** アプリがカメラへのアクセス権限を求めるためのフラグ */
  const [hasPermission, setHasPermission] = useState(false);

  /** 画像があるかどうか判定するフラグ */
  const [image, setImage] = useState('');

  /** 初めてこの画面を開いた際にカメラへのアクセス権限を聞くロジック */
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  /** 画像が挿入されているかどうかを判断するフラグ */
  const isImage = useMemo(() => image === '' ? false : true, [image])

  return (
    <View style={styles.fileSelectArea}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          Keyboard.dismiss();
          onPressAction(isImage, hasPermission, setImage);
        }}
      >
        {image === '' && (
          <Text style={styles.fileSelectText}>画像を追加する</Text>
        )}
        {image !== '' && (
          <Image
            source={{ uri: image }}
            style={{ height: '90%', width: WINDOW_WIDTH * 0.8 }}
          />
        )}
      </TouchableOpacity>
      {image === '' && (
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
      )}
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
    width: WINDOW_WIDTH,
    minHeight: 100,
    maxHeight: 200,
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
