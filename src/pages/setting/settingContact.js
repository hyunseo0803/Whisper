import React, { useContext, useState } from "react";
import {
	View,
	StyleSheet,
	SafeAreaView,
	Text,
	TextInput,
	Pressable,
	Keyboard,
	Alert,
	ScrollView,
	KeyboardAvoidingView,
} from "react-native";
import * as MailComposer from "expo-mail-composer";
import { insertContact } from "../../util/database";
import GlobalStyle from "../../globalStyle/GlobalStyle";
import themeContext from "../../globalStyle/themeContext";
import { Feather } from '@expo/vector-icons';
import { COLOR_BLACK, COLOR_DARK_FOURTH, COLOR_DARK_PRIMARY, COLOR_DARK_RED, COLOR_DARK_SECONDARY, COLOR_DARK_THIRD, COLOR_DARK_WHITE, COLOR_LIGHT_PRIMARY, COLOR_LIGHT_RED, COLOR_LIGHT_SECONDARY, COLOR_LIGHT_THIRD, COLOR_WHITE } from "../../globalStyle/color";
import ModeColorStyle from "../../globalStyle/ModeColorStyle";
import HeaderBack from "../../components/HeaderBack";

const SettingContact = ({ navigation }) => {
  const isDark = useContext(themeContext).theme === 'dark'

	const [cTitle, setCTitle] = useState("");
	const [content, setContent] = useState("");
	const [user_email, setUser_email] = useState("");

	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = String(currentDate.getMonth() + 1).padStart(2, "0");
	const day = String(currentDate.getDate()).padStart(2, "0");
	const date = `${year}-${month}-${day}`;

	const isBothSelected = !!cTitle && !!content && user_email !== "";

	const sendEmail = async () => {
		const body = `안녕하세요, 소곤소곤 의 피드백 및 문의 사항을 보냅니다.\n
    내용을 확인 후 회신 바랍니다.\n\n  
    회신 받을 이메일: ${user_email}\n\n 
    문의 제목: ${cTitle}\n
    내용: ${content} \n \n
    To. SogonSogon, Developer. Team`;

		try {
			const isSent = await MailComposer.composeAsync({
				recipients: ["abcdefghjk5@naver.com"],
				subject: "SogonSogon 피드백 및 문의 사항이 도착했습니다.",
				body: body,
			});

			if (isSent.status === MailComposer.MailComposerStatus.SENT) {
				const isSaved = await insertContact(date, cTitle, content, user_email); // SQlite에 데이터 저장
				Alert.alert("알림", "이메일이 성공적으로 전송되었습니다.");
				navigation.navigate("Setting"); // 설정 화면으로 이동
			} else if (isSent.status === MailComposer.MailComposerStatus.CANCELLED) {
				Alert.alert("알림", "이메일 작성이 취소되었습니다.");
			}
		} catch (error) {
			console.error(error);
			Alert.alert("Mail 앱 연동", "Mail 앱에서 로그인 후 이용 해주세요.");
		}
	};

	const placeholderColor = isDark?COLOR_DARK_SECONDARY:COLOR_LIGHT_SECONDARY
	const textColor = isDark?COLOR_DARK_WHITE:COLOR_BLACK
	const borderColor = isDark?COLOR_DARK_THIRD:COLOR_LIGHT_THIRD

	return (
		<SafeAreaView style={[styles.safearea, GlobalStyle.safeAreaWrap]}>
			<KeyboardAvoidingView
				style={{ flex: 1, width: "100%" }}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
			>
				{/* header */}
				<HeaderBack text={'Contact Us'} backFun={() => navigation.pop()}/>

				<ScrollView showsVerticalScrollIndicator={false}>
					<Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
							<TextInput
								value={cTitle}
								onChangeText={(text) => setCTitle(text)}
								placeholder="문의 제목"
								placeholderTextColor={placeholderColor}
								style={[styles.titleInput, GlobalStyle.font_body, {color:textColor, borderColor:borderColor}]}
							/>

							<Text style={[styles.helpText, GlobalStyle.font_caption1, {color:isDark?COLOR_DARK_PRIMARY:COLOR_LIGHT_PRIMARY}]}>
								핸드폰의 기종 및 사양을 함께 입력해주시면 {"\n"}보다 자세한
								답변을 받으실 수 있습니다.
							</Text>
							<TextInput
								value={content}
								onChangeText={(text) => setContent(text)}
								placeholder={`문의하실 내용을 입력 해주세요.`}
								placeholderTextColor={placeholderColor}
								multiline={true}
								style={[styles.contentInput, GlobalStyle.font_body, {backgroundColor:isDark?COLOR_DARK_FOURTH:COLOR_WHITE, color:textColor}]}
								scrollEnabled={true}
								maxLength={800}
							/>
							<TextInput
								value={user_email}
								keyboardType={"email-address"}
								onChangeText={(text) => setUser_email(text)}
								placeholder="회신 받을 이메일 ex)sample@sogon.com"
								placeholderTextColor={placeholderColor}
								style={[styles.emailInput, GlobalStyle.font_body, {color:textColor, borderColor:borderColor}]}
							/>
						<Pressable
							onPress={sendEmail}
							style={[
								{
									backgroundColor: isBothSelected
										? isDark?COLOR_DARK_RED:COLOR_LIGHT_RED
										: "rgba(231, 107, 92, 0.5)",
								},
								styles.pressableButton,
							]}
							disabled={!isBothSelected}
						>
							<Text
								style={[
									{
										color: isBothSelected ? isDark?COLOR_DARK_WHITE:COLOR_WHITE : "rgba(255,255,255,0.5)",
										letterSpacing: 10,
									},
									GlobalStyle.font_title2,
								]}
							>
								전송
							</Text>
						</Pressable>
					</Pressable>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safearea: {
		flex: 1,
	},
	topLabel: { marginBottom: 60, top: 10 },
	helpText: {
		textAlign: "center",
		marginVertical: 15,
		letterSpacing: 1,
		marginTop: 30
	},
	titleInput:{
		padding: 10,
		borderBottomWidth:1,
		marginTop: 10
	},
	contentInput: {
		width: "100%",
		minHeight: 340,
		textAlignVertical: "top",
		padding: 10,
		borderRadius: 5,
		marginBottom: 20,
	},
	emailInput: {
		width: "100%",
		padding: 7,
		borderBottomWidth: 1,
		borderColor: "white",
		marginVertical: 15,
	},
	pressableButton: {
		width: "100%",
		height: 55,
		borderRadius: 15,
		marginVertical: 10,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default SettingContact;
