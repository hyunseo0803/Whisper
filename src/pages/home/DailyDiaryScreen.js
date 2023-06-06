import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Text, Dimensions, Image, ScrollView, Pressable, Alert } from 'react-native';
import LogoBlack from '../../../assets/images/Logo-black.png'
import LogoRed from '../../../assets/images/logo.png'
import { COLOR_DARK_FOURTH, COLOR_DARK_PRIMARY, COLOR_LIGHT_SECONDARY, COLOR_WHITE, COLOR_LIGHT_RED, COLOR_DARK_RED } from '../../globalStyle/color';
import GlobalStyle from '../../globalStyle/GlobalStyle';
import ModeColorStyle from '../../globalStyle/ModeColorStyle';
import {changeMonth, changeNumberTwoLength} from '../../util/Calender'
import PagerView from 'react-native-pager-view';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { getAudioData, playAudio, stopPlayAudio } from '../../util/audioRecord';
import {readDailyDiarys, setFeaturedDiaryImg} from '../../util/database.js'


function DailyDiaryScreen(props) {
  const {
    isDark,
    modalDate
  } = props;

  const [dateValues, setDateValues] = useState({
    year :'',
    month :'',
    day :''
  })
  const [diaryDatas, setDiaryDatas] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false)
  const [sound, setSound] = useState();
  const [rendering, setRendering] = useState(false)

  /**
   * 음성 녹음 재생 버튼
  */
  const handlePlayAudio = async(aId) => {
    const audioData = await getAudioData(aId)
    const sound = await playAudio(audioData, setIsPlaying)
    if(!sound){
      Alert.alert('재생할 녹음이 없습니다.')
    }else{
      setSound(sound)
      setIsPlaying(true)
    }
  }

  /**
   * 대표 이미지 지정 버튼
   * @param {number} id 
   * @param {string} date 
   */
  const handleSetFeaturedImg = (id, date, is_featured) => {
    const result = setFeaturedDiaryImg(id, date, is_featured);
    if(result){
      setRendering(prevRendering => !prevRendering)
    }
  }

  /**
   * 오늘 일기 받아오는 함수
   */
  const readDailyDiarysFun = async() => {
    setDiaryDatas(await readDailyDiarys(modalDate))
  }

  useEffect(() => {
    readDailyDiarysFun()
  }, [rendering])

  useEffect(() => {
    readDailyDiarysFun()

    const date = modalDate.split('-')
    setDateValues({year:date[0], month:changeMonth(date[1]*1), day:date[2]})
  }, []);

  return (
    <View
    style={[styles(isDark).background]}
  >
    {/* 막대 바 */}
    <View style={styles(isDark).header}>
    {isDark ? (
          <Image source={LogoRed} style={[styles(isDark).logo]} />
        ) : (
          <Image source={LogoBlack} style={[styles(isDark).logo]} />
        )}
      <View style={styles(isDark).scrollBar}/>
      <Text style={[styles(isDark).yearText, GlobalStyle.font_caption1, ModeColorStyle(isDark).font_DEFALUT]}>{dateValues.year}</Text>
    </View>
    
    <View style={styles(isDark).dateWrap}>
      <Text style={[styles(isDark).dateMonth, GlobalStyle.font_title2, ModeColorStyle(isDark).font_DEFALUT]}>{dateValues.month}</Text>
      <Text style={[styles(isDark).dateDay, GlobalStyle.font_title1, ModeColorStyle(isDark).font_DEFALUT]}>{dateValues.day}</Text>
    </View>

    <View style={[{flex:1, width:'100%'}]}>
      <PagerView style={{flex:1}} initialPage={0}
      overdrag={diaryDatas.length===1? false:true}
      >
        {
          diaryDatas.map((datas, index, array) => (
            <ScrollView style={styles(isDark).scrollWrap} key={datas.id}>

              {
                // 이미지
                datas.image !== '' &&
                <View style={styles(isDark).imgWrap}>
                  <Image source={{ uri:  datas.image }} style={styles(isDark).imgStyle} />
                  <AntDesign name={datas.is_featured===0 ? "staro" : 'star'} size={25} color={isDark ? COLOR_DARK_RED : COLOR_LIGHT_RED}
                  style={{position: 'absolute', right: 10, top:10}} 
                  onPress={() => handleSetFeaturedImg(datas.id, datas.date, datas.is_featured)}/>
                </View>
              }
              <Text style={[styles(isDark).pageText, GlobalStyle.font_caption1, ModeColorStyle(isDark).font_DEFALUT,
              {display : array.length===1?'none':'flex'}]}>{index+1}/{array.length}</Text>

              {
                // 음성 재생&중지 버튼
                datas.audio_id !== null &&
                <Pressable
                style={{marginTop: 10, alignItems: 'center'}}
                onPress={() => !isPlaying ? handlePlayAudio(datas.audio_id) : stopPlayAudio(sound, setIsPlaying, isPlaying)}>
                <Ionicons 
                  name={isPlaying ? "pause-circle" : "play-circle"} 
                  size={40} 
                  color={isDark?COLOR_DARK_RED : COLOR_LIGHT_RED} />
                </Pressable> 
              }
              <Text style={[styles(isDark).titleText, GlobalStyle.font_title2, ModeColorStyle(isDark).font_DEFALUT]}>{datas.title}</Text>
              <Text style={[styles(isDark).contentText, GlobalStyle.font_body, ModeColorStyle(isDark).font_DEFALUT]}>{datas.content}</Text>
            </ScrollView> 
          ))
        }
        </PagerView>
    </View>
  </View>
  );
}

const styles = (isDark) => StyleSheet.create({
  /**
   * 모달창 배경
   */
  background : {
    backgroundColor: isDark?COLOR_DARK_FOURTH:COLOR_WHITE,
    padding: 15,
    height: '100%',
    alignItems:'center'
  },
  /**
   * 모달 해더 스타일
   */
  header:{
    flexDirection:'row',
    justifyContent:'space-between', 
    width:'100%',
  },
  /**
   * 스크롤 바 스타일
   */
  scrollBar : {
    width: 60,
    height: 5,
    borderRadius: '50%',
    backgroundColor: isDark?COLOR_DARK_PRIMARY:COLOR_LIGHT_SECONDARY,
    marginBottom: 20
  },
  /**
   * 로고 스타일
   */
  logo:{
    width: 50,
    height: 22,
    resizeMode: 'contain',
  },
  yearText:{
    width: 60,
    textAlign: 'right'
  },

  /**
   * 스크롤 가능한 구역 스타일
   */
  scrollWrap:{
    width: '100%'
  },

  /**
   * 날짜 wrap
   */
  dateWrap:{
    display: 'flex',
    alignItems: 'center',
    marginTop: 20
  },
  dateMonth:{
    marginBottom: 5,
  },
  dateDay:{
    marginBottom: 30
  },
  
  /**
   * 이미지 wrap
   */
  imgWrap:{
    position: 'relative',
    width: '100%',
    height: Dimensions.get('window').width-30,  // 정사각형을 만들기 위해.
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: isDark ? 0 : 0.29,
    shadowRadius: 4.65,
    marginBottom: 10,
  },
  imgStyle:{
    flex: 1,
    borderRadius: 20,
    resizeMode: 'cover'
  },

  /**
   * text 스타일
   */
  pageText:{
    textAlign: 'center'
  },
  titleText:{
    marginTop: 20,
    marginBottom: 10,
    width: '100%',
    textAlign: 'center',
  },
  contentText:{
    marginBottom: 50,
    width: '100%',
    textAlign: 'center',
  }
});

export default DailyDiaryScreen;
