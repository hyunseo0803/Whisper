import {
	StyleSheet,
	Text,
	Image,
	View,
	SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import NameLogo from "../../../assets/images/NameLogo.png";
import GoogleLogo from "../../../assets/images/GoogleLogo.png";
import { Pressable } from "react-native";
import GlobalStyle from "../../globalStyle/GlobalStyle";
import LoginInput from "../login/LoginInput";
import PwSettingSignup from "../login/PwSettingSignup";
import LoginButton from "../login/LoginButton";
import { auth, firebaseConfig, SIGNIN_email_password } from "../../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [savelogin, setSaveLogin] = useState("checkmark-circle-outline");

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
		// console.log(email, password);
    SIGNIN_email_password(email, password);
	};

	return (
		<SafeAreaView
			style={{
				display: "flex",
				alignItems: "center",
				marginHorizontal: 30,
				height: "85%",
			}}
		>
			{/* 로고 */}
			<View
				style={{
					alignItems: "center",
					justifyContent: "flex-start",
					marginTop: 50,
					width: "100%",
					height: 110,
				}}
			>
				<Image source={NameLogo} style={styles.logo} />
				<Text style={[styles.login, GlobalStyle.font_title2]}>로그인</Text>
			</View>

			{/* 입력 폼 */}
			<LoginInput
				email={email}
				setEmail={setEmail}
				password={password}
				setPassword={setPassword}
			/>

			{/* 자동로그인 */}
			<View
				style={{
					width: "100%",
					height: 30,
					alignItems: "center",
					marginTop: 10,
					flexDirection: "row",
				}}
			>
				<Pressable style={styles.selectSave} onPress={saveLogin}>
					<Ionicons
						name={
							savelogin ? "checkmark-circle-outline" : "checkmark-circle-sharp"
						}
						size={24}
						color="black"
					/>
				</Pressable>
				<Text style={[styles.autoLogin, GlobalStyle.font_caption1]}>
					자동 로그인
				</Text>
			</View>

			{/* 로그인버튼 */}
			<LoginButton handleLogin={handleLogin} />

			{/* 비밀번호 재설정 | 회원가입 */}
			<PwSettingSignup />

			{/* sns로그인 */}
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
				<Text style={[{ paddingHorizontal: 10 }, GlobalStyle.font_caption1]}>
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
				}}
			>
        <Pressable
        onPress={() => {
          alert('test!')
        }
        }>
				  <Image source={GoogleLogo} style={styles.Googlelogo} />
        </Pressable>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	logo: {
		width: 200,
		height: 50,
		margin: "auto",
		textAlign: "center",
	},

	login: {
		justifyContent: "center",
		color: "#4E4981",
		textAlign: "center",
		marginTop: 20,
	},
	selectSave: {
		height: "100%",
		position: "absolute",
		left: 0,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 8,
	},

	autoLogin: {
		width: "100%",
		left: 40,
		alignItems: "center",
		justifyContent: "center",
	},

	line: {
		width: "30%",
		height: 1,
		backgroundColor: "gray",
		alignSelf: "stretch",
		marginTop: 7,
	},
	Googlelogo: {
		width: 50,
		height: 50,
		backgroundColor: "red",
	},
});
