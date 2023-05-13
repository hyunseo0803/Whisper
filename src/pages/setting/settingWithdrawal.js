import React from 'react';
import {View, StyleSheet, SafeAreaView, Text, Pressable, Image, Alert, useColorScheme} from 'react-native';
import GlobalStyle from '../../globalStyle/GlobalStyle';
import { Ionicons } from "@expo/vector-icons";
import { COLOR_BLACK, COLOR_DARK_WHITE } from '../../globalStyle/color';
import ModeColorStyle from '../../globalStyle/ModeColorStyle';


const SettingWithdrawal = ({navigation}) => {
  const isDark = useColorScheme() ==='dark'

  const onPressBtnWithdrawal = () => {
    Alert.alert('회원탈퇴', '회원 탈퇴를 하시면, 정말로 되돌릴 수 없어요! 회원탈퇴를 할까요?',
    [
      {
        text:'취소',
      },
      {
        text: '회원 탈퇴',
        onPress: () => {
          // TODO to 현서 : 회원탈퇴 백엔드코드 작성해주세요
        }
      }
    ])
  }

  return (
    <SafeAreaView style={[GlobalStyle.safeAreaWrap, styles.mainWrap]}>
            {/* header */}
      <View style={GlobalStyle.header}>
        <Pressable
        onPress={() => navigation.pop()}>
          <Ionicons name="arrow-back-outline" size={36} color={isDark?COLOR_DARK_WHITE:COLOR_BLACK}/>
        </Pressable>
        <Text style={[GlobalStyle.font_caption1, ModeColorStyle(isDark).font_DEFALUT]}>Withdrawal</Text>
        <Ionicons name="arrow-back-outline" size={36} color="rgba(0,0,0,0)"/>
      </View>

      {/* body */}
      <View style={styles.body}>
        <Image source={require('../../../assets/images/logoIconNoBG.png')}
          style={{width: 66, height: 77}}
        />
        <Text style={[GlobalStyle.font_title2, ModeColorStyle(isDark).font_RED]}>탈퇴하시면,</Text>
        <Text style={[GlobalStyle.font_body, ModeColorStyle(isDark).font_RED]}>- 프리미엄 구독 내역이 모두 사라져요!</Text>
        <Text style={[GlobalStyle.font_body, ModeColorStyle(isDark).font_RED]}>- 작성했던 일기와 사진들이 모두 사라져요!</Text>
      </View>

      <View style={styles.footer}>
        <Text style={[ModeColorStyle(isDark).font_BLUE, GlobalStyle.font_body]}>소곤소곤을 떠나실건가요?</Text>
        <Pressable
        onPress={() => onPressBtnWithdrawal()}
        style={[ModeColorStyle(isDark).bg_RED, {alignItems:'center', justifyContent:'center', width:'100%', height: 60, borderRadius: 10, marginTop: 20}]}
        >
          <Text style={[GlobalStyle.fontWHITE, GlobalStyle.font_title2]}>회원 탈퇴하기</Text>
        </Pressable>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainWrap:{
    flex: 1,
    justifyContent: 'space-between'
  },
  body:{

  },
  footer:{
    alignItems: 'center'
  }
})

export default SettingWithdrawal;
