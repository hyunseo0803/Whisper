import { Entypo, Feather, Ionicons, Octicons } from '@expo/vector-icons';
import React, { useContext, useState, useEffect, useRef } from 'react';
import {View, StyleSheet, SafeAreaView, Pressable, Text, Switch, Modal} from 'react-native';
import { LockModal } from '../../components/PasswordModal';
import { COLOR_BLACK, COLOR_DARK_BLUE, COLOR_DARK_SECONDARY, COLOR_DARK_THIRD, COLOR_DARK_WHITE, COLOR_LIGHT_SECONDARY, COLOR_LIGHT_THIRD } from '../../globalStyle/color';
import GlobalStyle from '../../globalStyle/GlobalStyle';
import ModeColorStyle from '../../globalStyle/ModeColorStyle';
import themeContext from '../../globalStyle/themeContext';
import { loadPassword, savePassword } from '../../util/storage';

const SettingScreenLock = ({ navigation }) => {
  const isDark = useContext(themeContext).theme === 'dark'

  const [IsPassword, setIsPassword] = useState(false);
  const [IsFaceId, setIsFaceId] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const [isPasswordSave, setIsPasswordSave] = useState(false);

  useEffect(() => {
    const loadPasswordFun = async() => {
      const result = await loadPassword()
      if(!result){
        setIsPassword(false)
      }else{
        setIsPassword(true)
      }
    }
    loadPasswordFun()
  }, [])


  return (
    <SafeAreaView style={GlobalStyle.safeAreaWrap}>
      {/* header */}
      <View style={GlobalStyle.header}>
        <Pressable
          onPress={() => navigation.pop()}>
            <Feather name="chevron-left" size={36} color={isDark?COLOR_DARK_WHITE : COLOR_BLACK} />
        </Pressable>
        <Text style={[GlobalStyle.font_caption1, ModeColorStyle(isDark).font_DEFALUT]}>Screen Lock</Text>
        <Feather name="chevron-left" size={36} color="rgba(0,0,0,0)" />
      </View>

      {/* body */}
      <View>
        <View style={{marginTop: 30, marginBottom: 10}}>
          <Text style={[GlobalStyle.font_body, {color:isDark?COLOR_DARK_SECONDARY:COLOR_LIGHT_SECONDARY}]}>비밀번호 분실 시 찾을 수 없습니다.</Text>
          <Text style={[GlobalStyle.font_body, {color:isDark?COLOR_DARK_SECONDARY:COLOR_LIGHT_SECONDARY}]}>비밀번호, 생체인식 중 하나만 활성화 할 수 있습니다.</Text>
        </View>

        {/* 비밀번호 */}
        <View style={styles.wrap}>
          <View style={styles.iconTextWrap}>
            <View style={styles.iconWrap}>
              <Octicons name="lock" size={24} style={ModeColorStyle(isDark).font_DEFALUT}/>
            </View>
            <Text style={[GlobalStyle.font_body, ModeColorStyle(isDark).font_DEFALUT]}>비밀번호</Text>
          </View>
          <Switch
            value = {IsPassword}
            style={{ transform: [{ scaleX: 0.8 }, { scaleY: .8 }] }}
            // thumbColor={isDark?COLOR_DARK_RED: COLOR_LIGHT_RED}
            trackColor={
              {true : COLOR_DARK_BLUE}
            }
            onValueChange = {(value) => {
              if(value === false){
                savePassword('')
                setIsPassword(value)
              }else if(!IsFaceId){
                setIsPassword(value)
                setShowModal(true)
              }
            }}
          />
        </View>
        
        {
          IsPassword  &&
          // 비밀번호 변경 버튼
          <Pressable style={[styles.wrap, lineStyle(isDark).top_line]}
          onPress={() => setShowModal(true)}>
            <View style={styles.iconTextWrap}>
              <View style={styles.iconWrap}>
                <Octicons name="key" size={24} style={ModeColorStyle(isDark).font_DEFALUT}/>
              </View>
              <Text style={[GlobalStyle.font_body, ModeColorStyle(isDark).font_DEFALUT]}>비밀번호 변경</Text>
            </View>
          </Pressable>
        }

      </View>

      {
        showModal &&
        <LockModal showModal={showModal} setShowModal={setShowModal}/>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  iconTextWrap:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },  
  textS:{
    marginLeft: 10
  },  
  iconWrap:{
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignContent: 'center',
    marginRight: 5
  },
  wrap:{
    width: '100%',
    height: 55,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
})

const lineStyle = (isDark) => StyleSheet.create({
  top_line: {
    borderTopWidth: 1,
    borderTopColor: isDark?COLOR_DARK_THIRD:COLOR_LIGHT_THIRD
  }
})

export default SettingScreenLock;