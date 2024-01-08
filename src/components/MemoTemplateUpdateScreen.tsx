import React, { FC, useState } from 'react';
import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { InputAccessoryView, Platform } from 'react-native';
import { COLORS, FONTSIZE, SIZE } from '../styles';
import { MemoTemplateData, StackPramList } from '../types';
import AtomSettingRegister from './atoms/AtomSettingRegister';
import MolHeader from './molecules/MolHeader';
import { BUTTON_TEXT, HEADER_TYPE } from '../contents';
import AtomMemoLabel from './atoms/AtomMemoLabel';
import { useRootDispatch, useRootSelector } from '../redux/store/store';
import { saveSelectTemplate, saveTemplate } from '../api';
import { auth } from '../firebase';
import { setSelectMemoTemplate } from '../redux/slices/commonSlice';
import AtomButton from './atoms/AtomButton';
import OrgModalDefault from './organisms/OrgModalDefault';

type RouteItem = {
  params: {
    data: MemoTemplateData;
  };
};

type Props = {
  route: RouteProp<StackPramList, 'memoTemplateUpdateScreen'> & RouteItem;
};

const MemoTemplateUpdateScreen: FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useRootDispatch();
  const { data } = route.params;
  const inputAccessoryViewID = 'uniqueID';
  const saveTemplateMemoId = useRootSelector(
    (state) => state.memo.saveTemplateMemoId
  );
  const templateMemoData = useRootSelector(
    (state) => state.memo.templateMemoData
  );
  const selectMemoTemplate = useRootSelector(
    (state) => state.common.selectMemoTemplate
  );
  const selectedTemplateId = useRootSelector(
    (state) => state.memo.selectedTemplateId
  );
  const [text, setText] = useState(data.text);
  const [labelText, setLabelText] = useState(data.label);
  const [isVisible, setIsVisible] = useState(false);

  const buttonData = [
    {
      text: BUTTON_TEXT.CANCEL,
      onPress: () => setIsVisible(false),
    },
    {
      text: BUTTON_TEXT.OK,
      onPress: async () => {
        const memoFilterData = templateMemoData.filter(
          (item) => item.id !== data.id
        );
        await saveTemplate(
          memoFilterData,
          auth.currentUser!.uid,
          saveTemplateMemoId
        );
        if (selectMemoTemplate.id === data.id) {
          dispatch(
            setSelectMemoTemplate({
              text: 'テンプレートなし',
              check: false,
              id: '0',
            })
          );
        }
        if (!memoFilterData.length) {
          await saveSelectTemplate(
            { text: 'テンプレートなし', id: '0', check: true },
            auth.currentUser!.uid,
            selectedTemplateId
          );
        }
        navigation.goBack();
      },
    },
  ];

  return (
    <View style={styles.contents}>
      <MolHeader style={styles.header} type={HEADER_TYPE.DEFAULT}>
        <AtomSettingRegister
          title={'テンプレート編集'}
          isRightButton={true}
          onRightPress={async () => {
            try {
              const memoTemplateDataEdit = [...templateMemoData];
              const templateMemoIndex = memoTemplateDataEdit.findIndex(
                (item) => item.id === data.id
              );
              memoTemplateDataEdit.splice(templateMemoIndex, 1, {
                label: labelText,
                id: data.id,
                text: text,
              });

              await saveTemplate(
                memoTemplateDataEdit,
                auth.currentUser!.uid,
                saveTemplateMemoId
              );
              if (selectMemoTemplate.id === data.id) {
                dispatch(
                  setSelectMemoTemplate({
                    text: labelText,
                    check: false,
                    id: data.id,
                  })
                );
              }
              navigation.goBack();
            } catch (error) {
              throw error;
            }
          }}
        />
      </MolHeader>

      <View style={styles.inputArea}>
        <AtomMemoLabel
          labelText={labelText}
          setLabelText={(e) => setLabelText(e)}
        />
      </View>
      <View style={styles.memoArea}>
        <TextInput
          value={text}
          onChangeText={(e) => setText(e)}
          style={styles.textInput}
          multiline
          maxLength={500}
        />
        <Text style={styles.lengthText}>{`${text.length}／500`}</Text>
      </View>
      <View style={styles.deleteButtonArea}>
        <AtomButton
          buttonText={'削除'}
          color={COLORS.WHITE}
          fontSize={FONTSIZE.SIZE25PX}
          backgroundColor={COLORS.RED}
          width={SIZE.BASE_WP * 50}
          fontWeight={'bold'}
          onPress={() => setIsVisible(true)}
        />
      </View>

      <OrgModalDefault
        isVisible={isVisible}
        cancelOnPress={() => setIsVisible(false)}
        message={'本当に削除しますか？'}
        data={buttonData}
      />

      {Platform.OS === 'ios' && (
        <InputAccessoryView nativeID={inputAccessoryViewID}>
          <View pointerEvents='box-none' style={styles.completedArea}>
            <Button title='完了' onPress={() => Keyboard.dismiss()} />
          </View>
        </InputAccessoryView>
      )}
    </View>
  );
};

export default MemoTemplateUpdateScreen;

const styles = StyleSheet.create({
  contents: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    height: SIZE.BASE_HP * 12,
    paddingHorizontal: SIZE.BASE_WP * 5,
    paddingTop: SIZE.BASE_HP * 4,
    backgroundColor: COLORS.MAIN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 2,
  },
  inputArea: {
    paddingHorizontal: 10,
  },
  memoArea: {
    margin: 10,
    borderLeftWidth: 2.5,
    borderTopWidth: 2.5,
    borderRadius: 5,
    borderColor: '#d6d6d6',
    backgroundColor: '#e9e9e9',
    height: SIZE.BASE_HP * 65,
  },
  textInput: {
    width: '100%',
    height: '100%',
    fontSize: FONTSIZE.SIZE20PX,
    color: 'black',
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
  lengthText: {
    textAlign: 'right',
    color: COLORS.TEXT_LABEL,
  },
  completedArea: {
    backgroundColor: '#f1f1f1',
    alignItems: 'flex-end',
  },
  deleteButtonArea: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
