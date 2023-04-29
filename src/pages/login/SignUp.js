import {
	StyleSheet,
	Text,
	Image,
	View,
	SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import NameLogo from "../../../assets/images/NameLogo.png";
import GoogleLogo from "../../../assets/images/GoogleLogo.png";
import { Pressable } from "react-native";
import GlobalStyle from "../../globalStyle/GlobalStyle";
import LoginInput from "../login/LoginInput";
import SignUpButton from "../login/SignUpButton";
import { SIGNUP_email_password } from "../../../firebase";
import { GlobalLoginStyle } from "../../globalStyle/LoginStyle";
import { Keyboard } from "react-native";

export default function SignUp({navigation}) {
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
    try {
      const user = await SIGNUP_email_password(email, password)
      console.log('User account created & signed in!');
    } catch(error) {
      console.log(error.message);
    }
	};


	

	return (
    <Pressable
      style={{
        display: 'flex',
        flex: 1,
        backgroundColor: '#fff'}}
      onPress={Keyboard.dismiss}
    >

			<SafeAreaView
				style={[GlobalStyle.safeAreaWrap, {
					marginHorizontal: 30,
				}]}
			>

				{/* 로고 */}
				<View
					style={{
						alignItems: "center",
						marginTop: 50,
						height: 110,
					}}
				>
					<Image source={NameLogo} style={GlobalLoginStyle.logo} />
					<Text style={[GlobalLoginStyle.loginTitle, GlobalStyle.font_title2]}>회원가입</Text>
				</View>

				{/* 입력 폼 */}
				<LoginInput
					email={email}
					setEmail={setEmail}
					password={password}
					setPassword={setPassword}
				/>

				{/* 회원가입 버튼 */}
				<SignUpButton handleLogin={handleSignUp} />

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
