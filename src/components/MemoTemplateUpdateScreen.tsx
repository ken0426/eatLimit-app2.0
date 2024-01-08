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
import { HEADER_TYPE } from '../contents';
import AtomMemoLabel from './atoms/AtomMemoLabel';
import { useRootDispatch, useRootSelector } from '../redux/store/store';
import { saveTemplate } from '../api';
import { auth } from '../firebase';
import { setSelectMemoTemplate } from '../redux/slices/commonSlice';

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
  const [text, setText] = useState(data.text);
  const [labelText, setLabelText] = useState(data.label);

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
    height: SIZE.BASE_HP * 75,
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
});
