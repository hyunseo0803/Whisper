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
import { Pressable } from "react-native";
import GlobalStyle from "../../globalStyle/GlobalStyle";
import SignUpButton from "./SignUpButton";
import FindPwButon from "./FindPwButton";

export default function FindPW() {
	const [email, setEmail] = useState("");
	// const [savelogin, setSaveLogin] = useState("checkmark-circle-outline");

	const BackToLogin = () => {
		Alert.alert("로그인화면으로", "이동합니다. ");
	};

	const handleFindPw = () => {
		console.log(email);
		if (email !== "") {
			Alert.alert("이메일 보내기 성공!", "메일함을 확인해보세요 ");
		} else {
			Alert.alert("이메일 보내기 실패!", "이메일을 입력해주세요. ");
		}
	};

	return (
		<SafeAreaView
			style={{
				display: "flex",
				alignItems: "center",
				marginHorizontal: 30,
				height: "85%",
				// backgroundColor: "yellow",
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
				<Text style={[styles.login, GlobalStyle.font_title2]}>
					비밀번호 재설정
				</Text>
			</View>
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					marginTop: 50,
				}}
			>
				<Text style={[{ color: "#86878C" }, GlobalStyle.font_caption2]}>
					이메일을 입력하시면,
				</Text>
				<Text style={[{ color: "#86878C" }, GlobalStyle.font_caption2]}>
					해당 이메일로 비밀번호 재설정 링크를 보내드립니다.
				</Text>
			</View>

			{/* 입력 폼 */}
			<View
				style={{
					// backgroundColor: "white",
					alignItems: "stretch",
					marginTop: 20,
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
			</View>

			{/* 로그인버튼 */}
			<FindPwButon handleFindPw={handleFindPw} />
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
		//backgroundColor: "red",
	},
});
