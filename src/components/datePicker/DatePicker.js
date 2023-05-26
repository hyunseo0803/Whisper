import React, { useState } from 'react';
import {View, Modal, Pressable, useColorScheme, Text} from 'react-native';
import { COLOR_BLACK, COLOR_DARK_BLUE, COLOR_DARK_FOURTH, COLOR_DARK_PRIMARY, COLOR_DARK_RED, COLOR_DARK_WHITE, COLOR_LIGHT_BLUE, COLOR_LIGHT_RED, COLOR_LIGHT_SECONDARY, COLOR_WHITE,
COLOR_DARK_SECONDARY } from '../../globalStyle/color';
import { modalS } from './YMPicker';
import {Calendar} from 'react-native-calendars';

/**
 * Datepicker 컴포넌트
 * @props {boolean} visible
 * @props setVisible
 * @props selectedDate - new Date()
 * @props setSelectedDate
 * @returns datepicker modal
 */
const DatePicker = (props) => {

  const isDark = useColorScheme() === 'dark'
  const DATE = new Date()

  const {
    setSelectedDate,
    setVisible,
    visible,
    dotMarkingDate,
  } = props
  
  const [selected, setSelected] = useState(``)
  
  /**
   * 모달창 닫는 함수
   */
  const closeModal = () => {
    setSelectedDate(selected)
    setVisible(false)
  }

  console.log(dotMarkingDate)
  /**
   * 마킹될 날짜들 객체 생성
   * @param {day} selected 
   * @returns 선택된날짜 & 선택불가능한 날짜
   */
  const markingDates = (selected) => {
    let marking = {};
    dotMarkingDate.forEach((element) => {
      console.log(element)
      marking[element] = { marked: true, dotColor: isDark?COLOR_DARK_BLUE:COLOR_LIGHT_BLUE }; // 이미 일기가 있는 날 dot 표시
    });
    marking[selected] = { selected: true, disableTouchEvent: true }; // 선택한 일기 마킹
    return marking;
  };

  return (
    <Modal
    animationType={'fade'}
    visible={visible}
    transparent={true}
    style={{flex:1}}
    >
      <Pressable
      onPress={() => closeModal()}
      style={{flex:1, backgroundColor:"rgba(0,0,0,0.5)", justifyContent:'center', alignItems: 'center'}}
      >
        <View style={[modalS.modalBody, 
          {paddingHorizontal: 30, paddingVertical: 20, alignItems:'center'},
          {backgroundColor: isDark?COLOR_DARK_FOURTH:COLOR_WHITE}
        ]}>
          {/* 달력 */}
          <Calendar
            onDayPress={day => setSelected(day.dateString)} // 날짜 onPress 이벤트
            markingType={'dot'}
            markedDates={markingDates(selected)}  // 마킹될 날짜들
            maxDate={`${DATE.getFullYear()}-${DATE.getMonth()+1}-${DATE.getDate()-1}`}  // 선택가능한 최대 날짜(오늘)
            theme={{
              calendarBackground: 'rgba(0,0,0,0)',                                      // 달력 배경(투명으로 설정)
              textSectionTitleColor: isDark?COLOR_DARK_PRIMARY:COLOR_LIGHT_SECONDARY,   // 요일 글자색
              selectedDayTextColor: '#ffffff',                                          // 선택된 날짜의 글자색
              selectedDayBackgroundColor: isDark?COLOR_DARK_RED:COLOR_LIGHT_RED,        // 선택된 날짜의 배경색
              dayTextColor:isDark?COLOR_DARK_WHITE:COLOR_BLACK,                         // 선택되지 않은 날짜의 글자색
              textDisabledColor:isDark?COLOR_DARK_SECONDARY:COLOR_LIGHT_SECONDARY,      // 선택 불가능한 날짜색
              todayTextColor: isDark?COLOR_DARK_RED:COLOR_LIGHT_RED,                    // 오늘 날짜의 글자색
              monthTextColor: isDark?COLOR_DARK_WHITE:COLOR_LIGHT_BLUE,
              textDayFontFamily: 'Diary',
              textMonthFontSize: 16,
              textDayFontSize: 15,
              textDayHeaderFontSize: 10,
              textMonthFontFamily: 'Diary',
              arrowColor: isDark?COLOR_DARK_BLUE:COLOR_LIGHT_BLUE,                      // 화살표 색
            }}
          />
        </View>
      </Pressable>
    </Modal>
  );
}

export default DatePicker;
