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

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [savelogin, setSaveLogin] = useState("checkmark-circle-outline");

	const saveLogin = () => {
		setSaveLogin(!savelogin);
	};

	const passwordShowcheck = () => {
		setShowPassword(!showPassword);
	};

	const handleLogin = () => {
		console.log(email, password);
		if (email === "admin@naver.com" && password === "admin") {
			Alert.alert("로그인 성공");
		} else {
			Alert.alert("로그인 실패", "이메일 또는 비밀번호가 일치하지 않습니다.");
		}
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
					// backgroundColor: "red",
				}}
			>
				<Image source={NameLogo} style={styles.logo} />
				<Text style={[styles.login, GlobalStyle.font_title2]}>로그인</Text>
			</View>

			{/* 입력 폼 */}
			<View
				style={{
					// backgroundColor: "white",
					alignItems: "stretch",
					marginTop: 50,
					flexDirection: "row",
					flexWrap: "wrap",
				}}
			>
				<TextInput
					style={[styles.inputbox, GlobalStyle.font_caption1]}
					value={email}
					placeholder="이메일"
					label="email"
					onChangeText={setEmail}
				/>
				<View
					style={{
						width: "100%",
						height: 60,
						//backgroundColor: "blue",
					}}
				>
					<TextInput
						style={[styles.inputbox, GlobalStyle.font_caption1]}
						value={password}
						placeholder="비밀번호"
						onChangeText={setPassword}
						label="Password"
						secureTextEntry={!showPassword}
					/>
					<Pressable style={styles.selectShow} onPress={passwordShowcheck}>
						<Ionicons
							name={showPassword ? "eye-off-outline" : "eye-outline"}
							size={24}
							color="black"
						/>
					</Pressable>
				</View>
			</View>

			{/* 자동로그인 */}
			<View
				style={{
					width: "100%",
					height: 30,
					alignItems: "center",
					marginTop: 10,
					//backgroundColor: "blue",
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
			<View style={styles.loginButtonWrap}>
				<TouchableOpacity
					activeOpacity={0.8}
					style={styles.loginbutton}
					onPress={handleLogin}
				>
					<Text
						style={[
							{
								color: "white",
								fontSize: 20,
							},
							GlobalStyle.font_title2,
						]}
					>
						로그인
					</Text>
				</TouchableOpacity>
			</View>

			{/* 비밀번호 재설정 | 회원가입 */}
			<View
				style={{
					width: "100%",
					height: 14,
					// position: "absolute",
					marginTop: 20,
					// flex: 1,
					flexDirection: "row",
					//backgroundColor: "red",
				}}
			>
				<TouchableOpacity
					activeOpacity={0.8}
					style={{
						//backgroundColor: "green",
						width: 100,
						height: 14,
						marginLeft: 70,
					}}
					onPress={() => Alert.alert("test", "테스트.")}
				>
					<Text
						style={[
							{
								color: "black",
								textAlign: "center",
							},
							GlobalStyle.font_caption1,
						]}
					>
						비밀번호 재설정
					</Text>
				</TouchableOpacity>
				<Text>|</Text>
				<TouchableOpacity
					activeOpacity={0.8}
					style={{
						//backgroundColor: "pink",
						width: 100,
						height: 14,
						marginEnd: 70,
					}}
					onPress={() => Alert.alert("test", "테스트.")}
				>
					<Text
						style={[
							{
								color: "black",
								textAlign: "center",
							},
							GlobalStyle.font_caption1,
						]}
					>
						회원가입
					</Text>
				</TouchableOpacity>
			</View>

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
		justifyContentcontent: "center",
		color: "#4E4981",
		// fontWeight: 800,
		textAlign: "center",
		marginTop: 20,
	},
	inputbox: {
		// flex: 1,
		width: "100%",
		height: 60,
		borderColor: "#4E4981",
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
		marginBottom: 20,
		position: "relative",
		// fontSize: 16,
		//backgroundColor: "red",
	},
	selectShow: {
		height: "100%",
		position: "absolute",
		right: 0,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 10,
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
	autoLoginImg: {
		width: 30,
		height: 30,
	},

	loginButtonWrap: {
		width: "100%",
		height: 60,
		flexDirection: "row",
		marginTop: 20,
	},
	loginbutton: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,
		backgroundColor: "#E76B5C",
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
		// marginTop: 50,
		backgroundColor: "red",
	},
});
