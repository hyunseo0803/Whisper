import React, {useEffect, useState} from "react";
import { View, StyleSheet, Text, Button, Pressable, ImageBackground, useColorScheme } from "react-native";
import { COLOR_BLACK, COLOR_DARK_BG, COLOR_DARK_BLUE, COLOR_DARK_FIVTH, COLOR_DARK_FOURTH, COLOR_DARK_PRIMARY, COLOR_DARK_RED, COLOR_DARK_THIRD, COLOR_DARK_WHITE, COLOR_LIGHT_BLUE, COLOR_LIGHT_FOURTH, COLOR_LIGHT_PRIMARY, COLOR_LIGHT_RED, COLOR_LIGHT_THIRD } from "../../globalStyle/color";
import GlobalStyle from "../../globalStyle/GlobalStyle";
import DailyPhotoScreen from "../../pages/home/DailyPhotoScreen";

function Body(props) {
  const isDark = useColorScheme() === 'dark'

  const [totalDays, setTotalDays] = useState([]);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [modalDay, setModalDay] = useState();
  const DATA = props.data;

  /**
   * 배열을 일주일 단위로 나누는 함수
   * @param {array} arr 
   * @param {int} n 
   * @returns arr/n
   */
  const division = (arr, n) => {
    const length = arr.length;
    const divide = Math.floor(length / n) + (Math.floor( length % n ) > 0 ? 1 : 0);
    const newArray = [];
  
    for (let i = 0; i < divide; i++) {
      // 배열 0부터 n 잘라 새 배열에 넣기
      newArray.push(arr.splice(0, n)); 
    }

    if(newArray[newArray.length - 1].length !== 7){
      while (newArray[newArray.length - 1].length !== 7) {
        newArray[newArray.length - 1].push("")
      }
    }
  
    return newArray;
  }

  /**
   * 한 달 구하는 함수
   * @param {int} year 
   * @param {int} month 
   */
  const getMonthDays = (year, month) => {
    const monthLength = new Date(year, month, 0).getDate()  // 현재 달이 몇일 까지인지
    const monthStartDay = (new Date(year, month-1, 0).getDay()) +1  // 저번 달이 몇 요일까지인지

    // 저번 달 마지막 날들 배열
    const lastMonth = Array.from(
      {length: monthStartDay },
      (v, i) => '',
    )

    // 이번달 배열
    const thisDays = Array.from(
      { length: monthLength },
      (v, i) => i + 1,
    );

    if(lastMonth.toString() === ['', '', '', '', '', '', ''].toString()){
      setTotalDays(division(thisDays, 7))
    }
    else{
      calenderDate = lastMonth.concat(thisDays)
      setTotalDays(division(calenderDate, 7))
    }
  }

  // 연, 월 이 바뀔 때마다 한 번씩만 실행
  useEffect(() => {
    getMonthDays(props.year, props.month)
  }, [props.year, props.month])


  /**
   * 해당 날짜에 이미지를 찾아주는 함수
   * @param {int} day 
   * @returns {string}imgUrl
   */
  const FindImg = (day) => {
    let img = DATA.find(data => data.date === day)
    return img?.imgUrl
  }

  // 요일 날짜 배열
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  return(
    <View style={styles.container}>
      {/* 요일 */}
      <View style={styles.weekDayWrap}>
        {weekDays.map((day, index) => (
          <View style={styles.weekDayBox} key={index}>
            <Text style={[dayS(index, isDark).dayOfWeek, GlobalStyle.font_caption1]} key={index}>
              {day}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.DateContainer}>
        {
          totalDays.map((week, index) =>(
            // 한 주
            <View style={styles.WeekBox} key={index}>
              {
                week.map((day, index) => (
                  <Pressable 
                    style={styles.dateBox} 
                    key={index}
                    onPress={() => {
                      if(day !== ''){
                        // 날짜에 이미지가 있음
                        if(FindImg(day) !== undefined && FindImg(day) !== ''){
                          setModalImg(FindImg(day))
                          setShowPhotoModal(true)
                          setModalDay(day)
                        }
                      }}
                    }>
                      <ImageBackground 
                      source={{url: FindImg(day) === undefined ? "" : FindImg(day)}}
                      style={[{width: "100%", height: "100%" }, day===''? {opacity:0} : {opacity: 0.6}, {backgroundColor: isDark ? COLOR_DARK_THIRD : COLOR_LIGHT_THIRD}]}
                      />
                      <Text 
                      style={[dayS(index, isDark).dayOfWeek, GlobalStyle.font_body, styles.dateText]}
                      >{day}</Text>
                    </Pressable>)
                )
              }
              
            </View>
            
          ))
        }
      </View>

      {/* 오늘의 사진 모달창 */}
      {
        showPhotoModal &&
        <DailyPhotoScreen
        showPhotoModal={showPhotoModal}
        setShowPhotoModal={setShowPhotoModal}

        modalImg={modalImg}
        month={props.month}
        year = {props.year}
        day={modalDay}
        />
      }
    </View>
  )
}

export default Body;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  weekDayWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  weekDayBox: {
    width: '12%',
    alignItems: 'center'
  },
  
  WeekBox: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    marginVertical: 3,
    justifyContent: 'space-between',
  },  
  DateContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  dateBox:{
    position: 'relative',
    width: '12%',
    height: '100%',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 11,
    overflow: 'hidden',
  },

  dateText:{
    position: 'absolute',
  }
})

const dayS = (el, isDark) => StyleSheet.create({
  dayOfWeek: {
    color: el === 0 ? 
    isDark ? COLOR_DARK_RED : COLOR_LIGHT_RED 
    : 
    el === 6 
    ? 
    isDark ? COLOR_DARK_BLUE : COLOR_LIGHT_BLUE
    : 
    isDark ? COLOR_DARK_WHITE : COLOR_BLACK,
  },
})