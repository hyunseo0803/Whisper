import React, {useEffect, useState, useRef} from "react";
import { View, StyleSheet, Text, Pressable, ImageBackground, useColorScheme, Modal, Alert } from "react-native";
import { COLOR_BLACK, COLOR_DARK_BLUE, COLOR_DARK_FOURTH, COLOR_DARK_RED, COLOR_DARK_SECONDARY, COLOR_DARK_THIRD, COLOR_DARK_WHITE, COLOR_LIGHT_BLUE, COLOR_LIGHT_RED, COLOR_LIGHT_SECONDARY, COLOR_LIGHT_THIRD } from "../../globalStyle/color";
import GlobalStyle from "../../globalStyle/GlobalStyle";
import DailyDiaryScreen from "../../pages/home/DailyDiaryScreen";
import BottomSheet from 'reanimated-bottom-sheet';
import { changeNumberTwoLength, getMonthDays } from "../../util/Calender";


function Body(props) {
  const isDark = useColorScheme() === 'dark'

  // props 데이터들
  const {
    year,
    month,
    data,
  } = props;

  // modal에 들어가는 values
  const [ModalValue, setModalValue] = useState({
    title: '',
    content: '',
    day: 0,
    imguri: '',
  });
  const [totalDays, setTotalDays] = useState([]);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const DATA = data;

  const ModalSheetRef = useRef(null);
  const renderContent = () => (
    <DailyDiaryScreen
      year = {year}
      month = {month}
      day = {ModalValue.day}
      modalImg ={ModalValue.imguri}
      content = {ModalValue.content}
      title = {ModalValue.title}
      isDark ={isDark}
    />
  );


  // 연, 월 이 바뀔 때마다 한 번씩만 실행
  useEffect(() => {
    setTotalDays(getMonthDays(year, month))
  }, [year, month])

  /**
   * 해당 날짜에 이미지를 찾아주는 함수
   * @param {int} day 
   * @returns {string}imgUrl
   */
  const FindImg = (day) => {
    let img = DATA.find(data => data.date === `${year}-${changeNumberTwoLength(month)}-${changeNumberTwoLength(day)}`)
    return img?.image
  }

  /**
   * 해당 날짜에 일기가 있는지 검색
   * @param {int} day 
   * @returns true,false
   */
  const haveDiary = (day) => {
    let datas = DATA.find(data => data.date === `${year}-${changeNumberTwoLength(month)}-${changeNumberTwoLength(day)}`)
    if(datas?.title === '' || datas?.title === undefined) {
      return false
    }
    else{
      return true
    }
  }
  
  /**
   * 해당 날짜의 modal values find
   * @param {int} day 
   */
  const findModalValue = (day) => {
    let datas = DATA.find(data => data.date === `${year}-${changeNumberTwoLength(month)}-${changeNumberTwoLength(day)}`)
    setModalValue({...ModalValue, day:day, imguri:datas?.image, title:datas?.title, content:datas?.content})
  }

  // 요일 날짜 배열
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  useEffect(() => {
    if(showPhotoModal) {
      ModalSheetRef.current.snapTo(0)
    }
  }, [showPhotoModal])

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
                        if(haveDiary(day)){
                          findModalValue(day)
                          setShowPhotoModal(true)
                        }
                        else{
                          Alert.alert('일기가 없습니다!', `${day}일의 일기가 없습니다. 일기를 작성하고 조회해보세요!`)
                        }
                      }}
                    }>
                      <ImageBackground 
                      source={{url: FindImg(day) === undefined ? "" : FindImg(day)}}
                      style={[{width: "100%", height: "100%" }, day===''? {opacity:0} : {opacity: 0.6}, {backgroundColor: haveDiary(day) ? isDark?COLOR_DARK_SECONDARY:COLOR_LIGHT_SECONDARY : isDark ? COLOR_DARK_THIRD : COLOR_LIGHT_THIRD}]}
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
        showPhotoModal&&
        <Modal
          visible={showPhotoModal}
          transparent={true}
          animationType={'fade'}
          style={{flex:1}}
        >
          <View
          style={{flex:1, backgroundColor:"rgba(0,0,0,0.5)", justifyContent:'center', alignItems: 'center'}}
          >
          <BottomSheet
            ref={ModalSheetRef}
            snapPoints={['95%','0%']}
            borderRadius={20}
            renderContent={renderContent}
            onCloseEnd={() => setShowPhotoModal(false)}
          />
          </View>

        </Modal>
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

const dayBackGroundS = (haveDiary, isDark) => StyleSheet.create({
  background:{
    backgroundColor: haveDiary ? isDark?COLOR_DARK_THIRD:COLOR_LIGHT_SECONDARY : isDark?COLOR_DARK_FOURTH:COLOR_LIGHT_THIRD
  }
})