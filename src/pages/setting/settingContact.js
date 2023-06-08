import React, { useState } from "react";
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

const SettingContact = ({ navigation }) => {
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

	return (
		<SafeAreaView
			style={{
				height: "90%",
				marginVertical: 40,
				marginHorizontal: 25,
				flex: 1,
			}}
		>
			<KeyboardAvoidingView
				style={{ flex: 1, width: "100%" }}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={Platform.OS === "ios" ? 55 : 0}
			>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View
						style={{
							width: "100%",
							alignItems: "center",
							marginBottom: 60,
							top: 10,
						}}
					>
						<Text style={GlobalStyle.font_caption1}>Contact Us</Text>
					</View>
					<Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
						<View>
							<TextInput
								value={cTitle}
								onChangeText={(text) => setCTitle(text)}
								placeholder="문의 제목"
								style={[
									{
										width: "100%",
										padding: 7,
										borderBottomWidth: 1,
										borderColor: "#D4D4D4",
										marginBottom: 10,
									},
									GlobalStyle.font_body,
								]}
							/>
						</View>
						<View>
							<Text
								style={[
									{
										textAlign: "center",
										marginVertical: 15,
										letterSpacing: 1,
										color: "#5F5F5F",
									},
									GlobalStyle.font_caption1,
								]}
							>
								핸드폰의 기종 및 사양을 함께 입력해주시면 {"\n"}보다 자세한
								답변을 받으실 수 있습니다.
							</Text>
							<TextInput
								value={content}
								onChangeText={(text) => setContent(text)}
								placeholder={`문의하실 내용을 입력 해주세요.`}
								multiline={true}
								style={[
									{
										width: "100%",
										minHeight: 340,
										textAlignVertical: "top",
										padding: 10,
										borderRadius: 5,
										marginBottom: 20,
										backgroundColor: "white",
									},
									GlobalStyle.font_body,
								]}
								scrollEnabled={true}
								maxLength={800}
							/>
						</View>
						<View>
							<TextInput
								value={user_email}
								onChangeText={(text) => setUser_email(text)}
								placeholder="회신 받을 이메일 ex)sample@sogon.com"
								style={[
									{
										width: "100%",
										padding: 7,
										borderBottomWidth: 1,
										borderColor: "white",
										marginVertical: 15,
									},
									GlobalStyle.font_body,
								]}
							/>
						</View>
						<Pressable
							onPress={sendEmail}
							style={{
								width: "100%",
								height: 55,
								backgroundColor: isBothSelected
									? "#E76B5C"
									: "rgba(231, 107, 92, 0.5)",
								borderRadius: 15,
								marginVertical: 10,
								justifyContent: "center",
								alignItems: "center",
							}}
							disabled={!isBothSelected}
						>
							<Text
								style={[
									{
										color: isBothSelected ? "white" : "rgba(255,255,255,0.5)",
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

const styles = StyleSheet.create({});

export default SettingContact;
