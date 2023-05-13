import React from 'react';
import {SafeAreaView, View, StyleSheet, Text, Pressable, ScrollView, Image, Alert, useColorScheme} from 'react-native';
import GlobalStyle from '../../globalStyle/GlobalStyle';
import { Ionicons } from "@expo/vector-icons";
import { COLOR_BLACK, COLOR_DARK_BLUE, COLOR_DARK_SECONDARY, COLOR_DARK_THIRD, COLOR_DARK_WHITE, COLOR_LIGHT_BLUE, COLOR_LIGHT_PRIMARY, COLOR_WHITE } from '../../globalStyle/color';
import ModeColorStyle from '../../globalStyle/ModeColorStyle';

const SettingPremium = ({navigation}) => {
  const isDark = useColorScheme() === 'dark'

  const onPressBtnPremium = () => {
    // TODO to 현서 : 프리미엄 가입 코드 작성해주세요.
    alert('백엔드 작업 필요!')
  }

  const IconColor = isDark ? COLOR_DARK_BLUE : COLOR_LIGHT_BLUE


  return (
    <SafeAreaView style={GlobalStyle.safeAreaWrap}>
      {/* header */}
      <View style={GlobalStyle.header}>
        <Pressable
        onPress={() => navigation.pop()}>
          <Ionicons name="arrow-back-outline" size={36} color={isDark ? COLOR_DARK_WHITE : COLOR_BLACK}/>
        </Pressable>
        <Text style={[GlobalStyle.font_caption1, ModeColorStyle(isDark).font_DEFALUT]}>Premium</Text>
        <Ionicons name="arrow-back-outline" size={36} color="rgba(0,0,0,0)"/>
      </View>

      <ScrollView
      style={scrollS.mainWrap}>
        
        <View style={scrollS.header}>
          <Image source={require('../../../assets/images/logoIconNoBG.png')}
          style={{width: 66, height: 77}}
          />
          <View style={{alignItems:'flex-end'}}>
            <Image source={require('../../../assets/images/logo.png')}
            style={{width: 90, height: 24, marginTop:5}}/>
            <Text style={[GlobalStyle.font_caption2, ModeColorStyle(isDark).font_RED]}>프리미엄</Text>
          </View>
        </View>

        <View style={scrollS.itemBox}>
          <Ionicons name="images-outline" size={35} style={scrollS.icon} color={IconColor}/>
          <View style={scrollS.textBox}>
            <Text style={[GlobalStyle.font_body, textStyle(isDark).itemTextM]}>오늘의 사진 3장까지</Text>
            <Text style={[GlobalStyle.font_caption1, textStyle(isDark).itemTextS]}>세 장까지 증가한 오늘의 사진으로 더 많은 추억들을 남겨보세요!</Text>
          </View>
        </View>
        
        <View style={scrollS.itemBox}>
          <Ionicons name="text-outline" size={35} style={scrollS.icon} color={IconColor}/>
          <View style={scrollS.textBox}>
            <Text style={[GlobalStyle.font_body, textStyle(isDark).itemTextM]}>글자수 제한 해제</Text>
            <Text style={[GlobalStyle.font_caption1, textStyle(isDark).itemTextS]}>더 길고 더 자세히 오늘 하루를 기록해보세요!</Text>
          </View>
        </View>

        <View style={scrollS.itemBox}>
          <Ionicons name="book-outline" size={35} style={scrollS.icon} color={IconColor}/>
          <View style={scrollS.textBox}>
            <Text style={[GlobalStyle.font_body, textStyle(isDark).itemTextM]}>일기 주제 추천 갯수 증가</Text>
            <Text style={[GlobalStyle.font_caption1, textStyle(isDark).itemTextS]}>더 다양한 주제로 일기를 써보세요!</Text>
          </View>
        </View>

        <View style={scrollS.itemBox}>
          <Ionicons name="happy-outline" size={35} style={scrollS.icon} color={IconColor}/>
          <View style={scrollS.textBox}>
            <Text style={[GlobalStyle.font_body, textStyle(isDark).itemTextM]}>감정분석 다시하기 제공</Text>
            <Text style={[GlobalStyle.font_caption1, textStyle(isDark).itemTextS]}>‘어?! 나는 이런 기분이 아닌데?’ 다시하기 기능으로 내 감정을 제대로 분석해보세요</Text>
          </View>
        </View>

        <View style={scrollS.itemBox}>
          <Ionicons name="close-circle-outline" size={35} style={scrollS.icon} color={IconColor}/>
          <View style={scrollS.textBox}>
            <Text style={[GlobalStyle.font_body, textStyle(isDark).itemTextM]}>광고 제거</Text>
            <Text style={[GlobalStyle.font_caption1, textStyle(isDark).itemTextS]}>소곤소곤 내 거슬렸던 광고들이 사라져요!</Text>
          </View>
        </View>

        <View style={scrollS.itemBox}>
          <Ionicons name="library-outline" size={35} style={scrollS.icon} color={IconColor}/>
          <View style={scrollS.textBox}>
            <Text style={[GlobalStyle.font_body, textStyle(isDark).itemTextM]}>더 많은 기능들</Text>
            <Text style={[GlobalStyle.font_caption1, textStyle(isDark).itemTextS]}>프리미엄 사용자분들을 위해 추가될 더 많은 기능들을 이용해보세요!</Text>
          </View>
        </View>

      </ScrollView>

      {/* bottom */}
      <View style={[styles.bottomWrap, {backgroundColor : isDark ? COLOR_DARK_THIRD : COLOR_WHITE}]}>
        <Text style={[GlobalStyle.font_body, {color : isDark?COLOR_DARK_WHITE : COLOR_LIGHT_BLUE}]}>소곤소곤 프리미엄 가입하기</Text>
        <View style={styles.bottomMoney}>
          <Text style={[GlobalStyle.font_title1, ModeColorStyle(isDark).font_RED]}>$1</Text>
          <Text style={[GlobalStyle.font_body, ModeColorStyle(isDark).font_RED]}>/1개월</Text>
        </View>
        <Pressable
        onPress={() => onPressBtnPremium()}
        style={[ModeColorStyle(isDark).bg_RED, {alignItems:'center', justifyContent:'center', width:'100%', height: 60, borderRadius: 10, marginTop: 20}]}
        >
          <Text style={[GlobalStyle.fontWHITE, GlobalStyle.font_title2]}>월간 프리미엄 가입하기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomWrap: {
    width: '112%',
    height: 210,
    top: 35,
    left: '-6%',
    borderRadius: 30,

    alignItems: 'center',
    boxSizing: 'border-box',
    padding: 20,
    
    shadowColor: "#4E4981",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.20,
    shadowRadius: 4.65,

    elevation: 8,
  },
  bottomMoney:{
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15
  }
})

const scrollS = StyleSheet.create({
  mainWrap: {
    display: 'flex',
    alignContent: 'center',
  },
  header:{
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    boxSizing: 'border-box',
    marginBottom: 30
  },

  itemBox:{
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 25,
    position: 'relative',
  },
  icon:{
    width: '15%'
  },
  textBox:{
    width: '85%'
  },

});

const textStyle = (isDark) => StyleSheet.create({
  itemTextM:{
    color : isDark ? COLOR_DARK_WHITE : COLOR_BLACK
  },
  itemTextS: {
    color: isDark ? COLOR_DARK_SECONDARY : COLOR_LIGHT_PRIMARY,
    marginTop: 5
  }
})

export default SettingPremium;
