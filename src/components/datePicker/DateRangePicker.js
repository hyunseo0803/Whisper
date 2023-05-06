import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Modal, Pressable, Text} from 'react-native';
import YMPicker, { modalS } from './YMPicker';
import {Calendar} from 'react-native-calendars';
import { getDate, toDate } from 'date-fns';
import { getDatesStartToLast } from '../../util/Calender';


const DateRangePicker = (props) => {
  const DATE = new Date()
  const [selected, setSelected] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [betweenDate, setBetweenDate] = useState([])
  console.log('----------------------------------------')
  console.log('selectDate :',selected)
  console.log("startDate :",startDate)
  console.log('endDate :',endDate)



  useEffect(() => {
    const result = getDatesStartToLast(startDate, endDate)
    setBetweenDate(result)
  }, [endDate]);
  console.log(betweenDate)

  
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
  
  const markingDates = {
    [startDate]: {disabled: true, startingDay: true, color : 'rgba(231, 76, 60, .8)', textColor: '#FFF'},
    [endDate]: {disabled: true, endingDay: true, color : 'rgba(231, 76, 60, .8)', textColor: '#FFF'},
    betweenDate : {disabled: true, endingDay: true, color : 'rgba(231, 76, 60, .8)', textColor: '#FFF'},
    // [selected]: { startingDay: true, color : 'rgba(231, 76, 60, .8)', textColor: '#FFF'} ,
  }

  const betweenMarking = (betweenDate) => {
    let marking = {};
    betweenDate.forEach((element, index, arr) => {
      if(index===0){
        marking[`${element}`] = {disabled: true, startingDay: true, color : 'rgba(231, 76, 60, .8)', textColor: '#FFF'}
      }
      if(index === arr.length -1){
        marking[`${element}`] = {disabled: true, endingDay: true, color : 'rgba(231, 76, 60, .8)', textColor: '#FFF'}
      }
      else{
        marking[`${element}`] = {disabled: true,startingDay: true, endingDay: true, color : 'rgba(231, 76, 60, .8)', textColor: '#FFF'}
      }
    });
    console.log('호잇', marking)
    return marking
  }
  
  // betweenMarking(betweenDate)


  return (
    <Modal
      animationType={props.animationType}
      visible={props.visible}
      transparent={true}
      style={{flex:1}}>
        <Pressable
        // onPress={}
        style={{flex:1, backgroundColor:"rgba(0,0,0,0.4)", justifyContent:'center', alignItems: 'center'}}>
          <View style={modalS.modalBody}>
          <Calendar
            onDayPress={(date) => onPressDate(date)}
            markedDates={markingDates}
            markingType={'period'}
            maxDate={DATE}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              // selectedDayBackgroundColor: '#00adf5',
              // selectedDayBackgroundColor: '#4E4981',
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
            // theme={{
            //   backgroundColor: '#ffffff',
            //   calendarBackground: '#ffffff',
            //   textSectionTitleColor: 'red',
            //   selectedDayBackgroundColor: 'yellow',
            //   selectedDayTextColor: '#ffffff',
            //   todayTextColor: '#00adf5',
            //   dayTextColor: '#2d4150',
            //   textDisabledColor: '#d9e1e8',
            //   selectedDotColor: '#ffffff',
            //   arrowColor: 'orange',
            //   monthTextColor: 'pink',
            //   indicatorColor: 'green',
            //   textDayFontFamily: 'Diary',
            //   textMonthFontFamily: 'Diary',
            //   textDayHeaderFontFamily: 'Diary',
            //   textDayFontWeight: '300',
            //   // textDayHeaderFontWeight: '300',
            //   // textDayFontSize: 16,
            //   // textMonthFontSize: 16,
            //   // textDayHeaderFontSize: 16,
            //   // 'stylesheet.day.basic': {
            //   //   base: {
            //   //     overflow: 'hidden',
            //   //   }
            //   // },
            //   'stylesheet.day.period': {
            //     base: {
            //       overflow: 'hidden',
            //       height: 34,
            //       alignItems: 'center',
            //       width: 38,
            //     },
            //   },
            //   // 'stylesheet.day.single': {
            //   //   base: {
            //   //     overflow: 'hidden',
            //   //     height: 34,
            //   //     alignItems: 'center',
            //   //     width: 38,
            //   //   }
            //   // }
            // }}
          />
          <Pressable
          onPress={() => props.setVisible(false)}>
            <Text>닫기</Text>
          </Pressable>
          </View>
        </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({})

export default DateRangePicker;
