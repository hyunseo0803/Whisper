import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, Modal, Pressable, Text, useColorScheme} from 'react-native';
import YMPicker, { modalS } from './YMPicker';
import {Calendar} from 'react-native-calendars';
import { getDate, toDate } from 'date-fns';
import { getDatesStartToLast } from '../../util/Calender';
import GlobalStyle from '../../globalStyle/GlobalStyle';
import {COLOR_DARK_FOURTH, COLOR_WHITE, COLOR_DARK_BLUE, COLOR_LIGHT_BLUE, COLOR_LIGHT_RED, COLOR_DARK_RED, COLOR_DARK_WHITE, COLOR_BLACK,
  COLOR_DARK_SECONDARY, COLOR_LIGHT_SECONDARY, COLOR_DARK_PRIMARY} from '../../globalStyle/color'
import themeContext from '../../globalStyle/themeContext';


const DateRangePicker = (props) => {
  const isDark = useContext(themeContext).theme === 'dark'

  const DATE = new Date()
  const [selected, setSelected] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [betweenDate, setBetweenDate] = useState([])

  useEffect(() => {
    const result = getDatesStartToLast(startDate, endDate)
    setBetweenDate(result)
  }, [endDate]);

  /**
   * 조건부로 모달 닫는 함수
   * @param {string} save "save","nosave" 
   */
  const closeModal = (save) => {
    if(save === 'save') {
      props.setStartDate(startDate)
      props.setEndDate(endDate)
    }
    props.setVisible(false)
  }

  
  /**
   * 시작날짜 종료 날짜 선택하는 함수
   * @param {day} day 
   */
  const onPressDate = (day) => {
    if(selected===''){
      setSelected(day.dateString);
      setStartDate(day.dateString)
    }
    else{
      setSelected(day.dateString)
      if(new Date(day.dateString) < new Date(startDate)){
        setStartDate(day.dateString)
        setEndDate('')
      }
      else if(new Date(day.dateString) >= new Date(startDate)){
        setEndDate(day.dateString)
      }
    }
  }

  /**
   * 마킹하는 날짜 객체 반환
   * @param {arr} betweenDate 
   * @returns 
   */
  const betweenMarking = (betweenDate) => {
    if(startDate !== '' && endDate === ''){
      return {[startDate]: {disabled: true, color : 'rgba(231, 107, 92, 1)', textColor: '#FFF'}}
    }
    else{
      let marking = {};
      betweenDate.forEach((element, index, arr) => {
        if(index===startDate){
          marking[`${element}`] = {disabled: true, startingDay: true, color : 'rgba(231, 107, 92, 1)', textColor: '#FFF'}
        }
        if(index === endDate){
          marking[`${element}`] = {disabled: true, endingDay: true, color : 'rgba(231, 107, 92, 1)', textColor: '#FFF'}
        }
        else{
          marking[`${element}`] = {color : 'rgba(231, 107, 92, 1)', textColor: '#FFF' }
        }
      });
      return marking
    }
  }


  return (
    <Modal
      animationType={props.animationType}
      visible={props.visible}
      transparent={true}
      style={{flex:1}}>
        <Pressable
        onPress={() => closeModal('nosave')}
        style={{flex:1, backgroundColor:"rgba(0,0,0,0.5)", justifyContent:'center', alignItems: 'center'}}>
          <View style={[modalS.modalBody, 
            {height:'auto', boxSizing: 'border-box', paddingHorizontal: 30, paddingVertical: 20},
            {backgroundColor: isDark?COLOR_DARK_FOURTH:COLOR_WHITE}
          ]}>
          <Calendar
            onDayPress={(date) => onPressDate(date)}
            markedDates={betweenMarking(betweenDate)}
            markingType={'period'}
            maxDate={`${DATE.getFullYear()}-${DATE.getMonth()+1}-${DATE.getDate()-1}`}
            theme={{
              backgroundColor: isDark?COLOR_DARK_FOURTH:COLOR_WHITE,
              calendarBackground: 'rgba(0,0,0,0)',
              textSectionTitleColor: isDark?COLOR_DARK_PRIMARY:COLOR_LIGHT_SECONDARY,   // 요일
              selectedDayTextColor: '#ffffff',
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
          
          <View style={styles.buttonWrap}>
            <Pressable
            onPress={() => closeModal('save')}
            style={[styles.button, GlobalStyle.bgRED]}>
              <Text style={[GlobalStyle.fontWHITE, GlobalStyle.font_body, {backgroundColor:isDark?COLOR_DARK_RED:COLOR_LIGHT_RED}]}>저장</Text>
            </Pressable>
          </View>
          </View>
        </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttonWrap:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  button:{
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderRadius: 10,
    borderColor: '#E76B5C',
    borderWidth: 2,
  }
})

export default DateRangePicker;
