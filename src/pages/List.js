import { Button, StyleSheet, Text, View,SafeAreaView, Pressable, ScrollView, useColorScheme } from "react-native";
import React, {useState, useEffect} from "react";
import GlobalStyle from "../globalStyle/GlobalStyle";
import Ionicons from '@expo/vector-icons/Ionicons';
import YMPicker from "../components/datePicker/YMPicker";
import { changeNumberTwoLength } from "../util/Calender";
import { getDiaryList, timestampToDate } from "../util/firebase/CRUD";
import DiaryView from "../components/DiaryView";
import SortModal from "../components/SortModal";
import { COLOR_BLACK, COLOR_DARK_BG, COLOR_DARK_PRIMARY, COLOR_DARK_WHITE, COLOR_LIGHT_BG, COLOR_LIGHT_PRIMARY } from "../globalStyle/color";
import ModeColorStyle from "../globalStyle/ModeColorStyle";

const List = () => {
  const isDark = useColorScheme() === 'dark'

  const DATE = new Date();
  const YEAR = DATE.getFullYear();
  const MONTH = DATE.getMonth();

  const [month, setMonth] = useState(MONTH+1);
  const [year, setYear] = useState(YEAR);
  const [showModal, setShowModal] = useState(false);
  const [diaryList, setDiaryList] = useState([]);   // 일기 정보 배열
  const [showSortModal, setShowSortModal] = useState(false)     // 정렬 기준 모달 
  const [howSortDiary, setHowSortDiary] = useState('asc')       // asc(오름차순, 기본), decs(내림차순)
  const [redirect, setRedirect] = useState(false);


  // 데이터를 diaryList에 set해주는 useEffect
  useEffect(() => {
    async function getDiaryListFun() {
      const result = await getDiaryList(month, year, howSortDiary)
      setDiaryList(result)
    } 
    getDiaryListFun()
    setRedirect(false)
  }, [month, year, redirect, howSortDiary])

  /**
   * 화면 모드에 따라 primary 색으로 변경
   */
  const colorPirmary = isDark?COLOR_DARK_WHITE:COLOR_BLACK

  return (
    <SafeAreaView style={GlobalStyle.safeAreaWrap}>
      {/* header (datePicker & listup)  */}
      <View style={styles.header}>
        {/* 비율을 맞추기 위해서 존재만 하는 코드 */}
      <Ionicons name="swap-vertical-outline" size={35} color='rgba(0,0,0,0)' />
        
        <Pressable
        onPress={() => setShowModal(true)}
        style={styles.datePicker}
        >
          <Text style={[GlobalStyle.font_title2, ModeColorStyle(isDark).font_DEFALUT]}>{year}.</Text>
          <Text style={[GlobalStyle.font_title2, ModeColorStyle(isDark).font_DEFALUT, {marginRight:5}]}>{changeNumberTwoLength(month)}</Text>
          <Ionicons name="chevron-down-outline" size={30} color={colorPirmary} />
        </Pressable>

        <Pressable
        onPress={() => setShowSortModal(true)}>
          <Ionicons name="swap-vertical-outline" size={35} color={colorPirmary} />
        </Pressable>
      </View>

      {/* 일기 list */}
      <ScrollView style={styles.listMainWrap}>
        {
          diaryList?.map((diary, index) => (
            <DiaryView
              dId={diary.d_id}
              key={index}
              date = {timestampToDate(diary.date)}
              title = {diary.title}
              mood = {diary.mood}
              weather = {diary.weather}
              img = {diary.image}
              voice = {diary.voice}
              content = {diary.content}
              setRedirect = {setRedirect}
              isDark={isDark}
            />
          ))
        }
      </ScrollView>

      {
        // datePicker Modal
        showModal &&
        <YMPicker 
          animationType = 'fade'
          visible={true}
  
          setShowModal = {setShowModal}
          month = {month}
          setMonth = {setMonth}
          year = {year}
          setYear = {setYear}
          
          isDark = {isDark}
        />
      }
      {
        // sort modal
        showSortModal &&
        <SortModal
          visible = {showSortModal}
          setVisible = {setShowSortModal}
          setHowSortDiary = {setHowSortDiary}
        />
      }
    </SafeAreaView>
  );
}

export default List;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "flex-end",
  },

  datePicker:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  listMainWrap:{
    marginTop :20
  }
});
