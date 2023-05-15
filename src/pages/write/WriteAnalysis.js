import React from "react";
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
import { Ionicons } from '@expo/vector-icons';
import { COLOR_DARK_BLUE, COLOR_DARK_FOURTH, COLOR_DARK_RED, COLOR_DARK_SECONDARY, COLOR_DARK_THIRD, COLOR_DARK_WHITE, COLOR_LIGHT_BLUE, COLOR_LIGHT_RED, COLOR_LIGHT_SECONDARY, COLOR_WHITE } from "../../globalStyle/color";

const WriteAnalysis = ({ navigation: { navigate }, route }) => {
	const isDark = useColorScheme() === 'dark'
	const { params } = route;
	const selectedMood = params ? params.selectedMood : null;
	const selectedWeather = params ? params.selectedWeather : null;
	const selectedDate = params ? params.selectedDate : null;

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
	const pickImage = async () => {
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
				<Text style={[GlobalStyle.font_caption2, ModeColorStyle(isDark).font_DEFALUT]}>Write Diary</Text>
			</View>
			<View style={[styles.presswrap]}>
				<Pressable
					style={[styles.presszone, !isDark?styles.shadow : {}, {borderColor:isDark?COLOR_DARK_RED:COLOR_LIGHT_RED, backgroundColor:isDark?COLOR_DARK_FOURTH:COLOR_WHITE}]}
					onPress={() => {
						pickImage();
					}}
				>
					<View style={[styles.inline]}>
            <Ionicons name="camera-outline" size={50} color={isDark?COLOR_WHITE:COLOR_LIGHT_BLUE} />
						<Text style={[styles.text, {color: isDark?COLOR_DARK_WHITE:COLOR_LIGHT_BLUE}, GlobalStyle.font_title2]}>
							감정 분석하고 {"\n"}일기 주제 추천 받기
						</Text>
					</View>
				</Pressable>
				<Pressable
					style={[styles.presszone, !isDark?styles.shadow : {}, {borderColor:isDark?COLOR_DARK_RED:COLOR_LIGHT_RED, backgroundColor:isDark?COLOR_DARK_FOURTH:COLOR_WHITE}]}
					onPress={() => {
						Gowrite();
					}}
				>
					<View style={[styles.inline]}>
            <Ionicons name="create-outline" size={50} color={isDark?COLOR_WHITE:COLOR_LIGHT_BLUE} />
						<Text style={[styles.text, {color: isDark?COLOR_DARK_WHITE:COLOR_LIGHT_BLUE}, GlobalStyle.font_title2]}>일기 쓰기</Text>
					</View>
				</Pressable>
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
		marginTop: 75,
		width: "100%",
	},
	presszone: {
		width: "100%",
		height: "35%",
		backgroundColor: "white",
		marginVertical: 30,
		justifyContent: "center",
		borderWidth: 2,
		borderRadius: 15,
	},
  shadow:{
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
	},
	icon: {
		width: 40,
		height: 40,
	},
});

export default WriteAnalysis;
