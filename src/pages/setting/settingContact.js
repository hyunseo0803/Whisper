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
} from "react-native";
import * as MailComposer from "expo-mail-composer";
import { insertContact } from "../../util/database";

const SettingContact = ({ navigation }) => {
	const [cTitle, setCTitle] = useState("");
	const [content, setContent] = useState("");
	const [user_email, setUser_email] = useState("");

	let date = new Date();

	const sendEmail = async () => {
		const body = `안녕하세요, 소곤소곤 의 피드백 및 문의 사항을 보냅니다.\n
    내용을 확인 후 회신 바랍니다.\n\n  
    회신 받을 이메일: ${user_email}\n\n 
    문의 제목: ${cTitle}\n
    내용: ${content} \n \n
    To. SogonSogon, Developer. Team`;

		try {
			const isSaved = await insertContact(date, cTitle, content, user_email); // SQlite에 데이터 저장

			await MailComposer.composeAsync({
				recipients: ["abcdefghjk5@naver.com"],
				subject: "SogonSogon 피드백 및 문의 사항이 도착했습니다.",
				body: body,
			});

			// 이메일이 성공적으로 전송되었을 때 처리할 내용
			console.log("이메일이 성공적으로 전송되었습니다.");
			Alert.alert("알림", "이메일이 성공적으로 전송되었습니다.");

			// SQlite 저장이 성공적으로 완료되었을 때 처리할 내용
			console.log("데이터가 성공적으로 저장되었습니다.");

			navigation.navigate("Setting"); // 설정 화면으로 이동
		} catch (error) {
			// 오류 처리
			console.error(error);
			alert("데이터 저장 또는 이메일 전송 중 오류가 발생했습니다.");
		}
	};

	return (
		<View>
			<SafeAreaView
				style={{
					alignItems: "center",
					height: "90%",
					marginVertical: 40,
					marginHorizontal: 20,
				}}
			>
				<View
					style={{
						width: "100%",
						alignItems: "center",
						marginBottom: 60,
					}}
				>
					<Text>Contact Us</Text>
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
									textAlign: "center",
									padding: 7,
									borderBottomWidth: 1,
									borderColor: "#86878C",
									marginBottom: 10,
								},
								// GlobalStyle.font_title2,
							]}
						/>
					</View>
					<View>
						<Text style={{ textAlign: "center", marginVertical: 10 }}>
							핸드폰의 기종 및 사양을 함께 입력해주시면 {"\n"}보다 자세한 답변을
							받으실 수 있습니다.
						</Text>
						<TextInput
							value={content}
							onChangeText={(text) => setContent(text)}
							placeholder={`문의하실 내용을 입력 해주세요.`}
							multiline={true}
							style={[
								{
									width: 300,
									height: 350,
									// textAlign: "center",
									textAlignVertical: "top",
									padding: 10,
									borderWidth: 1,
									borderColor: "#86878C",
									borderRadius: 5,
									marginBottom: 20,
								},
								// GlobalStyle.font_title2,
							]}
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
									// textAlign: "center",
									padding: 7,
									borderBottomWidth: 1,
									borderColor: "#86878C",
									marginBottom: 30,
								},
								// GlobalStyle.font_title2,
							]}
						/>
					</View>
					<Pressable
						onPress={sendEmail}
						style={{
							width: 300,
							height: 55,
							backgroundColor: "#E76B5C",
							borderRadius: 15,
							marginVertical: 10,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Text style={{ color: "white", letterSpacing: 10 }}>전송</Text>
					</Pressable>
				</Pressable>
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({});

export default SettingContact;
