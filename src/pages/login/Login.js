import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	View,
	Alert,
} from "react-native";
import React, { useState } from "react";
//import { Ionicons } from "@expo/vector-icons";
import NameLogo from "../../../assets/images/NameLogo.png";
import AutoLogin from "../../../assets/images/AutoLogin.png";
import GoogleLogo from "../../../assets/images/GoogleLogo.png";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword] = useState(false);

	/*this.state = {
		email: "",
		password: "",
	};

	/*function passwordShowcheck(){
		this.setState({ showPassword: !showPassword });
	}*/

	const handleLogin = () => {
		console.log(email, password);
		if (email === "admin@naver.com" && password === "admin") {
			Alert.alert("로그인 성공");
		} else {
			Alert.alert("로그인 실패", "이메일 또는 비밀번호가 일치하지 않습니다.");
		}
	};

	return (
		<View
			style={{
				display: "flex",
				//backgroundColor: "yellow",
				alignItems: "center",
				width: "90%",
				height: 750,
			}}
		>
			<View
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					top: "15%",
				}}
			>
				<Image source={NameLogo} style={styles.logo} />
				<Text style={styles.login}>로그인</Text>
			</View>
			<View
				style={{
					display: "flex",
					//backgroundColor: "white",
					alignItems: "center",
					justifyContent: "center",
					position: "absolute",
					top: "35%",
				}}
			>
				<TextInput
					style={styles.inputbox}
					value={email}
					placeholder="이메일"
					label="email"
					onChangeText={setEmail}
				/>
				<TextInput
					style={styles.inputbox}
					value={password}
					placeholder="비밀번호"
					onChangeText={setPassword}
					label="Password"
					secureTextEntry={!showPassword}
				/>
				{/*<TextInput.Right>
						<TouchableOpacity onPress={this.passwordShowcheck}>
							<Ionicons
								name={
									this.state.showPassword ? "eye-off-outline" : "eye-outline"
								}
								size={24}
								color="black"
							/> 
						</TouchableOpacity>
					</TextInput.Right>
							*/}
			</View>
			<View
				style={{
					width: 250,
					height: 30,
					justifyContent: "flex-start",
					position: "absolute",
					top: 400,
					//backgroundColor: "blue",
					flex: 1,
					flexDirection: "row",
				}}
			>
				<Image source={AutoLogin} style={styles.autoLoginImg} />
				<Text style={styles.autoLogin}>자동 로그인</Text>
			</View>
			<View>
				<TouchableOpacity
					activeOpacity={0.8}
					style={styles.loginbutton}
					onPress={handleLogin}
				>
					<Text
						style={{
							color: "white",
							textAlign: "center",
							top: 15,
							fontSize: 20,
						}}
					>
						로그인
					</Text>
				</TouchableOpacity>
			</View>
			<View
				style={{
					width: "100%",
					height: 14,
					position: "absolute",
					top: 520,
					flex: 1,
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
						style={{
							color: "black",
							textAlign: "center",
							fontSize: 14,
						}}
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
						style={{
							color: "black",
							textAlign: "center",
							fontSize: 14,
						}}
					>
						회원가입
					</Text>
				</TouchableOpacity>
			</View>
			<View
				style={{
					width: "100%",
					height: 14,
					position: "absolute",
					top: 580,
					flex: 1,
					flexDirection: "row",
					//backgroundColor: "blue",
					justifyContent: "space-around",
				}}
			>
				<View
					style={{
						width: 90,
						height: 1,
						backgroundColor: "black",
						alignSelf: "stretch",
						marginTop: 7,
					}}
				/>
				<Text style={{ fontSize: 14 }}>SNS계정으로 로그인 하기</Text>
				<View
					style={{
						width: 90,
						height: 1,
						backgroundColor: "black",
						alignSelf: "stretch",
						marginTop: 7,
					}}
				/>
			</View>
			<Image source={GoogleLogo} style={styles.Googlelogo} />
		</View>
	);
}

const styles = StyleSheet.create({
	logo: {
		width: 200,
		height: 50,
		margin: "auto",
		textAlign: "center",
		top: "10%",
	},

	login: {
		fontSize: 20,
		justifyContentcontent: "center",
		color: "#4E4981",
		fontWeight: 800,
		LineHeight: 23,
		fontfamily: "Abhaya Libre ExtraBold",
		textAlign: "center",
		top: 30,
	},
	inputbox: {
		width: 250,
		height: 40,
		borderColor: "#4E4981",
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
		marginBottom: 20,
		//backgroundColor: "red",
	},
	autoLogin: {
		width: 210,
		height: 40,
		top: 7,
		fontSize: 15,
		marginLeft: 5,
	},
	autoLoginImg: {
		width: 30,
		height: 30,
	},
	loginbutton: {
		width: 300,
		height: 50,
		borderRadius: 10,
		backgroundColor: "#E76B5C",
		top: 380,
	},
	Googlelogo: { width: 55, height: 55, top: 500 },
});
