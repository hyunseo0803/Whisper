import { SafeAreaView, Pressable, StyleSheet, Text, View, Alert, useColorScheme, Switch } from "react-native";
import React, { useState, useEffect } from "react";
import GlobalStyle from "../globalStyle/GlobalStyle";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import ModeColorStyle from "../globalStyle/ModeColorStyle";
import { COLOR_BLACK, COLOR_DARK_THIRD, COLOR_DARK_WHITE, COLOR_LIGHT_RED, COLOR_LIGHT_SECONDARY } from "../globalStyle/color";
import { EventRegister } from 'react-native-event-listeners'
import { loadThemeMode, saveThemeMode } from "../util/storage";

const Setting = ( {navigation }) => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const loadThemeFun = async() => {
      setIsDark(await loadThemeMode()==='dark')
    }
    loadThemeFun()
  }, []);
  console.log('setting',isDark)

  /**
   * 화면 모드에 따른 아이콘 색 변경
   */
  const IconColor = isDark ? COLOR_DARK_WHITE : COLOR_BLACK

  return (
    <SafeAreaView style={[styles.container, GlobalStyle.safeAreaWrap]}>
      <View style={{width:'100%', alignItems: 'center', marginTop: -30}}>
      <Text style={[GlobalStyle.font_title1, {marginBottom: 66}, ModeColorStyle(isDark).font_DEFALUT]}>SETTING</Text>
        <Pressable
        style={[styles.buttomWrap, styles.justifyContentSB, borderStyle(isDark)]}
        onPress={() => navigation.navigate('settingAlert')}>
          <View style={styles.flexDirectionRow}>
          <Ionicons name="notifications-circle-outline" size={36} style={{marginLeft:-2}} color={IconColor}/>
            <Text style={[GlobalStyle.font_body, {marginLeft:7}, ModeColorStyle(isDark).font_DEFALUT]}>알림시간설정</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={25} color={IconColor}></Ionicons>
        </Pressable>

        <View
        style={[styles.buttomWrap, styles.justifyContentSB, borderStyle(isDark)]}
        onPress={() => navigation.navigate('settingScreenMode')}>
          <View style={styles.flexDirectionRow}>
          <Ionicons name="contrast" size={34} style={{marginLeft:-2, marginRight:2}} color={IconColor}/>
            <Text style={[GlobalStyle.font_body, {marginLeft:7}, ModeColorStyle(isDark).font_DEFALUT]}>다크모드</Text>
          </View>
          <Switch
            value = {isDark}
            onValueChange = {(value) => {
              setIsDark(value);
              saveThemeMode(value);
              EventRegister.emit('ChangeTheme', value)
            }}
          />
        </View>

        <Pressable
        style={[styles.buttomWrap, styles.justifyContentSB, borderStyle(isDark)]}
        onPress={() => navigation.navigate('settingContact')}>
          <View style={styles.flexDirectionRow}>
            <AntDesign name="questioncircleo" size={30} color={IconColor} />
            <Text style={[GlobalStyle.font_body, {marginLeft:10}, ModeColorStyle(isDark).font_DEFALUT]}>문의하기</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={25} color={IconColor}></Ionicons>
        </Pressable>

        <Pressable
        style={[styles.buttomWrap, styles.justifyContentSB, borderStyle(isDark)]}
        onPress={() => navigation.navigate('settingContactLog')}>
          <View style={styles.flexDirectionRow}>
            <Ionicons name="list-circle-outline" size={36} style={{marginLeft:-2}} color={IconColor}></Ionicons>
            <Text style={[GlobalStyle.font_body, {marginLeft:7}, ModeColorStyle(isDark).font_DEFALUT]}>문의 기록 보기</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={25} color={IconColor}></Ionicons>
        </Pressable>

        {/* 프리미엄 기능 보류 */}
        {/* <Pressable
        style={[styles.buttomWrap, styles.justifyContentSB, borderStyle(isDark)]}
        onPress={() => navigation.navigate('settingPremium')}>
          <View style={styles.flexDirectionRow}>
            <AntDesign name="staro" size={30} color={IconColor} />
            <Text style={[GlobalStyle.font_body, {marginLeft:10}, ModeColorStyle(isDark).font_DEFALUT]}>소곤소곤 프리미엄 가입</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={25} color={IconColor}></Ionicons>
        </Pressable> */}
      </View>
    </SafeAreaView>
  );
}

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  },
  buttomWrap:{
    width: '100%',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,

  },
  justifyContentSB:{
    justifyContent: 'space-between'
  },
  flexDirectionRow:{
    flexDirection: "row",
    alignItems: 'center'
  }
});

const borderStyle = (isDark) => StyleSheet.create({
  borderTopWidth: 1,
  borderColor: isDark ? COLOR_DARK_THIRD : COLOR_LIGHT_SECONDARY,
})