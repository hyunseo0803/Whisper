import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { addButtonPressCount, getGoogleVisionResult } from "../../util/writeDiary";
import GlobalStyle from "../../globalStyle/GlobalStyle";
import happy from "../../../assets/images/mood/happy.png";
import disgust from "../../../assets/images/mood/disgust.png";
import sad from "../../../assets/images/mood/sad.png";
import angry from "../../../assets/images/mood/angry.png";
import fear from "../../../assets/images/mood/fear.png";
import expressionless from "../../../assets/images/mood/expressionless.png";
import surprised from "../../../assets/images/mood/surprised.png";
import { setupURLPolyfill } from "react-native-url-polyfill";
import HeaderBack from '../../components/HeaderBack'
import { moodTextKr } from "../../util/MoodWeather";
import ModeColorStyle from "../../globalStyle/ModeColorStyle";
import {
	COLOR_DARK_BLUE,
	COLOR_DARK_RED,
	COLOR_DARK_WHITE,
	COLOR_LIGHT_BLUE,
	COLOR_LIGHT_RED,
	COLOR_WHITE,
} from "../../globalStyle/color";
import themeContext from "../../globalStyle/themeContext";
import diaryTopic from '../../util/diaryTopic.json'

setupURLPolyfill();

const AnalysisResultScreen = ({ navigation, route }) => {
	const isDark = useContext(themeContext).theme === "dark";

	const [analysisMood, setAnalysisMood] = useState("");
	const [subject, setSubject] = useState([]);
	const [selectedTopic, setSelectedTopic] = useState([]);
	const [analysisLoding, setAnalysisIsLoding] = useState(false);
	const [loadingText, setLoadingText] = useState("분석중 . . .");

	const { params } = route;
	const selectedMood = params ? params.selectedMood : null;
	const selectedWeather = params ? params.selectedWeather : null;
	const selectedDate = params.selectedDate;

	useEffect(() => {
		const interval = setInterval(() => {
			setLoadingText((prevText) => {
				if (prevText === "분석중 . . .") {
					return "분석중";
				} else if (prevText === "분석중") {
					return "분석중 .";
				} else if (prevText === "분석중 .") {
					return "분석중 . .";
				} else if (prevText === "분석중 . .") {
					return "분석중 . . .";
				}
			});
		}, 400);

		return () => clearInterval(interval);
	}, []);

	// useEffect(() => {
	// 	setIsLoding(false);
	// 	if (analysisLoding && openaiLoding) {
	// 		setIsLoding(false);
	// 	}
	// 	if (analysisLoding === true && openaiLoding === true) {
	// 		setIsLoding(true);
	// 	}
	// }, [analysisLoding, openaiLoding]);

	/**
	 * 일기 주제 선택 함수
	 * @param {string} topic
	 */
	const handelTopicPress = (topic) => {
		if (selectedTopic.includes(topic)) {
			setSelectedTopic(selectedTopic.filter((t) => t !== topic));
		} else {
			setSelectedTopic([...selectedTopic, topic]);
		}
	};
	const isSelected = !!selectedTopic;

	/**
	 * 일기쓰기 화면으로 이동하는 함수
	 */
	const handleNextButton = () => {
		navigation.navigate("WriteContent", {
			selectedTopic: selectedTopic,
			selectedMood: selectedMood,
			selectedWeather: selectedWeather,
			selectedDate: selectedDate,
		});
	};

	/**
	 * moodImage 오브젝트
	 */
	const moodImage = {
		happy: happy,
		sad: sad,
		disgust: disgust,
		surprised: surprised,
		angry: angry,
		fear: fear,
		expressionless: expressionless,
	};

	useEffect(() => {
		const getGoogleVisionResultFun = async () => {
			setAnalysisIsLoding(false);
			try {
				const result = await getGoogleVisionResult(route.params.imageBase64);

				if(!result){
					if(await addButtonPressCount()){
            Alert.alert('얼굴 인식실패!', '카메라로 얼굴이 나오도록 지금 자신의 모습을 찍어주세요! \n 감정분석을 통해 일기 주제를 추천해드립니다.')
            navigation.pop()
          }
        }
        else{
          setAnalysisMood(result);

          const randomTopic = await diaryTopic[`${analysisMood}`].shuffle()
          console.log(randomTopic.slice(0, 6))
          // setSubject(randomTopic.slice(0, 6))
          // console.log(subject)

          setAnalysisIsLoding(true);
        }
			} catch (error) {
				console.error(error);
			}
		};
		getGoogleVisionResultFun();
	}, [analysisMood]);

	return (
			<SafeAreaView style={[GlobalStyle.safeAreaWrap, {alignItems: 'center'}]}>
        <HeaderBack text="Wirte Diary" backFun={() => navigation.pop()}/>
				{analysisLoding ? (
          <View style={{flex:.97, alignContent: 'center', justifyContent: 'center', width:'100%'}}>
            <View style={[styles.result]}>
              {/* 감정 분석 결과 text 이미지 */}
              <View style={{flex:.45}}>
                <Text
                  style={[
                    styles.title,
                    ModeColorStyle(isDark).font_DEFALUT,
                    GlobalStyle.font_title1,
                  ]}
                >
                  나의 감정 분석 결과
                </Text>
                {
                  // 분석된 감정이 공백이 아니면 분석감정 출력
                  analysisMood !== "" && (
                    <View style={styles.analysis}>
                      <Image
                        source={moodImage[analysisMood]}
                        style={styles.icon}
                      ></Image>
                      <Text
                        style={[
                          GlobalStyle.font_body,
                          ModeColorStyle(isDark).font_DEFALUT,
                        ]}
                      >
                        {moodTextKr[analysisMood]}
                      </Text>
                    </View>
                  )
                }
              </View>
              {/* 일기 주제들 wrap */}
              <View style={{flex: .55}}>
                <Text
                  style={[
                    GlobalStyle.font_title2,
                    styles.topicTitle,
                    ModeColorStyle(isDark).font_DEFALUT,
                  ]}
                >
                  이런 주제는 어때요?
                </Text>

                <View style={styles.subject}>
                  {subject &&
                    subject.map((item, index) => {
                      return (
                        <View style={styles.buttonContainer} key={index}>
                          <TouchableOpacity
                            onPress={() => handelTopicPress(item)}
                            style={[
                              styles.touchable,
                              {
                                borderColor: isDark
                                  ? COLOR_DARK_BLUE
                                  : COLOR_LIGHT_BLUE,
                              },
                              selectedTopic.includes(item) && {
                                backgroundColor: isDark
                                  ? COLOR_DARK_BLUE
                                  : COLOR_LIGHT_BLUE,
                              },
                            ]}
                          >
                            <Text
                              style={[
                                styles.topic,
                                {
                                  color: isDark
                                    ? COLOR_DARK_BLUE
                                    : COLOR_LIGHT_BLUE,
                                },
                                GlobalStyle.font_body,
                                selectedTopic.includes(item) && {
                                  color: isDark ? COLOR_DARK_WHITE : COLOR_WHITE,
                                },
                              ]}
                              ellipsizeMode="tail"
                            >
                              {item}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                </View>
              </View>
            </View>
            <View style={{width:'100%', alignItems:'center'}}>
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
					</View>
				) : (
					<View style={styles.loading}>
            <ActivityIndicator size="large" color={isDark?COLOR_DARK_RED:COLOR_LIGHT_RED} style={{marginBottom: 30}}/>
						<Text style={[styles.loadingText, GlobalStyle.font_body, ModeColorStyle(isDark).font_DEFALUT]}>
							{loadingText}
						</Text>
					</View>
				)}
			</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},

	loading: {
    flex:1,
		justifyContent: "center",
		alignContent: "center",
	},
	loadingText: {
		letterSpacing: 3,
    alignItems : 'center',
		// justifyContent: "center",
		textAlign: "center",
    marginBottom: 60
	},
	result: {
		width: "100%",
    flex:.97,
		justifyContent: "center",
		alignContent: "center",
		textAlign: "center",
	},

	title: {
		marginVertical: 30,
		justifyContent: "center",
		alignContent: "center",
		textAlign: "center",
	},
	analysis: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	icon: {
		width: 90,
		height: 90,
		marginBottom: 15,
		borderRadius: 42,
		justifyContent: "flex-start",
		alignSelf: "center",
		overflow: "hidden",
		resizeMode: "contain",
	},

	subject: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
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
		alignItems: "flex-start",
		justifyContent: "flex-start",
	},
	topic: {
		marginHorizontal: 10,
		marginVertical: 5,
	},
	selectedText: {
		color: "white",
	},
	buttonTouchable: {
		width: 250,
		height: 55,
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
