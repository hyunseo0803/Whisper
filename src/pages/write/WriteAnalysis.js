import React, { useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	Button,
	Alert,
	Platform,
	SafeAreaView,
	Text,
	Pressable,
	Image,
	useColorScheme,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import GlobalStyle from "../../globalStyle/GlobalStyle";
import camera from "../../../assets/images/camera.png";
import write from "../../../assets/images/write.png";
import ModeColorStyle from "../../globalStyle/ModeColorStyle";
import { Ionicons } from "@expo/vector-icons";
import {
	COLOR_DARK_BLUE,
	COLOR_DARK_FOURTH,
	COLOR_DARK_RED,
	COLOR_DARK_SECONDARY,
	COLOR_DARK_THIRD,
	COLOR_DARK_WHITE,
	COLOR_LIGHT_BLUE,
	COLOR_LIGHT_RED,
	COLOR_LIGHT_SECONDARY,
	COLOR_WHITE,
} from "../../globalStyle/color";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WriteAnalysis = ({ navigation: { navigate }, route }) => {
	const isDark = useColorScheme() === "dark";
	const { params } = route;
	const selectedMood = params ? params.selectedMood : null;
	const selectedWeather = params ? params.selectedWeather : null;
	const selectedDate = params ? params.selectedDate : null;
	const [buttonPressCount, setButtonPressCount] = useState(null);

	/**
	 * 카메라 접근권한 확인
	 * @returns {boolean}true
	 */
	const askPermissionsAsync = async () => {
		if (Platform.OS !== "web") {
			const { status } = await ImagePicker.requestCameraPermissionsAsync();
			if (status !== "granted") {
				Alert.alert(
					"카메라 접근 권한",
					"설정으로 이동해서 카메라 접근권한을 허용해주세요!"
				);
				return false;
			}
			return true;
		}
	};
	/**
	 * 사진 찍고 base64값 받는 함수
	 */
	useEffect(() => {
		const fetchButtonPressCount = async () => {
			try {
				const storedButtonPressCount = await AsyncStorage.getItem(
					"buttonPressCount"
				);
				if (storedButtonPressCount !== null) {
					setButtonPressCount(storedButtonPressCount);
				} else {
					// 만약 저장된 값이 없다면 초기값을 설정해줄 수 있습니다.
					setButtonPressCount("2");
				}
			} catch (error) {
				// 오류 처리
			}
		};

		fetchButtonPressCount();
	}, []);
	const pickImage = async () => {
		//현재 날짜 받기 , 최근 버튼 누른 날짜 및 횟수 가져오기
		const currentDate = new Date().toISOString().split("T")[0];
		const storedDate = await AsyncStorage.getItem("buttonPressDate");
		let buttonPressCount = await AsyncStorage.getItem("buttonPressCount");
		// let buttonPressCount = parseInt(buttonPressCountstr);

		//만약 한번도 버튼을 누른적이 없어서 가져올 storedDate 가 없는 경우
		if (!storedDate) {
			//현재 날짜로 최근 버튼 누른 날짜 저장
			await AsyncStorage.setItem("buttonPressDate", currentDate);
		}
		//최근 누른 날짜와 현재 날짜가 다른경우,
		if (storedDate && storedDate !== currentDate) {
			// 최근 누른 날짜에 현재 날짜로 업데이트
			await AsyncStorage.setItem("buttonPressDate", currentDate);
			// 버튼 누른 횟수 1로 업데이트
			await AsyncStorage.setItem("buttonPressCount", "1");
			buttonPressCount = "1";
			setButtonPressCount(buttonPressCount);

			//버튼 누른 적이 없는 경우
		} else if (!buttonPressCount) {
			//버튼 누른 횟수 1로 업데이트
			await AsyncStorage.setItem("buttonPressCount", "1");
			buttonPressCount = "1";
			setButtonPressCount(buttonPressCount);
		} else {
			// 버튼 누름 횟수가 있는 경우
			let count = parseInt(buttonPressCount);
			if (count > 0) {
				// 버튼 누름 횟수가 2보다 작은 경우, 횟수 감소
				buttonPressCount = (count - 1).toString();
				setButtonPressCount(buttonPressCount);
				await AsyncStorage.setItem("buttonPressCount", buttonPressCount);
			} else {
				// 버튼 누름 횟수가 0인 경우, 누를 수 없음
				Alert.alert(
					"오늘의 분석 티켓을 모두 사용하셨습니다. 내일 다시 이용하실 수 있어요 !"
				);
				return;
			}
		}

		await AsyncStorage.setItem("buttonPressCount", buttonPressCount);
		console.log(buttonPressCount);
		askPermissionsAsync();
		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images, // 이미지만 받음
			allowsEditing: true, // 사진 수정 허용 여부
			aspect: [1, 1], // 사진의 비율
			quality: 0.5,
			base64: true,
		});

		if (!result.canceled) {
			// 사진 다 찍고 next누르면 base64 파라미터와 함께 페이지 이동
			navigate("AnalysisResultScreen", {
				imageBase64: result.assets[0].base64,
				selectedMood: selectedMood,
				selectedWeather: selectedWeather,
				selectedDate: selectedDate,
			});
		}
		// }
		// }
	};
	const resetButtonCount = async () => {
		try {
			await AsyncStorage.removeItem("buttonPressCount");
			console.log("true");
		} catch (error) {
			console.log("AsyncStorage 초기화 오류:", error);
		}
	};
	const Gowrite = async () => {
		navigate("WriteContent", {
			selectedMood: selectedMood,
			selectedWeather: selectedWeather,
			selectedDate: selectedDate,
		});
	};

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
				<Text
					style={[
						GlobalStyle.font_caption2,
						ModeColorStyle(isDark).font_DEFALUT,
					]}
				>
					Write Diary
				</Text>
			</View>
			<View style={[styles.presswrap]}>
				<Text
					style={[
						styles.count,
						GlobalStyle.font_body,
						{ color: isDark ? COLOR_DARK_WHITE : COLOR_LIGHT_BLUE },
					]}
				>
					남은 분석 티켓: {buttonPressCount} 개
				</Text>

				<Pressable
					style={[
						styles.presszone,
						!isDark ? styles.shadow : {},
						{
							borderColor: isDark ? COLOR_DARK_RED : COLOR_LIGHT_RED,
							backgroundColor: isDark ? COLOR_DARK_FOURTH : COLOR_WHITE,
						},
					]}
					onPress={() => {
						pickImage();
					}}
				>
					<View style={[styles.inline]}>
						<Ionicons
							name="camera-outline"
							size={50}
							color={isDark ? COLOR_WHITE : COLOR_LIGHT_BLUE}
						/>
						<Text
							style={[
								styles.text,
								{ color: isDark ? COLOR_DARK_WHITE : COLOR_LIGHT_BLUE },
								GlobalStyle.font_title2,
							]}
						>
							감정 분석하고 {"\n"}일기 주제 추천 받기
						</Text>
					</View>
				</Pressable>
				<Pressable
					style={[
						styles.presszone,
						!isDark ? styles.shadow : {},
						{
							borderColor: isDark ? COLOR_DARK_RED : COLOR_LIGHT_RED,
							backgroundColor: isDark ? COLOR_DARK_FOURTH : COLOR_WHITE,
						},
					]}
					onPress={() => {
						Gowrite();
					}}
				>
					<View style={[styles.inline]}>
						<Ionicons
							name="create-outline"
							size={50}
							color={isDark ? COLOR_WHITE : COLOR_LIGHT_BLUE}
						/>
						<Text
							style={[
								styles.text,
								{ color: isDark ? COLOR_DARK_WHITE : COLOR_LIGHT_BLUE },
								GlobalStyle.font_title2,
							]}
						>
							일기 쓰기
						</Text>
					</View>
				</Pressable>
				{/* <Pressable
					onPress={() => {
						resetButtonCount();
					}}
				>
					<Text>초기화</Text>
				</Pressable> */}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	presswrap: {
		marginTop: 80,
		width: "100%",
		// backgroundColor: "yellow",
	},
	presszone: {
		width: "100%",
		height: "35%",
		backgroundColor: "white",
		marginTop: 15,
		marginBottom: 50,
		justifyContent: "center",
		borderWidth: 2,
		borderRadius: 15,
	},
	shadow: {
		shadowColor: COLOR_LIGHT_BLUE,
		shadowOffset: {
			width: 6,
			height: 8,
		},
		shadowOpacity: 0.2,
		shadowRadius: 8,
	},
	text: {
		marginTop: 15,
		alignItems: "center",
		textAlign: "center",
		fontSize: 20,
		fontWeight: 800,
	},
	inline: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 15,
		// backgroundColor: "yellow",
	},
	icon: {
		width: 40,
		height: 40,
	},

	count: {
		// backgroundColor: "red",
		textAlign: "right",
		marginHorizontal: 15,

		// height: 100,
	},
});

export default WriteAnalysis;
