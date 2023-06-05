import React, {useState} from 'react';
import {View, StyleSheet, Text, Image, Pressable, Alert, TouchableOpacity} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import GlobalStyle from '../globalStyle/GlobalStyle';
import DeleteMessage from './DeleteMessage';
import { COLOR_BLACK, COLOR_DARK_BG, COLOR_DARK_FIVTH, COLOR_DARK_FOURTH, COLOR_DARK_PRIMARY, COLOR_DARK_RED, COLOR_DARK_WHITE, COLOR_LIGHT_BG, COLOR_LIGHT_FOURTH, COLOR_LIGHT_PRIMARY, COLOR_LIGHT_RED } from '../globalStyle/color';
import ModeColorStyle from '../globalStyle/ModeColorStyle';
import { getAudioData, playAudio, stopPlayAudio } from '../util/audioRecord';

/**
 * 
 * @param {props} did 
 * @param {props} date 
 * @param {props} title 
 * @param {props} mood 
 * @param {props} weather 
 * @param {props} img 
 * @param {props} audioObj
 * @param {props} content 
 * @param {props} setRedirect 
 * @param {props} isDark 
 * @returns 
 */
const DiaryView = (props) => {

  const [showDeleteModal, setShowDeleteModal] = useState(false) // 삭제 버튼 모달
  const [isPlaying, setIsPlaying] = useState(false)
  const [sound, setSound] = useState()

  const {
    dId,
    date,
    title,
    mood,
    weather,
    img,
    audioObj,
    content,
    setRedirect,
    isDark
  } = props;

  const imgUrl = {uri : img}  // 이미지 주소
  
  /**
   * 이미지의 로컬 경로를 리턴하는 함수
   * @param {string} moodWeather 
   * @returns require(url)
   */
  const MoodWeatherFile = (moodWeather) => {
    switch (moodWeather) {
      case 'sunny': return require('../../assets/images/weather/sunny.png')
      case 'littleCloud': return require('../../assets/images/weather/littleCloud.png')
      case 'cloudy': return require('../../assets/images/weather/cloudy.png')
      case 'lightning': return require('../../assets/images/weather/lightning.png')
      case 'rain': return require('../../assets/images/weather/rain.png')
      case 'snow': return require('../../assets/images/weather/snow.png')
      case 'sunny': return require('../../assets/images/weather/sunny.png')
      case 'angry': return require('../../assets/images/mood/angry.png')
      case 'disgust': return require('../../assets/images/mood/disgust.png')
      case 'expressionless': return require('../../assets/images/mood/expressionless.png')
      case 'fear': return require('../../assets/images/mood/fear.png')
      case 'happy': return require('../../assets/images/mood/happy.png')
      case 'sad': return require('../../assets/images/mood/sad.png')
      case 'surprised': return require('../../assets/images/mood/surprised.png')
    }
  }

  /**
   * 삭제 모달 버튼
   */
  const onClickDelete = () => {
    setShowDeleteModal(true)
  }

  /**
   * 음성 녹음 재생 버튼
   */
  const onClickVoice = async() => {
    const audioData = await getAudioData(audioObj.audio_id)
    const sound = await playAudio(audioData, setIsPlaying)
    if(!sound){
      Alert.alert('재생할 녹음이 없습니다.')
    }else{
      setSound(sound)
      setIsPlaying(true)
    }
  }

  return (
    <View style={[styles.mainWrap, (isDark ? '' : styles.shadow), {backgroundColor : isDark ? COLOR_DARK_FOURTH : '#fff'}]}>
      <Text style={[{marginBottom: 5}, GlobalStyle.font_caption2, ModeColorStyle(isDark).font_DEFALUT]}>{date}</Text>
      <Text style={[{marginBottom: 5}, GlobalStyle.font_title1, ModeColorStyle(isDark).font_DEFALUT]}>{title}</Text>
      
      <TouchableOpacity
      style={styles.btnDelete}
      onPress={() => onClickDelete()}
      >
        <Ionicons name="ellipsis-vertical-outline" size={25} color={isDark ? COLOR_DARK_WHITE : COLOR_BLACK} />
      </TouchableOpacity>
      
      <View style={styles.moodWeatherWrap}>
        <Image style={styles.moodWeatherImg} source={MoodWeatherFile(mood)}/>
        <Image style={styles.moodWeatherImg} source={MoodWeatherFile(weather)}/>
      </View>
      {
        // 이미지가 없으면 자리차지 없도록 설정
        img !== '' &&
        (<View style={styles.imgWrap}>
          <Image source={imgUrl} style={styles.imgBox}/>
        </View>)
      }
            
      <View style={styles.textWrap}>
        {
          // 음성이 없으면 마이크 아이콘 나타나지 않도록 설정
          audioObj.audio_id !== null &&
          <TouchableOpacity
          style={{marginBottom: 10}}
          onPress={() => !isPlaying ? onClickVoice() : stopPlayAudio(sound, setIsPlaying, isPlaying)}>
          <Ionicons name={isPlaying ? "pause-circle" : "play-circle"} size={40}
          color={isDark ? COLOR_DARK_RED : COLOR_LIGHT_RED} />
          </TouchableOpacity>
        }
        <Text style={[GlobalStyle.font_body, {textAlign: 'center'}, ModeColorStyle(isDark).font_DEFALUT]}>{content}</Text>
      </View>


      {
        // DeleteButton Modal
        showDeleteModal && 
        <DeleteMessage
        visible = {showDeleteModal}
        setVisible = {setShowDeleteModal}
        wantDelteId = {dId}
        wantDelteDate = {date}
        setRedirect = {setRedirect}
        />
      }

    </View>
  );
}

const styles = StyleSheet.create({
  mainWrap:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 30,
    paddingVertical: 25,
    position: 'relative',
  },
  shadow:{
    shadowColor: "#4E4981",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 5,
  },

  btnDelete:{
    position: 'absolute',
    top: 20,
    right: 20
  },

  moodWeatherWrap:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    marginTop: 5
  },
  moodWeatherImg:{
    width: 25,
    height: 25,
    marginHorizontal: 10
  },

  imgBox:{
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  imgWrap:{
    width: 250,
    height: 250,
    marginBottom: 25
  },

  textWrap:{
    width: '80%',
    alignItems: 'center'
  }
})

export default DiaryView;
