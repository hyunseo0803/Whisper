import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import Header from './Header'
import Body from './Body'
import { DarkTheme, DefaultTheme, useIsFocused } from '@react-navigation/native';
import { readDiarys } from '../../util/database';

function Calender() {
	const isDark = useColorScheme() === 'dark'
  const isFocused = useIsFocused()

  const DATE = new Date();
  const YEAR = DATE.getFullYear();
  const MONTH = DATE.getMonth();

  const [month, setMonth] = useState(MONTH+1);
  const [year, setYear] = useState(YEAR);
  const [Ddata, setDdata] = useState([]);

  /**
   * 다음 달로 이동하는 화살표 버튼 함수
   * @param {int} month 
   */
  const moveNextMonth = (month) => {
    if (month === 12) {
      setYear((prevYear) => prevYear+1);
      setMonth(1);
    }
    else {
      setMonth((prevMonth) => prevMonth+1)
    }
  }

  /**
   * 이전달로 이동하는 화살표 버튼 함수
   * @param {int} month 
   */
  const movePrevMonth = (month) => {
    if (month ===1 ) {
      setYear((prevYear) => prevYear-1)
      setMonth(12);
    }
    else{
      setMonth((prevMonth) => prevMonth-1)
    }
  }

  useEffect(() => {
    getCalenderDataFun = async (month, year) => {
      try{
        const result = await readDiarys(month, year, 'DESC')
        setDdata(result)
      }
      catch(e){
        console.error(e)
      }
    }
    getCalenderDataFun(month, year)
  }, [month, year, isFocused]);

  return(
    <View style={S.calenderContainer} theme={isDark ? DarkTheme : DefaultTheme}>
      <Header
        month = {month}
        year = {year}
        moveNextMonth = {moveNextMonth}
        movePrevMonth = {movePrevMonth}
        setMonth = {setMonth}
        setYear = {setYear}
        isDark = {isDark}
      />
      <Body
        month = {month}
        year = {year}
        moveNextMonth = {moveNextMonth}
        movePrevMonth = {movePrevMonth}
        data = {Ddata}
        isDark = {isDark}
      />

    </View>
  );
}

export default Calender;

const S = StyleSheet.create({
  calenderContainer: {
    position: 'relative',
  }
})