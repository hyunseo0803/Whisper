import { SafeAreaView, StyleSheet, Text, View, Image, Pressable, Alert, useColorScheme } from "react-native";
import React, {useState, useEffect, useContext} from "react";
import GlobalStyle from "../globalStyle/GlobalStyle";
import Header from "../components/calender/Header";
import MoodBar from "../components/moodTracker/MoodBar";
import Ionicons from '@expo/vector-icons/Ionicons';
import { btnGoWriteScreen } from "../globalStyle/BtnStyle";
import { useIsFocused } from "@react-navigation/native";
import HeaderText from "../components/Header";
import { getDiaryCountByMood } from "../util/database";
import { moodArr, moodEngToKr, MoodWeatherFile } from "../util/MoodWeather";
import { calenderBtnNextMonth, calenderBtnPrevMonth } from "../util/Calender";
import themeContext from "../globalStyle/themeContext";


const MoodTracker = ({navigation}) => {
  const isDark = useContext(themeContext).theme === 'dark';
  const isFocused = useIsFocused()

  const DATE = new Date();
  const YEAR = DATE.getFullYear();
  const MONTH = DATE.getMonth();

  const [month, setMonth] = useState(MONTH+1);
  const [year, setYear] = useState(YEAR);
  const [moodValues, setMoodValues] = useState({});

  /**
   * 무드트레커 정보 받아와서 useState로 관리
   */
  useEffect(() => {
    const fetchDiaryCountsByMood = async () => {
      try {
        const counts = await getDiaryCountByMood(month, year);
        setMoodValues(counts)
      } catch (error) {
        console.error(error);
      }
    };
    fetchDiaryCountsByMood()
  }, [month, year, isFocused])



  return (
      <SafeAreaView  style={styles.container}>
        <HeaderText headerText='MoodTracker' isDark={isDark}/>

        {/* 상단  날짜 이동 View*/}
        <Header
          month = {month}
          year = {year}
          moveNextMonth = {calenderBtnNextMonth}
          movePrevMonth = {calenderBtnPrevMonth}
          setMonth = {setMonth}
          setYear = {setYear}
          isDark = {isDark}
        />

        {/* 무드 트레커 VIEW */}
        <View style={styles.moodTrackerContainer}>
        {
          moodArr.map((el, index) => (
            <View style={moodTrackerStyle.mainWrap} key={index}>
              <View style={moodTrackerStyle.emojiWrap}>
                <Image source={MoodWeatherFile(el)} style={moodTrackerStyle.emojiStyle}/>
                <Text style={[moodTrackerStyle.moodText, GlobalStyle.font_caption1]}>{moodEngToKr(el)}</Text>
              </View>
              
              <MoodBar count={moodValues[`${el}`]} isDark={isDark}/>
            </View>
          ))
        }
        </View>

        {/* 일기쓰러가기 버튼 */}
        <View style={styles.btnWrap}>
          <Pressable
          style={[btnGoWriteScreen.btnWrap]}
          onPress={() => {
            navigation.navigate('Write')
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
    position: 'relative'
  },

  headText:{
    marginBottom: 20,
  },
  moodTrackerContainer:{
    marginTop: 40,
    width: '100%',
  },

  btnWrap:{
    position: 'absolute',
    bottom: 20,
    right: 0
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