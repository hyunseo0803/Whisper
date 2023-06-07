import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import Header from './Header'
import Body from './Body'
import { DarkTheme, DefaultTheme, useIsFocused } from '@react-navigation/native';
import { read, readDiarys } from '../../util/database';
import { calenderBtnNextMonth, calenderBtnPrevMonth } from '../../util/Calender';

function Calender() {
	const isDark = useColorScheme() === 'dark'
  const isFocused = useIsFocused()

  const DATE = new Date();
  const YEAR = DATE.getFullYear();
  const MONTH = DATE.getMonth();

  const [month, setMonth] = useState(MONTH+1);
  const [year, setYear] = useState(YEAR);
  const [Ddata, setDdata] = useState([]);
  const [rendering, setRendering] = useState(false);

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
      setDdata(await readDiarys(month, year, 'DESC'))
    }
    getCalenderDataFun(month, year)
  }, [month, year, isFocused, rendering]);

  return(
    <View style={S.calenderContainer} theme={isDark ? DarkTheme : DefaultTheme}>
      <Header
        month = {month}
        year = {year}
        moveNextMonth = {calenderBtnNextMonth}
        movePrevMonth = {calenderBtnPrevMonth}
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
        setRendering = {setRendering}
        rendering={rendering}
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