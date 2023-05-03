import React, { useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	Pressable,
	SafeAreaView,
	Image,
	Button,
} from "react-native";
import { getGoogleVisionResult, moodAnalysis } from "../../util/writeDiary";
import GlobalStyle from "../../globalStyle/GlobalStyle";
import happy from "../../../assets/images/mood/happy.png";
import disgust from "../../../assets/images/mood/disgust.png";
import sad from "../../../assets/images/mood/sad.png";
import angry from "../../../assets/images/mood/angry.png";
import fear from "../../../assets/images/mood/fear.png";
import expressionless from "../../../assets/images/mood/expressionless.png";
import surprised from "../../../assets/images/mood/surprised.png";
import { setupURLPolyfill } from "react-native-url-polyfill";

setupURLPolyfill();

const AnalysisResultScreen = ({ navigation, route }) => {
	const [analysisMood, setAnalysisMood] = useState("");
	const [subject, setSubject] = useState("");

	const { Configuration, OpenAIApi } = require("openai");

	const config = new Configuration({
		apiKey: "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",
	});

	const openai = new OpenAIApi(config);

	useEffect(() => {
		const getGoogleVisionResultFun = async () => {
			try {
				const result = await getGoogleVisionResult(route.params.imageBase64);
				setAnalysisMood(result);
			} catch (error) {
				console.error(error);
			}
		};
		getGoogleVisionResultFun();
	}, [analysisMood]);

	/* TODO 1. 일기 주제 더 간결하게 추출하기 
		2. 로딩중 화면 만들기 
		3. 버튼 꾸미고, 나머지 ui만들기 
*/

	useEffect(() => {
		const runPrompt = async () => {
			let prompt = "";
			if (analysisMood === "happy") {
				prompt = `{
			"Q": "기쁜 감정을 더욱 즐길 수 있는 창의적이고 재미있는 일기 주제 10가지 추천해줘.",
			"A": ""
		  }`;
			} else if (analysisMood === "sad") {
				prompt = `{
			"Q": "슬픈감정을 기쁜 감정으로 바꾸고 극복하는데 도움이 되는 창의적이고 재미있는 일기 주제 10가지 추천해줘.
			"A": ""
		  }`;
			} else if (analysisMood === "fear") {
				prompt = `{
			"Q": "두려움이나 불안감을 느낄때 극복 할 수 있는 창의적이고 재미있는 일기 주제 10가지 추천해줘.
			"A": ""
		  }`;
			} else if (analysisMood === "angry") {
				prompt = `{
			"Q": "화나는 감정을 조절하고 진정시키는데 도움이 되는 창의적이고 재미있는 일기 주제 10가지 추천해줘.
			"A": ""
		  }`;
			} else if (analysisMood === "surprised") {
				prompt = `{
			"Q": "놀란 마음을 진정시키고 안정을 찾을 수 있는 창의적이고 재미있는 일기 주제 10가지 추천해줘.
			"A": ""
		  }`;
			} else if (analysisMood === "disgust") {
				prompt = `{
			"Q": "혐오감을 극복하고 올바르게 감정을 표현하며 내 마음을 안정시킬 수 있는 창의적이고 재미있는 일기 주제 10가지 추천해줘.
			"A": ""
		  }`;
			} else if (analysisMood === "expressionless") {
				prompt = `{
			"Q": "독특하고 재미있는 일기 주제 10가지 추천해줘.
			"A": ""
		  }`;
			}

			if (prompt !== "") {
				try {
					const response = await openai.createCompletion({
						model: "text-davinci-003",
						prompt: prompt,
						max_tokens: 2048,
						temperature: 1,
					});

					try {
						const answer = response.data.choices[0].text;
						const a = answer.split("\n");
						const subject = a
							.map((item) => item.replace(/^\d+\.\s/, "# "))
							.filter((item) => item);

						setSubject(subject);

						console.log(subject);
						// console.log(answer);
					} catch (error) {
						console.error(error);
					}
				} catch (error) {
					console.error(error);
				}
			}
		};
		runPrompt();
	}, [analysisMood]);

	return (
		<SafeAreaView
			style={{
				display: "flex",
				alignItems: "center",
				marginHorizontal: "10%",
				marginVertical: "10%",
				height: "90%",
				// backgroundColor: "red",
			}}
		>
			<View style={styles.container}>
				<Text style={GlobalStyle.font_caption1}>Write Diary</Text>
			</View>
			<Text style={styles.title}>나의 감정 분석 결과</Text>
			{
				// 분석된 감정이 공백이 아니면 분석감정 출력
				analysisMood !== "" &&
					(analysisMood === "happy" ? (
						<View style={styles.analysis}>
							<Image source={happy} style={styles.icon}></Image>
							<Text style={GlobalStyle.font_title2}>기쁨</Text>
						</View>
					) : analysisMood === "sad" ? (
						<View style={styles.analysis}>
							<Image source={sad} style={styles.icon}></Image>
							<Text style={GlobalStyle.font_title2}>슬픔</Text>
						</View>
					) : analysisMood === "disgust" ? (
						<View style={styles.analysis}>
							<Image source={disgust} style={styles.icon}></Image>
							<Text style={GlobalStyle.font_title2}>혐오</Text>
						</View>
					) : analysisMood === "surprised" ? (
						<View style={styles.analysis}>
							<Image source={surprised} style={styles.icon}></Image>
							<Text style={GlobalStyle.font_title2}>놀라움</Text>
						</View>
					) : analysisMood === "angry" ? (
						<View style={styles.analysis}>
							<Image source={angry} style={styles.icon}></Image>
							<Text style={GlobalStyle.font_title2}>화남</Text>
						</View>
					) : analysisMood === "fear" ? (
						<View style={styles.analysis}>
							<Image source={fear} style={styles.icon}></Image>
							<Text style={GlobalStyle.font_title2}>두려움</Text>
						</View>
					) : analysisMood === "expressionless" ? (
						<View style={styles.analysis}>
							<Image source={expressionless} style={styles.icon}></Image>
							<Text style={GlobalStyle.font_title2}>무표정</Text>
						</View>
					) : null)
			}

			<View style={styles.subject}>
				{subject &&
					subject.map((item, index) => {
						return (
							<View style={styles.buttonContainer} key={index}>
								<Button title={item} onPress={() => {}} />
							</View>
						);
					})}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		// backgroundColor: "yellow",
	},
	title: {
		marginVertical: 40,
		fontSize: 30,
		fontWeight: 800,
	},
	analysis: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		// backgroundColor: "red",
	},
	icon: {
		width: 90,
		height: 90,
		marginBottom: 15,
		borderRadius: 42,
		// backgroundColor: "yellow",
		justifyContent: "flex-start",
		alignSelf: "center",
		overflow: "hidden",
		resizeMode: "contain",
		// alignSelf: "center",
	},
	subject: {
		backgroundColor: "yellow",
	},
});

export default AnalysisResultScreen;
