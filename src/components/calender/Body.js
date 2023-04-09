import React, {useEffect, useState} from "react";
import { View, StyleSheet, Text, Button, Pressable, ImageBackground } from "react-native";
import GlobalStyle from "../../globalStyle/GlobalStyle";

function Body(props) {

  const [totalDays, setTotalDays] = useState([]);

  // 배열을 일주일 단위로 나누는 함수
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

  // 한 달 구하기
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


  // 요일 날짜
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  return(
    <View style={styles.container}>
      {/* 요일 */}
      <View style={styles.weekDayWrap}>
        {weekDays.map((day, index) => (
          <View style={styles.weekDayBox} key={index}>
            <Text style={[dayS(index).dayOfWeek, GlobalStyle.font_caption1]} key={index}>
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
                      alert(`${props.month}월 ${day}일의 사진이 나와야 합니다`)
                    }}
                  }>
                    <ImageBackground 
                    // TODO(emyo): 배경은 이미지마다 바뀌도록 처리해야함
                    source={{url: "https://images.unsplash.com/photo-1680951103843-a370c042fb03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"}}
                    style={[{width: "100%", height: "100%" }, day===''? {opacity:0} : {opacity: 0.45}]}
                    />
                    <Text 
                    style={[dayS(index).dayOfWeek, GlobalStyle.font_body, styles.dateText]}
                    >{day}</Text>
                  </Pressable>
                ))
              }
            </View>
          ))
        }
      </View>
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

const dayS = (el) => StyleSheet.create({
  dayOfWeek: {
    color: el === 0 ? '#E76B5C' : el === 6 ? '#4E4981' : '#000',
  },
})

const dateS = (month, day) => StyleSheet.create({
  dateImgBackground: {
    // 랜덤 핵사 코드 추출
    // backgroundColor: day==='' ? '#80000000' : `#${Math.floor(Math.random() * 16777215).toString(16)}`
  }
})