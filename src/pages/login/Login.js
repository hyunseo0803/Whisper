import {
	StyleSheet,
	Text,
	Image,
	View,
	SafeAreaView,
  Alert,
  Keyboard,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import NameLogo from "../../../assets/images/logo.png";
import GoogleLogo from "../../../assets/images/GoogleLogo.png";
import { Pressable } from "react-native";
import GlobalStyle from "../../globalStyle/GlobalStyle";
import LoginInput from "../login/LoginInput";
import PwSettingSignup from "../login/PwSettingSignup";
import LoginButton from "../login/LoginButton";
import { SIGNIN_email_password } from "../../util/firebase/user";
import { GlobalLoginStyle } from "../../globalStyle/LoginStyle";
import { COLOR_DARK_BLUE, COLOR_LIGHT_BLUE } from "../../globalStyle/color";
import ModeColorStyle from "../../globalStyle/ModeColorStyle";

export default function Login({ navigation }) {
  const isDark = useColorScheme() === 'dark'

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [savelogin, setSaveLogin] = useState(false);

	/**
   * 자동 로그인 onClick
   */
  const saveLogin = () => {
		setSaveLogin(!savelogin);
	};
  
  /**
   * 로그인 버튼 onClick 함수
   */
	const handleLogin = () => {    
    SIGNIN_email_password(savelogin, email, password);
	};

	return (
    <Pressable
    style={{display: 'flex', flex: 1}}
    onPress={Keyboard.dismiss}>
    <View
    style={{
      display: 'flex',
      flex: 1,
    }}>
      <SafeAreaView
        style={[GlobalStyle.safeAreaWrap, {marginHorizontal:30}]}>
        {/* 로고 */}
        <View
          style={{
            alignItems: "center",
            marginTop: 100,
            height: 110,
          }}
        >
          <Image source={NameLogo} style={GlobalLoginStyle.logo} />
          <Text style={[GlobalLoginStyle.loginTitle, GlobalStyle.font_title2, ModeColorStyle(isDark).font_BLUE]}>로그인</Text>
        </View>

        {/* 입력 폼 */}
        <LoginInput
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isDark={isDark}
        />

        {/* 자동로그인 */}
        <View
          style={styles.autoLoginWrap}
        >
          <Pressable style={styles.selectSave} onPress={saveLogin}>
            <Ionicons
              name={
                savelogin ? "checkmark-circle-sharp" : "checkmark-circle-outline" 
              }
              size={24}
              color={isDark ? COLOR_DARK_BLUE : COLOR_LIGHT_BLUE}
            />
          </Pressable>
          <Text style={[styles.autoLogin, GlobalStyle.font_caption1, ModeColorStyle(isDark).font_BLUE]}>
            자동 로그인
          </Text>
        </View>

        {/* 로그인버튼 */}
        <LoginButton handleLogin={handleLogin} title='로그인'/>

        {/* 비밀번호 재설정 | 회원가입 */}
        <PwSettingSignup navigation={navigation}/>

        {/* sns로그인 */}
        {/* TODO : 현재 기술 스텍 문제로 SNS로그인 불가 추후 수정 요망
        <View
          style={{
            width: "100%",
            height: 14,
            marginTop: 50,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.line} />
          <Text style={[{ paddingHorizontal: 10, color: '#86878C' }, GlobalStyle.font_caption1]}>
            SNS계정으로 로그인 하기
          </Text>
          <View style={styles.line} />
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            padding: 10,
            flexDirection: "row",
            marginTop: 20,
            justifyContent: 'center'
          }}
        >
          <Pressable
          onPress={() => {
            alert('test!')
          }
          }>
            <Image source={GoogleLogo} style={GlobalLoginStyle.Googlelogo} />
          </Pressable> 
        </View>
        */}
      </SafeAreaView>
    </View>
    </Pressable>
	);
}

const styles = StyleSheet.create({
  autoLoginWrap: {
    width: "100%",
    height: 30,
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
  },
	autoLogin: {
		width: "100%",
    left: 5,
		alignItems: "center",
		justifyContent: "center",
	},

	line: {
		width: "25%",
		height: 1,
    backgroundColor: "#D3D5DA",
		alignSelf: "stretch",
		marginTop: 7,
	},
});
