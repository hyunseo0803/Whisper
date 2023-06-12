import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useState, useEffect, useRef } from 'react';
import {View, StyleSheet, SafeAreaView, Text, Pressable, Vibration, Animated, Easing} from 'react-native';
import { COLOR_DARK_RED, COLOR_DARK_SECONDARY, COLOR_LIGHT_RED, COLOR_LIGHT_SECONDARY } from '../../globalStyle/color';
import GlobalStyle from '../../globalStyle/GlobalStyle';
import ModeColorStyle from '../../globalStyle/ModeColorStyle';
import themeContext from '../../globalStyle/themeContext';
import { loadPassword } from '../../util/storage';

const ScreenlockPw = (props) => {
  const {isDark, setHavePW} = props

  const [password, setPassword] = useState('')
  const [truePW, setTruePW] = useState('')
  const passwordLength = 4
  const [plzPwText, setPlzPwText] = useState('비밀번호를 입력해주세요') // 비밀번호가 틀렸습니다!
  const animatedValue = useRef(new Animated.Value(0)).current;

  // 키보드 배열
  const keybordArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'delete'];

  /**
   * 키보드 입력 받는 함수
   * @param {number} keybord 
   */
  const handleInputChange = (keybord) => {
    setPassword(password+keybord)
  }

  /**
   * 입력값을 지우는 함수
   */
  const handleInputDelete = () => {
    setPassword(password.slice(0, -1))
  }

  useEffect(() => {
    const loadPw = async() => {
      setTruePW(await loadPassword())
    }
    loadPw()
  }, []);

  /**
   * 좌우로 흔들리는 애니메이션
   */
  const startShakeAnimation = () => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: -1,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animatedStyle = {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [-1, 1],
          outputRange: [-10, 10],
        }),
      },
    ],
  };


  useEffect(() => {
    if(password.length === passwordLength){
      if(password !== truePW){
        startShakeAnimation();
        Vibration.vibrate()
        setPlzPwText('비밀번호가 틀렸습니다!')
        setPassword('')
      }else{
        setHavePW(false)
      }
    }
  }, [password]);

  useEffect(() => {
  }, []);

  return (
    <SafeAreaView style={[GlobalStyle.safeAreaWrap, {position:'relative'}
    , { backgroundColor: isDark ? '#1C1C1E' : 'rgb(242, 242, 242)'}]}>

      <View style={ModalStyles.headWrap}>
        <Animated.Text style={[ModalStyles.plz_pw_text, GlobalStyle.font_title2, ModeColorStyle(isDark).font_DEFALUT, animatedStyle]}>{plzPwText}</Animated.Text>
        {/* 비밀번호 동그라미 wrap*/}
        <View style={[ModalStyles.passwordRoundWrap]}>
          {
            Array.from({ length: passwordLength },(_, index) => (
              <PasswordModal key={index} text={password[index]} isDark={isDark}/>
            ))
          }
        </View>
      </View>

      {/* 패스워드 입력 */}
      <View style={keybordStyle(isDark).mainWrap}>
        {
          keybordArr.map((keybord, index) => {
            if(keybord === 'delete'){
              return(
                <Pressable style={keybordStyle(isDark).keybordWrap}
                key={index}
                onPress={() => handleInputDelete()}>
                  <Ionicons name="ios-backspace" size={28} style={ModeColorStyle(isDark).font_DEFALUT} />
                </Pressable>
              )
            }
            return(
              <Pressable style={keybordStyle(isDark).keybordWrap}
              key={index}
              onPress={() => handleInputChange(keybord)}>
                <Text style={[GlobalStyle.font_title2, ModeColorStyle(isDark).font_DEFALUT]}>{keybord}</Text>
              </Pressable>
            )
          })
        }
      </View>
    </SafeAreaView>
  );
}

const ModalStyles = StyleSheet.create({
  background:{
    display: 'flex',
    flex: 1
  },
  
  /**
   * 뒤로가기 버튼
   */
  btnCancle:{
    position: 'absolute',
    top: 50,
    right: 0
  },


  headWrap:{
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /**
   * 비밀번호전체 감싸는 view
   */
  passwordRoundWrap:{
    display: 'flex',
    flexDirection: 'row',
  },

  /**
   * 안내 글자
   */
  plz_pw_text:{
    textAlign: 'center',
    marginBottom: 20
  }
})

const keybordStyle = (isDark) => StyleSheet.create({
  mainWrap: {
    width: '100%',
    flexWrap: 'wrap',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  keybordWrap:{
    width: '30%',
    height: 50,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default ScreenlockPw;


/**
 * 비밀번호 동그라미
 * @param props 
 * @returns 비밀번호 동그라미 
 */
 const PasswordModal = (props) => {
  const { text, isDark } = props;

  const circleColor = text ? isDark?COLOR_DARK_RED:COLOR_LIGHT_RED : isDark?COLOR_DARK_SECONDARY:COLOR_LIGHT_SECONDARY;

  return (
    <View
      style={[
        styles.passwordRound,
        { backgroundColor: circleColor },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  passwordRound: {
    width: 15,
    height: 15,
    borderRadius: 10,
    margin: 10
  },
});
