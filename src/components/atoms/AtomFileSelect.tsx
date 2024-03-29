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
import { COLORS, FONTSIZE, SIZE } from '../../styles';
import OrgModalDefault from '../organisms/OrgModalDefault';
import { onPressAction } from '../../functions';
import { WINDOW_WIDTH } from '../../utils';
import { useRootSelector } from '../../redux/store/store';
import { ModalButton, PostData } from '../../types';
import { LABEL_NAME } from '../../contents';
import SvgIcon from '../../images/SvgIcon';

type Props = {
  setData: ({ key, value }: PostData) => void;
};

const AtomFileSelect: FC<Props> = ({ setData }) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const updateRegisterData = useRootSelector(
    (state) => state.commonRegister.updateRegisterData
  );
  const imageText = updateRegisterData.image;
  const [isVisible, setIsVisible] = useState(false);
  /** アプリがカメラへのアクセス権限を求めるためのフラグ */
  const [hasPermission, setHasPermission] = useState(false);
  /** 画像があるかどうか判定するフラグ */
  const [image, setImage] = useState(imageText ?? '');

  const SINGLE_MODAL_BUTTON: ModalButton[] = [
    { text: '閉じる', onPress: () => setIsVisible(false) },
  ];

  /** 初めてこの画面を開いた際にカメラへのアクセス権限を聞くロジック */
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  /** 画像が挿入されているかどうかを判断するフラグ */
  const isImage = useMemo(() => image !== '', [image]);

  useEffect(() => {
    setData({ key: LABEL_NAME.IMAGE, value: image, isRequired: false });
  }, [image]);

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
            <Image
              resizeMode='cover'
              source={{ uri: image }}
              style={styles.image}
            />
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setImage('')}
              style={styles.closeButton}
            >
              <SvgIcon
                type={'fontAwesome'}
                name='close'
                size={13}
                color={COLORS.WHITE}
              />
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
          <SvgIcon
            type={'antDesign'}
            name='infocirlceo'
            size={17}
            color={COLORS.DETAIL_BORDER}
          />
        </TouchableOpacity>
      )}
      <OrgModalDefault
        isVisible={isVisible}
        cancelOnPress={() => setIsVisible(false)}
        message={`画像を追加することができます。\n画像を追加できない場合はアプリへの画像の権限を許可してください。`}
        data={SINGLE_MODAL_BUTTON}
      />
    </View>
  );
};

export default AtomFileSelect;

const styles = StyleSheet.create({
  fileSelectArea: {
    minHeight: SIZE.BASE_WP * 30,
    maxHeight: SIZE.BASE_WP * 54,
    borderBottomColor: COLORS.DETAIL_BORDER,
    borderBottomWidth: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  fileSelectText: {
    fontSize: FONTSIZE.SIZE18PX,
    color: COLORS.BLUE,
    paddingRight: SIZE.BASE_WP * 1.3,
    fontWeight: 'bold',
  },
  imageArea: {
    height: '90%',
  },
  image: {
    width: SIZE.BASE_WP * 60,
    flex: 1,
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
