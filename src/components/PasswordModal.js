import { Ionicons } from "@expo/vector-icons";
import { useContext, useState, useEffect } from "react";
import { Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { COLOR_DARK_RED, COLOR_DARK_SECONDARY, COLOR_LIGHT_RED, COLOR_LIGHT_SECONDARY } from "../globalStyle/color";
import GlobalStyle from "../globalStyle/GlobalStyle";
import ModeColorStyle from "../globalStyle/ModeColorStyle";
import themeContext from "../globalStyle/themeContext";
import { savePassword } from "../util/storage";

export const LockModal = (props) => {
  const isDark = useContext(themeContext).theme === 'dark'
  const {
    showModal,
    setShowModal
  } = props

  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const passwordLength = 4

  const [pwCheckScreen, setPwCheckScreen] = useState(false)
  const [plzPwText, setPlzPwText] = useState('비밀번호를 다시 입력해주세요')

  // 키보드 배열
  const keybordArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'delete'];

  /**
   * 키보드 입력 받는 함수
   * @param {number} keybord 
   */
  const handleInputChange = (keybord, isSecondScreen) => {
    if(isSecondScreen){
      setPasswordCheck(passwordCheck+keybord)
    }else{
      setPassword(password+keybord)
    }
  }


  /**
   * 입력값을 지우는 함수
   */
  const handleInputDelete = (isSecondScreen) => {
    if(isSecondScreen){
      setPasswordCheck(passwordCheck.slice(0, -1))
    }else{
      setPassword(password.slice(0, -1))
    }
  }

  /**
   * 모달 닫는 함수
   */
  const closeModal = () => {
    setShowModal(false)
  }

  useEffect(() => {
    if(password.length === passwordLength){
      setPwCheckScreen(true)
    }
  }, [password]);

  const savePasswordFun = async() => {
    return(await savePassword(password))
  }

  useEffect(() => {
    if(passwordCheck.length === passwordLength){
      if(password === passwordCheck){
        // 스토리지에 저장
        if (savePasswordFun()){
          // 뒤로 돌아가기
          setShowModal(false)
        }
        // 뒤에서는 저장되었는지 확인하고 저장되었으면 활성화, 아니면 비활성화로 변경
      }else{
        setPlzPwText('비밀번호가 일치하지 않습니다!')
        setPasswordCheck('')
      }
    }
  }, [passwordCheck])

  if(pwCheckScreen){}
  return(
    <Modal
    animationType={'slide'}
    visible={showModal}
    transparent={false}
    >
      <View style={{flex:1, backgroundColor: useContext(themeContext).background}}>
        <SafeAreaView style={[GlobalStyle.safeAreaWrap, {backgroundColor: useContext(themeContext).background, position:'relative'}]}>
          <Pressable style={ModalStyles.btnCancle}
          onPress={closeModal}>
            <Ionicons name="ios-close-outline" size={35} style={ModeColorStyle(isDark).font_DEFALUT} />
          </Pressable>

          <View style={ModalStyles.headWrap}>
            {
              !pwCheckScreen ?
              <Text style={[ModalStyles.plz_pw_text, GlobalStyle.font_title2, ModeColorStyle(isDark).font_DEFALUT]}>비밀번호를 입력해주세요</Text>
              :
              <Text style={[ModalStyles.plz_pw_text, GlobalStyle.font_title2, ModeColorStyle(isDark).font_DEFALUT]}>{plzPwText}</Text>
            }
            {/* 비밀번호 동그라미 wrap*/}
            <View style={[ModalStyles.passwordRoundWrap]}>
              {
                Array.from({ length: passwordLength },(_, index) => (
                  !pwCheckScreen ? 
                  <PasswordModal key={index} text={password[index]} isDark={isDark}/>
                  :
                  <PasswordModal key={index} text={passwordCheck[index]} isDark={isDark}/>
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
                    onPress={() => handleInputDelete(pwCheckScreen)}>
                      <Ionicons name="ios-backspace" size={28} style={ModeColorStyle(isDark).font_DEFALUT} />
                    </Pressable>
                  )
                }
                return(
                  <Pressable style={keybordStyle(isDark).keybordWrap}
                  key={index}
                  onPress={() => handleInputChange(keybord, pwCheckScreen)}>
                    <Text style={[GlobalStyle.font_title2, ModeColorStyle(isDark).font_DEFALUT]}>{keybord}</Text>
                  </Pressable>
                )
              })
            }
          </View>

        </SafeAreaView>
      </View>
    </Modal>
  )
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
