import React, { useState, useEffect, useContext } from "react";
import {
	View,
	StyleSheet,
	SafeAreaView,
	Text,
	Pressable,
	ScrollView,
	TextInput,
	KeyboardAvoidingView,
	Keyboard,
	Image,
	Alert,
	useColorScheme,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import GlobalStyle from "../../globalStyle/GlobalStyle";
import { Ionicons, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { insertDiary } from "../../util/database";
import ModeColorStyle from "../../globalStyle/ModeColorStyle";
import {
	COLOR_BLACK,
	COLOR_DARK_RED,
	COLOR_DARK_SECONDARY,
	COLOR_DARK_THIRD,
	COLOR_DARK_WHITE,
	COLOR_LIGHT_RED,
	COLOR_LIGHT_SECONDARY,
	COLOR_LIGHT_THIRD,
} from "../../globalStyle/color";
import HeaderText from "../../components/Header";
import { deleteAudio, getAudioData, playAudio, startRecording, stopPlayAudio, stopRecording } from "../../util/audioRecord";
import { base64ToUri, pickDiaryImage } from "../../util/writeDiary";
import themeContext from "../../globalStyle/themeContext";

const WriteContent = ({ navigation, route }) => {
	const isDark = useContext(themeContext).theme === 'dark';

	const [dSubject, setDSubject] = useState([]); // 일기 주제
	const [dMood, setDMood] = useState("");
	const [dWeather, setDWeather] = useState("");
	const [dDate, setDDate] = useState(""); // 일기 날짜
	const [dTitle, setDTitle] = useState(""); // 일기 제목
	const [dContent, setDContent] = useState(""); // 일기 내용
	const [contentLength, setContentLength] = useState(0);
	const [canSave, setCanSave] = useState(
		isDark ? COLOR_DARK_THIRD : COLOR_LIGHT_THIRD
	);
	const [selectedImage, setSelectedImage] = useState("");

	const [isRecording, setIsRecording] = useState(false);
	const [sound, setSound] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [recording, setRecording] = useState();
	const [audioData, setAudioData] = useState({});
  const [imgUri, setImgUri] = useState(''); // 예시 이미지에 넣을 이미지 uri

	useEffect(() => {
		const { params } = route;
		const selectedTopic = params.selectedTopic;
		const selectedMood = params.selectedMood;
		const selectedWeather = params.selectedWeather;
		const selectedDate = params.selectedDate;
		setDSubject(selectedTopic);
		setDMood(selectedMood);
		setDWeather(selectedWeather);
		setDDate(selectedDate);
	}, []);

	const pickImage = async () => {
    const result = await pickDiaryImage();
    result !== '' ? setSelectedImage(result) : Alert.alert('사진불러오기 실패!', '사진을 불러오는데 실패했습니다. 다시 시도해주세요.')
	};

  /**
   * 일기 저장 함수
   */
	const handleSave = async () => {
		try {
			const isSaved = await insertDiary(
				dDate,
				dTitle,
				dMood,
				dWeather,
				selectedImage,
				dContent,
				audioData
			);
			isSaved
				? navigation.navigate("HomeTab")
				: Alert.alert("저장 실패!", "다시 시도해주세요");
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * 음성 녹음 / stt 관련 함수
	 */

	useEffect(() => {
		getAudioData(audioData.id);
	}, []);

  /**
   * 음성중지 & 저장 버튼함수
   */
	const handleStopRecording = async () => {
		setIsRecording(false);
		setRecording(undefined);
    const result = await stopRecording(recording)
		setAudioData(result);
	};

  /**
   * 녹음시작 버튼 함수
   */
	const handleStartRecording = async () => {
		setIsRecording(true);
    const result = await startRecording()
    if(!result){
      console.error("Failed to start recording:", error);
      Alert.alert("녹음 실패!", '다시 시도해주세요.')
    }
    else{
      setRecording(result)
    }
	};

  /**
   * 일기 재생 함수
   */
	const handlePlayAudio = async () => {
    const result = await playAudio(audioData, setIsPlaying)
    if(!result){
      Alert.alert('재생할 녹음이 없습니다.')
    }else{
      setSound(result)
			setIsPlaying(true);
    }
	};

	/**
	 * 녹음 삭제해주는 함수
	 */
	const handelDeleteAudio = () => {
		Alert.alert(
			"녹음을 삭제하시겠습니까?",
			"삭제하신 내용은 복구가 불가능합니다.",
			[
				{ text: "유지하기" },
				{
					text: "삭제하기",
					onPress: okhandelDeleteAudio,
				},
			]
		);
	};

	const okhandelDeleteAudio = async () => {
    setAudioData(await deleteAudio(audioData))
	};

	/**
	 * 주제입력해주는 버튼 이벤트
	 * @param {string} text
	 */
	const btnAddSubject = (text) => {
    const result = dContent + "\n" + text + "\n"

		setDContent(result);
	};

	useEffect(() => {
		// 텍스트 길이 계산
		setContentLength(dContent.length);
		// 저장 가능한지 판단
		if (
			dContent.replace(/\s/g, "") === "" ||
			dTitle.replace(/\s/g, "") === ""
		) {
			isDark ? setCanSave(COLOR_DARK_THIRD) : setCanSave(COLOR_LIGHT_THIRD);
		} else {
			isDark ? setCanSave(COLOR_DARK_RED) : setCanSave(COLOR_LIGHT_RED);
		}
	}, [dContent, dTitle]);

  useEffect(() => {
    const updateImageUri = async() => {
      setImgUri(await base64ToUri(selectedImage))
    };
    updateImageUri()
  }, [selectedImage])

	return (
		<SafeAreaView style={GlobalStyle.safeAreaWrap}>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
				<Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
					{/* header */}
					<View style={[headerStyle.mainWrap]}>
						<Pressable
							onPress={() => {
								Alert.alert(
									"취소하시겠습니까?",
									"현재까지 작성된 내용은 저장되지 않습니다.",
									[
										{
											text: "계속 작성하기",
										},
										{
											text: "홈으로",
											onPress: () => navigation.navigate("HomeTab"),
										},
									]
								);
							}}
						>
              <Feather name="arrow-left" size={35}
								color={isDark ? COLOR_DARK_WHITE : COLOR_BLACK}
              />

						</Pressable>
						<View style={{ marginTop: 10 }}>
							<HeaderText headerText="Write Diary" isDark={isDark}/>
						</View>
						<TouchableOpacity
							onPress={() =>
								Alert.alert(
									"저장하시겠습니까?",
									"저장하시면 더이상 수정이 불가능합니다!",
									[
										{ text: "취소" },
										{
											text: "저장",
											onPress: () => {
												handleSave();
											},
										},
									]
								)
							}
						>
							<Feather name="check" size={35} color={canSave} />
						</TouchableOpacity>
					</View>

					{/* body */}
					<ScrollView style={BodyStyle.mainWrap}>
						{
							// 일기 주제가 하나라도 있다면 실행
							dSubject !== undefined && (
								<ScrollView style={headerStyle.subjectWrap} horizontal>
									{dSubject.map((subjectElement, index) => (
										<TouchableOpacity
											style={headerStyle.subjectBox}
											key={index}
											name={subjectElement}
											onPress={() => btnAddSubject(subjectElement)}
										>
											<Text
												style={[GlobalStyle.font_body, headerStyle.subjectText]}
											>
												{subjectElement}
											</Text>
										</TouchableOpacity>
									))}
								</ScrollView>
							)
						}

						{/* 일기 제목 */}
						<View style={BodyStyle.titleInputBox}>
							<TextInput
								value={dTitle}
								onChangeText={(text) => setDTitle(text)}
								placeholder="일기에 제목을 붙여주세요"
                placeholderTextColor={
                  isDark ? COLOR_DARK_SECONDARY : COLOR_LIGHT_SECONDARY
                }
								style={[
									BodyStyle.titleInput,
									GlobalStyle.font_title2,
									ModeColorStyle(isDark).font_DEFALUT,
								]}
							/>
						</View>

						{/* 음성녹음 버튼 */}
						<View style={BodyStyle.micWrap}>
							{audioData.id !== undefined ? (
								<TouchableOpacity onPress={handelDeleteAudio}>
									<Ionicons
										name="close-circle"
										size={45}
										color={isDark ? COLOR_DARK_RED : COLOR_LIGHT_RED}
									/>
								</TouchableOpacity>
							) : null}
							<TouchableOpacity
								style={BodyStyle.btnMic}
								onPress={() => (recording ? handleStopRecording() : handleStartRecording())}
							>
								<Ionicons
									name={recording ? "stop-circle" : "mic-circle"}
									size={45}
									color={isDark ? COLOR_DARK_RED : COLOR_LIGHT_RED}
								/>
							</TouchableOpacity>
							{audioData.id !== undefined &&
                <TouchableOpacity onPress={() => !isPlaying ? handlePlayAudio() : stopPlayAudio(sound, setIsPlaying, isPlaying)}>
									<Ionicons
										name= {isPlaying ? "pause-circle" : "play-circle"}
										size={45}
										color={isDark ? COLOR_DARK_RED : COLOR_LIGHT_RED}
									/>
								</TouchableOpacity>
							}
						</View>

						{/* 본문 textInput */}

						<TextInput
							onChangeText={(text) => setDContent(text)}
              value={dContent}
							placeholder="음성 인식 기능(녹음시작)을 활용하거나 직접 입력하여 일기를 기록해 보세요! 
            여러분의 이야기를 기록해드릴게요. 오늘은 어떤 하루였나요? :)"
							placeholderTextColor={
								isDark ? COLOR_DARK_SECONDARY : COLOR_LIGHT_SECONDARY
							}
							editable
							multiline
							textAlign="center"
							style={[
								BodyStyle.contentInput,
								GlobalStyle.font_body,
								ModeColorStyle(isDark).font_DEFALUT,
							]}
						/>

						<View style={BodyStyle.textCountWrap}>
							<Text
								style={[
									{ color: "#86878C" },
									BodyStyle.textCountText,
									GlobalStyle.font_caption2,
								]}
							>
								{contentLength}
							</Text>
						</View>
						<View
							style={{
								width: "100%",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<TouchableOpacity style={BodyStyle.btnImg} onPress={() => pickImage()}>
								{selectedImage ? (
									<Image
										source={{ uri: imgUri }}
										style={{ width: "100%", height: "100%" }}
									/>
								) : (
									<Image
										source={require("../../../assets/images/btnAddImg.png")}
										style={{ width: "100%", height: "100%" }}
									/>
								)}
							</TouchableOpacity>
						</View>
					</ScrollView>
				</Pressable>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

const headerStyle = StyleSheet.create({
	mainWrap: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
		justifyContent: "space-between",
	},

	subjectWrap: {
		width: "100%",
		maxHeight: 35,
		marginTop: 10,
		display: "flex",
		flexDirection: "row",
		flexWrap: "nowrap",
	},
	subjectBox: {
		boxSizing: "border-box",
		backgroundColor: "#4E4981",
		// paddingHorizontal: 15,
		marginHorizontal: 5,
		borderRadius: 50,
		justifyContent: "center",
	},
	subjectText: {
		color: "#fff",
    marginVertical:10,
    marginHorizontal: 15
	},
});

const BodyStyle = StyleSheet.create({
	mainWrap: {
		display: "flex",
		flex: 20,
	},
	titleInputBox: {
		width: "100%",
		alignItems: "center",
		marginTop: 15,
	},
	titleInput: {
		width: "70%",
		textAlign: "center",
		padding: 7,
		borderBottomWidth: 1,
		borderColor: "#86878C",
	},

	/**
	 * 음성 녹음 관련 wrap
	 */
	micWrap: {
		display: "flex",
		flexDirection: "row",
		marginTop: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	btnMic: {
		alignItems: "center",
		marginHorizontal: 10,
		padding: 5,
	},

	contentInput: {
		width: "100%",
		marginTop: 5,
		minHeight: 250,
		maxHeight: 500,
	},

	textCountWrap: {
		width: "100%",
		marginTop: 15,
		justifyContent: "flex-end",
		display: "flex",
		flexDirection: "row",
	},
	textCountText: {
		textAlign: "right",
	},

	btnImg: {
		width: 250,
		height: 250,
		borderRadius: 10,
		overflow: "hidden",
		marginTop: 40,
		marginHorizontal: 10,
	},
});

export default WriteContent;
