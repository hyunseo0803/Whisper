import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import React, {useState, useEffect} from "react";
import GlobalStyle from "../globalStyle/GlobalStyle";
import Header from "../components/calender/Header";
import { getMoodData } from "../util/firebase/readData";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import MoodBar from "../components/moodTracker/MoodBar";
import HAPPY from '../../assets/images/mood/happy.png';

const MoodTracker = () => {

  const DATE = new Date();
  const YEAR = DATE.getFullYear();
  const MONTH = DATE.getMonth();

  const [month, setMonth] = useState(MONTH+1);
  const [year, setYear] = useState(YEAR);
  const [moodValues, setMoodValues] = useState({
    happy: 0,           // 기쁨
    disgust: 0,         // 혐오
    surprised: 0,       // 놀람
    angry: 0,           // 화남
    sad: 0,             // 슬픔
    fear: 0,            // 두려움
    expressionless: 0,  // 무표정
  });

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
   * 감정 배열
   */
  const moodArr = [
    "happy",           // 기쁨
    "disgust",         // 혐오
    "surprised",       // 놀람
    "angry",           // 화남
    "sad",             // 슬픔
    "fear",            // 두려움
    "expressionless",  // 무표정
  ]

  /**
   * 무드트레커 정보 받아와서 useState로 관리
   */
  useEffect(() => {
    moodArr.forEach(async(mood) => {
      const countMoodData = await getMoodData(mood, year, month);
        setMoodValues((prevState) => {return{...prevState, [mood] : countMoodData}})
    });
  }, [month, year])

  return (
      <SafeAreaView  style={styles.container}>
        <Text style={[styles.headText, GlobalStyle.font_caption1]}>MoodTracker</Text>

        {/* 상단  날짜 이동 View*/}
        <Header
          month = {month}
          year = {year}
          moveNextMonth = {moveNextMonth}
          movePrevMonth = {movePrevMonth}
          setMonth = {setMonth}
          setYear = {setYear}
          style={styles.headerBar}
        />

        {/* 무드 트레커 VIEW */}
        <View style={styles.moodTrackerContainer}>
          <View style={moodTrackerStyle.mainWrap}>
            <View style={moodTrackerStyle.emojiWrap}>
              <Image source={HAPPY} style={moodTrackerStyle.emojiStyle}/>
              <Text style={[GlobalStyle.font_caption1]}>기쁨</Text>
            </View>
            <MoodBar count={moodValues.happy}/>
          </View>
        </View>
      </SafeAreaView>
  );
}

export default MoodTracker;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 20,
  },

  headText:{
    backgroundColor: 'red',
    marginBottom: 20,
  },
  moodTrackerContainer:{
    backgroundColor: 'red',
    marginTop: 40,
    width: '100%',
  }
});
const moodTrackerStyle = StyleSheet.create({
  mainWrap:{
    flexDirection: 'row'
  },

  emojiWrap:{
    alignItems: "center",
    marginRight: 10
  },
  emojiStyle:{
    width: 30,
    height: 30
  }
})