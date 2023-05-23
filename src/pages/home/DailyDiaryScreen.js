import React from 'react';
import { View, StyleSheet, Text, Dimensions, Image, ScrollView } from 'react-native';
import LogoBlack from '../../../assets/images/Logo-black.png'
import LogoRed from '../../../assets/images/logo.png'
import { COLOR_DARK_FOURTH, COLOR_DARK_PRIMARY, COLOR_LIGHT_SECONDARY, COLOR_WHITE } from '../../globalStyle/color';
import GlobalStyle from '../../globalStyle/GlobalStyle';
import ModeColorStyle from '../../globalStyle/ModeColorStyle';
import {changeMonth, changeNumberTwoLength} from '../../util/Calender'

function DailyDiaryScreen(props) {
  const {
    year,
    month,
    day,
    modalImg,
    content,
    title,
    isDark,
  } = props;

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
      <Text style={[styles(isDark).yearText, GlobalStyle.font_caption1, ModeColorStyle(isDark).font_DEFALUT]}>{year}</Text>

    </View>

    <ScrollView style={styles(isDark).scrollWrap}>
      {/* <Text>Swipe down to close TEst</Text> */}
      <View style={styles(isDark).dateWrap}>
        <Text style={[styles(isDark).dateMonth, GlobalStyle.font_title2, ModeColorStyle(isDark).font_DEFALUT]}>{changeMonth(month)}</Text>
        <Text style={[styles(isDark).dateDay, GlobalStyle.font_title1, ModeColorStyle(isDark).font_DEFALUT]}>{changeNumberTwoLength(day)}</Text>
      </View>

      {
        modalImg !== '' &&
        <View style={styles(isDark).imgWrap}>
          <Image source={{ uri:  modalImg }} style={styles(isDark).imgStyle} />
        </View>
      }
      
      <Text style={[styles(isDark).titleText, GlobalStyle.font_title2, ModeColorStyle(isDark).font_DEFALUT]}>{title}</Text>
      <Text style={[styles(isDark).contentText, GlobalStyle.font_body, ModeColorStyle(isDark).font_DEFALUT]}>{content}</Text>
    </ScrollView>
  </View>
      // <View style={styles.topWrap}>

      // <View style={styles.contentWrap}>
      // </View>
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
    marginBottom: 25
  },
  imgStyle:{
    flex: 1,
    borderRadius: 20,
    resizeMode: 'cover'
  },

  /**
   * text 스타일
   */
  titleText:{
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
