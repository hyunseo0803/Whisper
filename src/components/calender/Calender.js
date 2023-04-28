import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Header from './Header'
import Body from './Body'
import GlobalStyle from '../../globalStyle/GlobalStyle';
import YMPicker from '../datePicker/YMPicker';
import { db, auth } from "../../../firebase";
import { collection, query, where, getDocs, and, orderBy } from "firebase/firestore";
import { dayPlus } from '../../util/Calender';

function Calender() {

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



  /**
   * firebase에서 데이터 받아오는 함수
   * @param {int} month 
   * @param {int} year 
   * 
   * @return {array} Ddata
   */
  const getData = async(month, year) => {
    const q = query(collection(db, "diary"), 
                where("uid", "==", auth.currentUser.uid),
                orderBy("date"),
                where("date", ">", new Date(`${year}-${month}-1`)),  // 4월의 첫 날 00시
                where("date", "<", new Date(`${year}-${month+1}-1`))    // 5월의 첫 날 00시
              );

    const d_data = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //날짜 convert day+1
      const year = doc.data().date.toDate().toISOString().split('T')[0].split("-")[0]
      const month = doc.data().date.toDate().toISOString().split('T')[0].split("-")[1][0] === '0' ? doc.data().date.toDate().toISOString().split('T')[0].split("-")[1][1] : doc.data().date.toDate().toISOString().split('T')[0].split("-")[1]
      const day = doc.data().date.toDate().toISOString().split('T')[0].split("-")[2][0] === '0' ? doc.data().date.toDate().toISOString().split('T')[0].split("-")[2][1] : doc.data().date.toDate().toISOString().split('T')[0].split("-")[2]
      // const imgdate = dayPlus(year, 0, month, 0, day, 1)
      // const imgdate = (year+"-"+month+"-"+day)
      const imgdate = (day*1)
      // 이미지
      const imgUrl = doc.data().image;

      const imageCalenderData = {
        date : imgdate,
        imgUrl : imgUrl
      }
      d_data.push(imageCalenderData)
    });
    setDdata(d_data)
  }

  useEffect(() => {
    getData(month, year);
  }, [month, year]);

  return(
    <View style={S.calenderContainer}>
      <Header
        month = {month}
        year = {year}
        moveNextMonth = {moveNextMonth}
        movePrevMonth = {movePrevMonth}
        setMonth = {setMonth}
        setYear = {setYear}
      />
      <Body
        month = {month}
        year = {year}
        moveNextMonth = {moveNextMonth}
        movePrevMonth = {movePrevMonth}
        data = {Ddata}
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