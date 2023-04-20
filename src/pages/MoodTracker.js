import { SafeAreaView, StyleSheet, Text, View, Image, Pressable, Alert } from "react-native";
import React, {useState, useEffect} from "react";
import GlobalStyle from "../globalStyle/GlobalStyle";
import Header from "../components/calender/Header";
import { getMoodData } from "../util/firebase/readData";
import MoodBar from "../components/moodTracker/MoodBar";
import happy from '../../assets/images/mood/happy.png';
import disgust from '../../assets/images/mood/disgust.png';
import surprised from '../../assets/images/mood/surprised.png';
import angry from '../../assets/images/mood/angry.png';
import sad from '../../assets/images/mood/sad.png';
import fear from '../../assets/images/mood/fear.png';
import expressionless from '../../assets/images/mood/expressionless.png';
import Ionicons from '@expo/vector-icons/Ionicons';
import { btnGoWriteScreen } from "../globalStyle/BtnStyle";


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
   * 영어로된 감정을 한글로 바꿔주는 함수
   * @param {string} moodEng 
   * @returns {string}moodKr
   */
  const moodEngToKr = (moodEng) => {
    switch (moodEng) {
      case "happy":
        return "기쁨"
      case "disgust":
        return "혐오"
      case "surprised":
        return "놀람"
      case "angry":
        return "화남"
      case "sad":
        return "슬픔"
      case "fear":
        return "두려움"
      case "expressionless":
        return "무표정"
    }
  }

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
          {/* TODO: 시간 날 때 간단하게 합칠 수 있는 방법 찾아볼 것 */}
          <View style={moodTrackerStyle.mainWrap}>
            <View style={moodTrackerStyle.emojiWrap}>
              <Image source={happy} style={moodTrackerStyle.emojiStyle}/>
              <Text style={[moodTrackerStyle.moodText, GlobalStyle.font_caption1]}>기쁨</Text>
            </View>
            <MoodBar count={moodValues.happy}/>
          </View>
          <View style={moodTrackerStyle.mainWrap}>
            <View style={moodTrackerStyle.emojiWrap}>
              <Image source={disgust} style={moodTrackerStyle.emojiStyle}/>
              <Text style={[moodTrackerStyle.moodText, GlobalStyle.font_caption1]}>혐오</Text>
            </View>
            <MoodBar count={moodValues.disgust}/>
          </View>
          <View style={moodTrackerStyle.mainWrap}>
            <View style={moodTrackerStyle.emojiWrap}>
              <Image source={surprised} style={moodTrackerStyle.emojiStyle}/>
              <Text style={[moodTrackerStyle.moodText, GlobalStyle.font_caption1]}>놀람</Text>
            </View>
            <MoodBar count={moodValues.surprised}/>
          </View>
          <View style={moodTrackerStyle.mainWrap}>
            <View style={moodTrackerStyle.emojiWrap}>
              <Image source={angry} style={moodTrackerStyle.emojiStyle}/>
              <Text style={[moodTrackerStyle.moodText, GlobalStyle.font_caption1]}>화남</Text>
            </View>
            <MoodBar count={moodValues.angry}/>
          </View>
          <View style={moodTrackerStyle.mainWrap}>
            <View style={moodTrackerStyle.emojiWrap}>
              <Image source={sad} style={moodTrackerStyle.emojiStyle}/>
              <Text style={[moodTrackerStyle.moodText, GlobalStyle.font_caption1]}>슬픔</Text>
            </View>
            <MoodBar count={moodValues.sad}/>
          </View>
          <View style={moodTrackerStyle.mainWrap}>
            <View style={moodTrackerStyle.emojiWrap}>
              <Image source={fear} style={moodTrackerStyle.emojiStyle}/>
              <Text style={[moodTrackerStyle.moodText, GlobalStyle.font_caption1]}>두려움</Text>
            </View>
            <MoodBar count={moodValues.fear}/>
          </View>
          <View style={moodTrackerStyle.mainWrap}>
            <View style={moodTrackerStyle.emojiWrap}>
              <Image source={expressionless} style={moodTrackerStyle.emojiStyle}/>
              <Text style={[moodTrackerStyle.moodText, GlobalStyle.font_caption1]}>무표정</Text>
            </View>
            <MoodBar count={moodValues.expressionless}/>
          </View>
        </View>

        {/* 일기쓰러가기 버튼 */}
        <View style={styles.btnWrap}>
          <Pressable
          style={[btnGoWriteScreen.btnWrap]}
          onPress={() => {
            Alert.alert("페이지 이동!", '네비게이션 페이지로 이동합니다.')
          }}>
            <Ionicons style={btnGoWriteScreen.plusIcon} name="add-outline" size={50} color='white' />
          </Pressable>
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
    marginBottom: 20,
  },
  moodTrackerContainer:{
    marginTop: 40,
    width: '100%',
  },

  btnWrap:{
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 10
  }
});
const moodTrackerStyle = StyleSheet.create({
  mainWrap:{
    flexDirection: 'row',
    marginBottom: 20
  },

  emojiWrap:{
    alignItems: "center",
    marginRight: 15,
  },
  moodText:{
    color: "#86878C"
  },
  emojiStyle:{
    width: 30,
    height: 30,
    marginBottom: 3
  }
})