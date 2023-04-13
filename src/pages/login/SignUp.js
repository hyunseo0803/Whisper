import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	View,
	Alert,
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
import SignUpButton from "../login/SignUpButton";

export default function SignUp() {
	const [email, setEmail] = useState("");
	let [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	// const [savelogin, setSaveLogin] = useState("checkmark-circle-outline");

	const BackToLogin = () => {
		Alert.alert("로그인화면으로", "이동합니다. ");
	};

	const handleSignUp = () => {
		console.log(email, password);
		if (email !== "" && password !== "") {
			Alert.alert("회원가입 성공", "로그인 하셔서 소곤소곤을 이용해보세요 ! ");
		} else {
			Alert.alert("회원가입 실패", "이메일 또는 비밀번호를 입력해주세요! ");
		}
	};

	return (
		<SafeAreaView
			style={{
				display: "flex",
				alignItems: "center",
				marginHorizontal: 30,
				height: "85%",
				backgroundColor: "yellow",
			}}
		>
			<View
				style={{
					position: "absolute",
					// backgroundColor: "red",
					width: "100%",
					flexDirection: "row",
					// paddingVertical: 10,
				}}
			>
				<Pressable style={{ flexDirection: "row" }} onPress={BackToLogin}>
					<Ionicons
						name="chevron-back-sharp"
						size={28}
						color="black"
						style={{ paddingVertical: 4 }}
					/>
					<Text style={[{ paddingVertical: 10 }, GlobalStyle.font_caption1]}>
						로그인
					</Text>
				</Pressable>
			</View>

			{/* 로고 */}
			<View
				style={{
					alignItems: "center",
					justifyContent: "flex-start",
					marginTop: 50,
					width: "100%",
					height: 110,
					// backgroundColor: "red",
				}}
			>
				<Image source={NameLogo} style={styles.logo} />
				<Text style={[styles.login, GlobalStyle.font_title2]}>회원가입</Text>
			</View>

			{/* 입력 폼 */}
			<LoginInput
				email={email}
				setEmail={setEmail}
				password={password}
				setPassword={setPassword}
			/>

			{/* 로그인버튼 */}
			<SignUpButton handleLogin={handleSignUp} />

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
				}}
			>
				<Image source={GoogleLogo} style={styles.Googlelogo} />
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
		// fontSize: 20,
		justifycontent: "center",
		color: "#4E4981",
		// fontWeight: 800,
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
		//position: "absolute",
		//marginLeft: 5,
		//backgroundColor: "yellow",
	},

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
		// marginTop: 50,
		backgroundColor: "red",
	},
});
