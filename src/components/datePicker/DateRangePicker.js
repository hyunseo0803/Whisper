import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Modal, Pressable, Text} from 'react-native';
import YMPicker, { modalS } from './YMPicker';
import {Calendar} from 'react-native-calendars';
import { getDate, toDate } from 'date-fns';
import { getDatesStartToLast } from '../../util/Calender';
import GlobalStyle from '../../globalStyle/GlobalStyle';


const DateRangePicker = (props) => {
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
      props.setStartDate(startDate.replace(/-/g, '.'))
      props.setEndDate(endDate.replace(/-/g, '.'))
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
        style={{flex:1, backgroundColor:"rgba(0,0,0,0.4)", justifyContent:'center', alignItems: 'center'}}>
          <View style={[modalS.modalBody, {height:'auto', boxSizing: 'border-box', paddingHorizontal: 30, paddingVertical: 20}]}>
          <Calendar
            onDayPress={(date) => onPressDate(date)}
            markedDates={betweenMarking(betweenDate)}
            markingType={'period'}
            maxDate={DATE}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#E76B5C',
              dayTextColor: '#2d4150',
              textDayFontFamily: 'Diary',
              textMonthFontSize: 16,
              textDayFontSize: 15,
              textDayHeaderFontSize: 10,
              textMonthFontFamily: 'Diary',
              arrowColor: '#4E4981',
            }}
          />
          
          <View style={styles.buttonWrap}>
            <Pressable
            onPress={() => closeModal('nosave')}
            style={[styles.button, GlobalStyle.bgWHITE,]}>
              <Text style={[GlobalStyle.fontRED, GlobalStyle.font_body]}>취소</Text>
            </Pressable>

            <Pressable
            onPress={() => closeModal('save')}
            style={[styles.button, GlobalStyle.bgRED]}>
              <Text style={[GlobalStyle.fontWHITE, GlobalStyle.font_body]}>저장</Text>
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
    width: '47%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderRadius: 10,
    borderColor: '#E76B5C',
    borderWidth: 2,
  }
})

export default DateRangePicker;
