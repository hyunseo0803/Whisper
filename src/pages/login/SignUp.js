import {
	StyleSheet,
	Text,
	Image,
	View,
	SafeAreaView,
	Alert,
  useColorScheme,
} from "react-native";
import React, { useState, useEffect } from "react";
import NameLogo from "../../../assets/images/logo.png";
import GoogleLogo from "../../../assets/images/GoogleLogo.png";
import { Pressable } from "react-native";
import GlobalStyle from "../../globalStyle/GlobalStyle";
import LoginInput from "../login/LoginInput";
import { SIGNUP_email_password } from "../../util/firebase/user";
import { GlobalLoginStyle } from "../../globalStyle/LoginStyle";
import { Keyboard } from "react-native";
import ModeColorStyle from "../../globalStyle/ModeColorStyle";
import LoginButton from "./LoginButton";

export default function SignUp({navigation}) {
  const isDark = useColorScheme() === 'dark'

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();


	function onAuthStateChanged(user) {
		setUser(user);
		if (initializing) setInitializing(false);
	  }
  
	  useEffect(() => {
		const subscriber = onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	  }, []);

	  if (initializing) return null;

  /**
   * 회원가입 버튼 click함수
   */
	const handleSignUp = async() => {
    // TODO to emyo : 회원가입 로직에 문제있음. 수정바람.
    try {
      const user = await SIGNUP_email_password(email, password)
      Alert.alert('회원가입 성공!', '회원가입에 성공했습니다! 소곤소곤을 이용해보세요!');
    } catch(error) {
      Alert.alert('회원가입 실패!','회원가입에 실패했습니다. 관리자에게 문의해주세요.');
    }
	};


	

	return (
    <Pressable
      style={{ display: 'flex', flex: 1, }}
      onPress={Keyboard.dismiss}
    >

			<SafeAreaView
				style={[GlobalStyle.safeAreaWrap, { marginHorizontal: 30, }]}>

				{/* 로고 */}
				<View
					style={{
						alignItems: "center",
						marginTop: 50,
						height: 110,
					}}
				>
					<Image source={NameLogo} style={GlobalLoginStyle.logo} />
					<Text style={[GlobalLoginStyle.loginTitle, GlobalStyle.font_title2, ModeColorStyle(isDark).font_BLUE]}>회원가입</Text>
				</View>

				{/* 입력 폼 */}
				<LoginInput
					email={email}
					setEmail={setEmail}
					password={password}
					setPassword={setPassword}
          isDark={isDark}
				/>

				{/* 회원가입 버튼 */}
				<LoginButton handleLogin={handleSignUp} title='회원가입하기' />

			{/* sns로그인 */}
      {/* TODO : 현재 기술 스텍 문제로 인해 SNS 로그인 불가, 추후 추가 예정 */}
      {/* 
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
          <Text
            style={[
              { paddingHorizontal: 10, color: "#86878C" },
              GlobalStyle.font_caption1,
            ]}
          >
            SNS계정으로 시작하기
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
            justifyContent: "center"
          }}
        >
          <Pressable
          onPress={() => { alert('구글 회원가입하기')}}>
            <Image source={GoogleLogo} style={styles.Googlelogo} />
          </Pressable>
        </View>
       */}
		</SafeAreaView>
    </Pressable>
	);
}

const styles = StyleSheet.create({
	line: {
		width: "30%",
		height: 1,
		backgroundColor: "gray",
		alignSelf: "stretch",
		marginTop: 7,
		backgroundColor: "#D3D5DA",
	},
	Googlelogo: {
		width: 50,
		height: 50,
		backgroundColor: "red",
	},
});
