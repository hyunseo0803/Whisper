import React, { useState, useEffect } from "react";
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
} from "react-native";
import GlobalStyle from "../../globalStyle/GlobalStyle";
// import ImagePicker from "react-native-image-picker";
import { Ionicons, Feather } from "@expo/vector-icons";
import btnAddImg from "../../../assets/images/btnAddImg.png";
import { auth, db } from "../../../firebase";
import * as ImagePicker from "expo-image-picker";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";
import { createTable, insertDiary } from "../../util/database";
import {
	getFirestore,
	collection,
	setDoc,
	doc,
	Firestore,
} from "firebase/firestore";
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

const WriteContent = ({ navigation, route }) => {
	const isDark = useColorScheme() === "dark";

	const [dSubject, setDSubject] = useState([]); // 일기 주제
	const [dMood, setDMood] = useState("");
	const [dWeather, setDWeather] = useState("");
	const [dDate, setDDate] = useState("");	// 일기 날짜
	const [dTitle, setDTitle] = useState(""); // 일기 제목
	const [dContent, setDContent] = useState(""); // 일기 내용
	const [contentLength, setContentLength] = useState(0);
	const [img1, setImg1] = useState(""); // 오늘의 사진
	const [canSave, setCanSave] = useState(
		isDark ? COLOR_DARK_THIRD : COLOR_LIGHT_THIRD
	);
	const [u_id, setU_id] = useState("");
	const [selectedImage, setSelectedImage] = useState("");
	// const [audioId, setAudioId] = useState("");
	// const user = auth.currentUser;

	const [isRecording, setIsRecording] = useState(false);
	// const [recognizedText, setRecognizedText] = useState("");
	const [recording, setRecording] = React.useState();
	const [recordingUri, setRecordingUri] = useState("");
	const [permissionResponse, requestPermission] = Audio.usePermissions();
	const [sound, setSound] = useState();
	const [audioData, setAudioData] = useState({});
	let [results, setResults] = useState([]);
	const db = SQLite.openDatabase("database.db");


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

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				const u_id = user.uid;
				setU_id(u_id);
			} else {
				setU_id(null);
			}
		});
	});
	const pickImage = async () => {
		// askPermissionsAsync();
		let imageData = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (!imageData.canceled) {
			setSelectedImage(imageData.assets[0].uri);
		}
	};

  console.log(dDate)

	const handleSave = async () => {
		try{
      console.log('hi')
      const isSaved = await insertDiary(dDate, dTitle, dMood, dWeather, selectedImage, dContent, audioData)
      console.log(isSaved)
      isSaved ? navigation.navigate("HomeTab") : Alert.alert("저장 실패!", '다시 시도해주세요');
    } catch(e){
      console.error(e)
    }
	};

  console.log(audioData)

	// 	const diaryRef = collection(db, "diary");
	// 	const newDiaryRef = doc(diaryRef, `${doc(diaryRef).id}`);
	// 	try {
	// 		await setDoc(newDiaryRef, data);
	// 		console.log("성공---------------------!");
	// 		navigation.navigate("HomeTab", { audioData: audioData });
	// 	} catch (error) {
	// 		console.log(data);
	// 		console.error(
	// 			`Error message: ${error.message}\nStack trace: ${error.stack}`
	// 		);
	// 		console.log(
	// 			`title:'${dTitle},content:${dContent},uid:${u_id},date${new Date()},image:${selectedImage},mood:${dMood},weather:${dWeather}`
	// 		);
	// 	}

	// const data = {
	// 	title: dTitle,
	// 	content: dContent,
	// 	u_id: u_id,
	// 	date: dDate,
	// 	image: selectedImage,
	// 	mood: dMood,
	// 	weather: dWeather,
	// };

	/**
	 * 음성 녹음 / stt 관련 함수
	 */
	const recordingOptions = {
		android: {
			extension: ".m4a",
			outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
			audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
			sampleRate: 44100,
			numberOfChannels: 2,
			bitRate: 128000,
		},
		ios: {
			extension: ".wav",
			audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
			sampleRate: 44100,
			numberOfChannels: 1,
			bitRate: 128000,
			linearPCMBitDepth: 16,
			linearPCMIsBigEndian: false,
			linearPCMIsFloat: false,
		},
	};

	React.useEffect(() => {
		getData();
	}, []);

	const generateUniqueId = () => {
		// 원하는 방식으로 고유 식별 문자열 생성 (예: uuid 라이브러리 사용)
		// 여기서는 임의의 숫자를 사용한 예시입니다.
		return Math.random().toString(36).substr(2, 9);
	};

	const stopRecording = async () => {
		console.log("Stopping recording..");
		// await SpeechToText.stopSpeech();
		// Speech.stop();
		setIsRecording(false);
		setRecording(undefined);
		// if (recording) {
		await recording.stopAndUnloadAsync();
		const recordingUri = recording.getURI();

		console.log(recordingUri);
		const { sound, status } = await recording.createNewLoadedSoundAsync();
		const audioId = generateUniqueId();
		const audio = {
			id: audioId,
			sound: sound,
			file: recordingUri,
			status: status,
		};

		//스토리지 저장
		await AsyncStorage.setItem(`audio_${audio.id}`, JSON.stringify(audio));
		const result = "녹음 완료 ";
		setAudioData(audio);
		// setAudioId(audioId);
		setResults(result);
		// setRecording(undefined);
		// }
	};

	const startRecording = async () => {
		setIsRecording(true);
		try {
			console.log("Requesting permissions..");
			await Audio.requestPermissionsAsync();
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: true,
				playsInSilentModeIOS: true,
			});

			console.log("Starting recording..");
			const { recording } = await Audio.Recording.createAsync(
				Audio.RecordingOptionsPresets.HIGH_QUALITY
			);
			setRecording(recording);
			console.log("Recording started");
			// await recoding.startAsync();
			// setIsRecording(true);
			// const initialText = "음성 인식을 시작합니다";
			// Speech.speak(initialText, {
			// 	language: "ko",
			// 	pitch: 1,
			// 	rate: 1,
			// });
		} catch (error) {
			// console.error("음성 인식 및 녹음을 시작할 수 없습니다:", error);
			Alert.alert("설정에서 마이크 권한을 허용해주세요");
		}
	};

	// useEffect(() => {
	// 	const recognitionListener = Speech.getAvailableVoicesAsync(
	// 		({ error, results }) => {
	// 			if (error) {
	// 				console.error("음성 인식 중 오류 발생:", error);
	// 				return;
	// 			}

	// 			const [text] = results;
	// 			setDContent(text);
	// 		}
	// 	);

	// 	return () => {
	// 		recognitionListener.remove();
	// 	};
	// }, []);

	/**
	 * 녹음 재생
	 */
	const getData = async () => {
		try {
			const audio = await AsyncStorage.getItem(`audio_${audioData.id}`);
			if (audio) {
				setAudioData(JSON.parse(audio));
			}
		} catch (e) {
			console.log(e);
		}
	};

	const playAudio = async () => {
		if (audioData) {
			const sound = new Audio.Sound();
			await sound.loadAsync({ uri: audioData.file, shouldPlay: true });
			console.log("Playing Sound");
			await sound.playAsync();
		}
	};

	const databasesetup = async () => {
		db.transaction((tx) => {
			tx.executeSql(`DROP TABLE IF EXISTS diary
      `);
		});
	};

	/**
	 * 주제입력해주는 버튼 이벤트
	 * @param {string} text
	 */
	const btnAddSubject = (text) => {
		setDContent(dContent + text + "\n");
	};

	/**
	 * 이미지 picker 함수
	 * @param {int} number
	 */
	const ImgPicker = async (number) => {
		// TODO to 현서 : 함수 추가해주세요
		Alert.alert(
			`${number}번째 이미지`,
			"이미지 피커로 이미지 uri 받아와주세요"
		);

		// onChangeImgUrl(number, 리턴값으로 받은 url)
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
											onPress: () => navigation.pop(),
										},
									]
								);
							}}
						>
							<Ionicons
								name="arrow-back-outline"
								size={40}
								color={isDark ? COLOR_DARK_WHITE : COLOR_BLACK}
							/>
						</Pressable>
						<View style={{ marginTop: 20 }}>
							<HeaderText headerText="Write Diary" />
						</View>
						<Pressable
							onPress={() =>
								Alert.alert(
									"저장하시겠습니까?",
									"저장하시면 더이상 수정이 불가능합니다!",
									[
										{ text: "취소" },
										{
											text: "저장",
											onPress: () => { handleSave() },
										},
									]
								)
							}
						>
							<Feather name="check" size={40} color={canSave} />
						</Pressable>
					</View>

					{/* body */}
					<ScrollView style={BodyStyle.mainWrap}>
						{
							// 일기 주제가 하나라도 있다면 실행
							dSubject !== undefined && (
								<ScrollView style={headerStyle.subjectWrap} horizontal>
									{dSubject.map((subjectElement, index) => (
										<Pressable
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
										</Pressable>
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
								style={[
									BodyStyle.titleInput,
									GlobalStyle.font_title2,
									ModeColorStyle(isDark).font_DEFALUT,
								]}
							/>
						</View>
						{/* 음성녹음 버튼 */}
						<Pressable
							style={BodyStyle.btnMic}
							onPress={() => (recording ? stopRecording() : startRecording())}
						>
							<Text>{recording ? "Stop Recording" : "Start Recording"} </Text>
							{/* <Ionicons name="mic-circle" size={45} color="#E76B5C"></Ionicons> */}
						</Pressable>
						{recordingUri ? <Text>Recording URI: {recordingUri}</Text> : null}
						<Pressable onPress={playAudio}>
							<Text>녹음 내용 다시듣기</Text>
						</Pressable>

						{/* 본문 textInput */}

						<TextInput
							onChangeText={(text) => setDContent(text)}
							value={isRecording ? results + dContent : dContent}
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
						<Pressable onPress={databasesetup}>
							<Text>데이터베이스초기화</Text>
						</Pressable>

							<View
								style={{
									width: "100%",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Pressable style={BodyStyle.btnImg} onPress={() => pickImage()}>
									{selectedImage ? (
										<Image
											source={{ uri: selectedImage }}
											onChangePhoto={{ uri: setSelectedImage }}
											style={{ width: "100%", height: "100%" }}
										/>
									) : (
										<Image
											source={require("../../../assets/images/btnAddImg.png")}
											style={{ width: "100%", height: "100%" }}
										/>
									)}
								</Pressable>
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
		paddingHorizontal: 15,
		paddingVertical: 10,
		marginHorizontal: 5,
		borderRadius: 50,
		justifyContent: "center",
	},
	subjectText: {
		color: "#fff",
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

	btnMic: {
		marginTop: 18,
		alignItems: "center",
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
