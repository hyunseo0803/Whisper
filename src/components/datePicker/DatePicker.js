import React, { useState } from 'react';
import {View, StyleSheet, Modal, Pressable, useColorScheme, Text} from 'react-native';
import { COLOR_BLACK, COLOR_DARK_BLUE, COLOR_DARK_FOURTH, COLOR_DARK_PRIMARY, COLOR_DARK_RED, COLOR_DARK_WHITE, COLOR_LIGHT_BLUE, COLOR_LIGHT_RED, COLOR_LIGHT_SECONDARY, COLOR_WHITE,
COLOR_DARK_SECONDARY } from '../../globalStyle/color';
import { modalS } from './YMPicker';
import {Calendar} from 'react-native-calendars';
import ModeColorStyle from '../../globalStyle/ModeColorStyle';
import GlobalStyle from '../../globalStyle/GlobalStyle';

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
  
  
  const [selected, setSelected] = useState(`${props.selectedDate.getFullYear()}-${props.selectedDate.getMonth()+1}-${props.selectedDate.getDate()}`)
  
  console.log(selected)
  /**
   * 모달창 닫는 함수
   */
  const closeModal = () => {
    props.setSelectedDate(new Date(selected))
    props.setVisible(false)
  }

  return (
    <Modal
    animationType={'fade'}
    visible={props.visible}
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
            onDayPress={day => setSelected(day.dateString)}
            markedDates={
              { [selected]: {selected: true, disableTouchEvent: true} }
            }
            maxDate={`${DATE.getFullYear()}-${DATE.getMonth()+1}-${DATE.getDate()-1}`}
            theme={{
              calendarBackground: 'rgba(0,0,0,0)',
              textSectionTitleColor: isDark?COLOR_DARK_PRIMARY:COLOR_LIGHT_SECONDARY,   // 요일
              selectedDayTextColor: '#ffffff',
              selectedDayBackgroundColor: isDark?COLOR_DARK_RED:COLOR_LIGHT_RED,
              dayTextColor:isDark?COLOR_DARK_WHITE:COLOR_BLACK,
              textDisabledColor:isDark?COLOR_DARK_SECONDARY:COLOR_LIGHT_SECONDARY,
              todayTextColor: isDark?COLOR_DARK_RED:COLOR_LIGHT_RED,
              monthTextColor: isDark?COLOR_DARK_WHITE:COLOR_LIGHT_BLUE,
              textDayFontFamily: 'Diary',
              textMonthFontSize: 16,
              textDayFontSize: 15,
              textDayHeaderFontSize: 10,
              textMonthFontFamily: 'Diary',
              arrowColor: isDark?COLOR_DARK_BLUE:COLOR_LIGHT_BLUE,
            }}
          />
        </View>
      </Pressable>
    </Modal>
  );
}

export default DatePicker;
