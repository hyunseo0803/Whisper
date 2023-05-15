import React, { useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	Pressable,
	SafeAreaView,
	Image,
	Button,
	TouchableOpacity,
	ScrollView,
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
import { Openai_Api_KEY } from "@env";

setupURLPolyfill();

const AnalysisResultScreen = ({ navigation, route }) => {
	const [analysisMood, setAnalysisMood] = useState("");
	const [subject, setSubject] = useState("");
	const [selectedTopic, setSelectedTopic] = useState([]);
	const [isLoding, setIsLoding] = useState(false);
	const [analysisLoding, setAnalysisIsLoding] = useState(false);
	const [openaiLoding, setOpenaiLoding] = useState(false);

	const { params } = route;
	const selectedMood = params ? params.selectedMood : null;
	const selectedWeather = params ? params.selectedWeather : null;
	const selectedDate = params.selectedDate;

	const { Configuration, OpenAIApi } = require("openai");

	const config = new Configuration({
		apiKey: Openai_Api_KEY,
	});

	const openai = new OpenAIApi(config);

	// useEffect(() => {
	// 	if (analysisloading && openailoading) {
	// 		setIsloding(true);
	// 	}
	// 	if (analysisloading === false && openailoading === false) {
	// 		setIsloding(false);
	// 	}
	// });

	const handelTopicPress = (topic) => {
		if (selectedTopic.includes(topic)) {
			setSelectedTopic(selectedTopic.filter((t) => t !== topic));
		} else {
			setSelectedTopic([...selectedTopic, topic]);
		}
	};
	const isSelected = !!selectedTopic;
	const handleNextButton = () => {
		navigation.navigate("WriteContent", {
			selectedTopic: selectedTopic,
			selectedMood: selectedMood,
			selectedWeather: selectedWeather,
			selectedDate: selectedDate,
		});
		console.log(`AnalysisMood: ${analysisMood}, topic: ${selectedTopic}`);
	};

	// console.log(selectedTopic);
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
				prompt = "기쁜 감정일때 쓰기좋은 재미있는 일기 주제 6가지 추천해줘.";
			} else if (analysisMood === "sad") {
				prompt = "슬픈 감정일때 쓰기좋은 재미있는 일기 주제 6가지 추천해줘.";
			} else if (analysisMood === "fear") {
				prompt =
					"두려움이나 불안감을 느낄때 쓰기 좋은 재미있는 일기 주제 6가지 추천해줘.";
			} else if (analysisMood === "angry") {
				prompt = "화났을때 쓰기 좋은 재미있는 일기 주제 6가지 추천해줘.";
			} else if (analysisMood === "surprised") {
				prompt = "놀랐을때 쓰기 좋은 재미있는 일기 주제 6가지 추천해줘.";
			} else if (analysisMood === "disgust") {
				prompt = "혐오감을 느낄때 쓰기 좋은 재미있는 일기 주제 6가지 추천해줘.";
			} else if (analysisMood === "expressionless") {
				prompt = "재미있는 일기 주제 6가지 추천해줘.";
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
						const subject = answer
							.split("\n")
							.map((item) => item.replace(/^\s*\d+\.\s*/, "# "))
							.filter((item) => item);

						setSubject(subject);

						console.log(answer);
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
		<ScrollView>
			<SafeAreaView
				style={{
					display: "flex",
					alignItems: "center",
					marginHorizontal: "5%",
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
								<Text style={GlobalStyle.font_body}>기쁨</Text>
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
				<Text style={[GlobalStyle.font_title2, styles.topicTitle]}>
					이런 주제는 어때요?
				</Text>

				<View style={styles.subject}>
					{subject &&
						subject.map((item, index) => {
							return (
								<View style={styles.buttonContainer} key={index}>
									<TouchableOpacity
										// title={item}
										onPress={() => handelTopicPress(item)}
										style={[
											styles.touchable,
											selectedTopic.includes(item) && styles.selectedTouchable,
										]}
									>
										<Text
											style={[
												styles.topic,
												GlobalStyle.font_body,
												selectedTopic.includes(item) && styles.selectedText,
											]}
										>
											{item}
										</Text>
									</TouchableOpacity>
								</View>
							);
						})}
				</View>
				<View style={styles.button}>
					<TouchableOpacity
						style={[
							styles.buttonTouchable,
							{
								backgroundColor: isSelected
									? "#E76B5C"
									: "rgba(231, 107, 92, 0.5)",
							},
						]}
						onPress={handleNextButton}
						disabled={!isSelected}
					>
						<Text
							style={[
								styles.buttonText,
								GlobalStyle.font_title2,
								{ color: isSelected ? "white" : "#CCCCCC" },
							]}
						>
							다음
						</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</ScrollView>
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
		width: "100%",
		display: "flex",
		flexDirection: "row",
		// backgroundColor: "red",
		flexWrap: "wrap",
		marginTop: 10,
	},
	touchable: {
		height: 30,
		width: "auto",
		borderRadius: 15,
		borderWidth: 1,
		borderColor: "black",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "transparent",
		marginVertical: 5,
		marginHorizontal: 5,
	},
	selectedTouchable: {
		backgroundColor: "black",
	},
	topicTitle: {
		width: "100%",
		marginTop: 40,
		alignItems: "flex-start",
		justifyContent: "flex-start",
	},
	topic: {
		color: "black",
		marginHorizontal: 10,
	},
	selectedText: {
		color: "white",
	},
	button: {
		marginVertical: 50,
	},
	buttonTouchable: {
		width: 250,
		height: 50,
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		textAlign: "center",
		lineHeight: 55,
	},
});

export default AnalysisResultScreen;
