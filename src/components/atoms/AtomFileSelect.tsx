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
import { useActionSheet } from '@expo/react-native-action-sheet';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FONTSIZE, SIZE, color } from '../../styles';
import OrgModalDefault from '../organisms/OrgModalDefault';
import { onPressAction } from '../../functions';
import { WINDOW_WIDTH } from '../../utils';
import { SINGLE_MODAL_BUTTON } from '../../contents';

const AtomFileSelect = () => {
  const { showActionSheetWithOptions } = useActionSheet();
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
  const isImage = useMemo(() => image !== '', [image]);

  return (
    <View style={styles.fileSelectArea}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          Keyboard.dismiss();
          onPressAction(
            isImage,
            hasPermission,
            setImage,
            showActionSheetWithOptions
          );
        }}
      >
        {image === '' && (
          <Text style={styles.fileSelectText}>画像を追加する</Text>
        )}
        {image !== '' && (
          <View style={styles.imageArea}>
            <Image source={{ uri: image }} style={styles.image} />
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setImage('')}
              style={styles.closeButton}
            >
              <FontAwesome name='close' size={13} color='#ffffff' />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
      {image === '' && (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.hint}
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
        message={`画像を追加することができます。\n画像を追加できない場合はアプリへの画像の権限を許可してください。`}
        data={SINGLE_MODAL_BUTTON}
      />
    </View>
  );
};

export default AtomFileSelect;

const styles = StyleSheet.create({
  fileSelectArea: {
    width: WINDOW_WIDTH,
    minHeight: SIZE.BASE_HP * 12,
    maxHeight: SIZE.BASE_HP * 24,
    borderBottomColor: color.detailBorderColor,
    borderBottomWidth: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  fileSelectText: {
    fontSize: FONTSIZE.SIZE18PX,
    color: color.blue,
    paddingRight: SIZE.BASE_WP * 1.3,
    fontWeight: 'bold',
  },
  imageArea: {
    height: '90%',
  },
  image: {
    height: '100%',
    width: WINDOW_WIDTH * 0.8,
  },
  closeButton: {
    position: 'absolute',
    top: SIZE.BASE_WP * 2.8,
    right: SIZE.BASE_WP * 2.8,
    backgroundColor: '#000000',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 26,
    height: 26,
  },
  hint: {
    position: 'absolute',
    right: '30%',
  },
});
