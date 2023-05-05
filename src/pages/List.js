import { Button, StyleSheet, Text, View,SafeAreaView, Pressable, ScrollView } from "react-native";
import React, {useState, useEffect} from "react";
import GlobalStyle from "../globalStyle/GlobalStyle";
import Ionicons from '@expo/vector-icons/Ionicons';
import YMPicker from "../components/datePicker/YMPicker";
import Calender from "../components/calender/Calender";
import Header from "../components/calender/Header";
import { changeNumberTwoLength } from "../util/Calender";
import { getDiaryList, timestampToDate } from "../util/firebase/CRUD";
import DiaryView from "../components/DiaryView";
import DeleteMessage from "../components/DeleteMessage";
import SortModal from "../components/SortModal";

const List = () => {

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

  return (
    <SafeAreaView style={GlobalStyle.safeAreaWrap}>
      {/* header (datePicker & listup)  */}
      <View style={styles.header}>
        {/* 비율을 맞추기 위해서 존재만 하는 코드 */}
      <Ionicons name="swap-vertical-outline" size={35} color='#f2f2f2' />
        
        <Pressable
        onPress={() => setShowModal(true)}
        style={styles.datePicker}
        >
          <Text style={[GlobalStyle.font_title2]}>{year}.</Text>
          <Text style={[GlobalStyle.font_title2, {marginRight:5}]}>{changeNumberTwoLength(month)}</Text>
          <Ionicons name="chevron-down-outline" size={30} color='black' />
        </Pressable>

        <Pressable
        onPress={() => setShowSortModal(true)}>
          <Ionicons name="swap-vertical-outline" size={35} color='black' />
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
            />
          ))
        }
      </ScrollView>

      {
        // datePicker Modal
        showModal &&
        <YMPicker 
          animationType = 'slide'
          visible={true}
  
          setShowModal = {setShowModal}
          month = {month}
          setMonth = {setMonth}
          year = {year}
          setYear = {setYear}
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
    backgroundColor: '#f2f2f2',
  },

  listMainWrap:{
    marginTop :20
  }
});
