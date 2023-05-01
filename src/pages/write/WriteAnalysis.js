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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import GlobalStyle from "../../globalStyle/GlobalStyle";
import camera from "../../../assets/images/camera.png";
import write from "../../../assets/images/write.png";

const WriteAnalysis = ({ navigation: { navigate } }) => {
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
			});
		}
		// }
		// }
	};

	return (
		// TODO to 현서: 이 부분 바로 일기쓰기로 넘어갈건지 사진찍을건지 확인하는 그 페이지로 수정해주세요.
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
			<View style={styles.presswrap}>
				<Pressable
					style={styles.presszone}
					onPress={() => {
						pickImage();
					}}
				>
					<View style={styles.inline}>
						<Image source={camera} style={styles.icon}></Image>
						<Text style={styles.text}>
							감정 분석하고 {"\n"}일기 주제 추천 받기
						</Text>
					</View>
				</Pressable>
				<Pressable style={styles.presszone} onPress={() => {}}>
					<View style={styles.inline}>
						<Image source={write} style={styles.icon}></Image>
						<Text style={styles.text}>일기 쓰기</Text>
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
		// backgroundColor: "yellow",
	},
	presswrap: {
		marginTop: 75,
		// backgroundColor: "blue",
		width: "100%",
	},
	presszone: {
		width: "100%",
		height: "35%",
		backgroundColor: "white",
		marginVertical: 30,
		justifyContent: "center",
		borderColor: "#E76B5C",
		borderWidth: 2,
		borderRadius: 15,
		shadowColor: "#000",
		shadowOffset: {
			width: 8,
			height: 10,
		},
		shadowOpacity: 0.5,
		shadowRadius: 8,
	},
	text: {
		marginTop: 10,
		alignItems: "center",
		textAlign: "center",
		fontSize: 20,
		color: "#4E4981",
		fontWeight: 800,
	},
	inline: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 15,
		// backgroundColor: "red",
	},
	icon: {
		width: 40,
		height: 40,
	},
});

export default WriteAnalysis;
