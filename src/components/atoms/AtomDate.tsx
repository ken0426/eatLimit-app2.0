import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DatePicker } from 'react-native-woodpicker';
import { COLORS, FONTSIZE, SIZE } from '../../styles';
import AtomRequire from './AtomRequire';
import { PostData } from '../../types';
import SvgIcon from '../../images/SvgIcon';

type Props = {
  /** 変更画面から渡ってくる日付 */
  date?: string;
  /** 必須項目の判定 */
  isRequired?: boolean;
  /** ラベル */
  label: string;
  /** 期限目安かどうか */
  isLimit?: boolean;
  /** 選択している日付をセットする関数 */
  setData: ({ key, value }: PostData) => void;
  /** エラーメッセージ */
  errorMessage: string;
  /** 期限目安の日付 */
  selectedDate?: string;
  /** 商品がコピーされた際の日付 */
  copyDate?: Date;
  /** 初期値に何日足すか */
  plusDate?: number;
  /** 「日付」項目の年月日 */
  dateData?: string;
};

const AtomDate: FC<Props> = ({
  date,
  isRequired = false,
  label,
  isLimit,
  setData,
  errorMessage,
  selectedDate,
  copyDate,
  plusDate = 10,
  dateData,
}) => {
  const dateYear = dateData ? new Date(dateData).getFullYear() : 0;
  const getDate = () => {
    if (copyDate) {
      return copyDate;
    } else {
      if (date) {
        if (isLimit && selectedDate) {
          const currentDate = new Date(selectedDate);
          new Date(
            currentDate.setFullYear(
              currentDate.getFullYear() + (dateYear - currentDate.getFullYear())
            )
          );
          return new Date(currentDate.setDate(currentDate.getDate() + 10));
        } else {
          return new Date(date);
        }
      } else if (isLimit && selectedDate) {
        const currentDate = new Date(selectedDate);
        return new Date(currentDate.setDate(currentDate.getDate() + plusDate));
      } else if (isLimit) {
        const currentDate = new Date(dateData!);
        new Date(
          currentDate.setFullYear(
            currentDate.getFullYear() + (dateYear - currentDate.getFullYear())
          )
        );
        return new Date(currentDate.setDate(currentDate.getDate() + 10));
      } else {
        return new Date();
      }
    }
  };

  const [pickedDate, setPickedDate] = useState<Date>(getDate());
  const [isCopy, setIsCopy] = useState(copyDate ? true : false);

  useEffect(() => {
    if (copyDate && !isNaN(Number(copyDate)) && isCopy) {
      setPickedDate(copyDate);
      setIsCopy(false);
    }
  }, [copyDate]);

  const handleText = () => {
    const year = pickedDate.getFullYear();
    const month = pickedDate.getMonth() + 1;
    const date = pickedDate.getDate();
    return `${year}年${month}月${date}日`;
  };

  useEffect(() => {
    const year = pickedDate.getFullYear();
    const month = pickedDate.getMonth() + 1;
    const date = pickedDate.getDate();
    const value = `${year}-${month >= 10 ? month : `0${month}`}-${
      date >= 10 ? date : `0${date}`
    }`;

    setData({
      key: label,
      value,
      isRequired,
    });
  }, [pickedDate]);

  return (
    <View style={styles.contents}>
      <View style={styles.container}>
        <View style={styles.labelArea}>
          {isRequired ? (
            <AtomRequire label={label} />
          ) : (
            <Text style={styles.label}>{label}：</Text>
          )}
        </View>

        <View style={styles.selectArea}>
          <DatePicker
            textColor='#000000'
            textInputStyle={styles.DatePickerTextInput}
            value={pickedDate}
            doneButtonLabel={'完了'}
            text={handleText()}
            iosDisplay='spinner'
            androidDisplay='spinner'
            minimumDate={new Date('2000')}
            maximumDate={new Date('2100')}
            onDateChange={(e) => e && setPickedDate(e)}
            touchableStyle={styles.touchableStyle}
            backdropAnimation={{ opacity: 0, duration: 0.3, delay: 1 }}
            locale={'ja'}
          />
          <View style={styles.icon}>
            <SvgIcon
              type={'materialIcons'}
              name={'keyboard-arrow-down'}
              size={20}
              color={COLORS.TEXT_COLOR}
            />
          </View>
        </View>
      </View>
      {/* TODO 日付の計算をしてエラーメッセージを表示する */}
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
};

export default AtomDate;

const styles = StyleSheet.create({
  contents: {
    paddingVertical: SIZE.BASE_WP * 3.5,
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: COLORS.DETAIL_BORDER,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  labelArea: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
  },
  label: {
    fontSize: FONTSIZE.SIZE18PX,
    color: COLORS.TEXT_LABEL,
    fontWeight: '400',
  },
  requiredArea: {
    borderRadius: 10,
    backgroundColor: COLORS.RED,
    marginLeft: SIZE.BASE_WP * 1.5,
  },
  required: {
    fontSize: FONTSIZE.SIZE15PX,
    color: COLORS.WHITE,
    fontWeight: '400',
    paddingHorizontal: SIZE.BASE_WP * 2,
    paddingVertical: SIZE.BASE_HP * 0.1,
  },
  selectArea: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  DatePickerTextInput: {
    fontWeight: 'bold',
  },
  touchableStyle: {
    alignItems: 'flex-end',
    width: '100%',
  },
  icon: {
    height: '100%',
    justifyContent: 'center',
  },
  errorMessage: {
    color: COLORS.RED,
    marginTop: 10,
    width: '100%',
    textAlign: 'right',
  },
});
