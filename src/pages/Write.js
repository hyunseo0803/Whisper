import {
	Button,
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Image,
	Touchable,
	TouchableOpacity,
	ActionSheetIOS,
} from "react-native";
import React, { useState } from "react";
import ExpoDatePicker from "../components/ExpoDatePicker/ExpoDatePicker";
import GlobalStyle from "../globalStyle/GlobalStyle";
import happy from "../../assets/images/mood/happy.png";
import disgust from "../../assets/images/mood/disgust.png";
import surprised from "../../assets/images/mood/surprised.png";
import angry from "../../assets/images/mood/angry.png";
import sad from "../../assets/images/mood/sad.png";
import fear from "../../assets/images/mood/fear.png";
import expressionless from "../../assets/images/mood/expressionless.png";

import sunny from "../../assets/images/weather/sunny.png";
import littleCloud from "../../assets/images/weather/littleCloud.png";
import cloudy from "../../assets/images/weather/cloudy.png";
import rain from "../../assets/images/weather/rain.png";
import snow from "../../assets/images/weather/snow.png";
import lightning from "../../assets/images/weather/lightning.png";
import WriteAnalysis from "../pages/write/WriteAnalysis";

// 날짜 선택기를 사용할땐 라이트모드로 봐야한다.. 난 이걸 2시간동안 구글링...

const Write = ({ navigation }) => {
	const [selectedMood, setSelectedMood] = useState("");
	const [selectedWeather, setSelectedWeather] = useState("");
	const [selectedDate, setSelectedDate] = useState(new Date());

	const handleMoodPress = (mood) => {
		if (selectedMood === mood) {
			setSelectedMood("");
		} else {
			setSelectedMood(mood);
		}
	};

	const handleWeatherPress = (weather) => {
		if (selectedWeather === weather) {
			setSelectedWeather("");
		} else {
			setSelectedWeather(weather);
		}
	};
	const handleDateChange = (date) => {
		setSelectedDate(date);
	};
	const isBothSelected = !!selectedMood && !!selectedWeather;
	const handleNextButton = () => {
		navigation.navigate("WriteAnalysis", {
			selectedMood: selectedMood,
			selectedWeather: selectedWeather,
			selectedDate: selectedDate,
		});
		console.log(
			`Mood: ${selectedMood}, Weather: ${selectedWeather}, date:${selectedDate}`
		);
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
				<View className="writeDiary">
					<Text style={[styles.writeDiaryText, GlobalStyle.font_caption1]}>
						Write Diary
					</Text>
				</View>
				<ExpoDatePicker
					// style={{ width: "100%", height: "100%" }}
					date={selectedDate}
					onDateChange={handleDateChange}
				/>
			</View>
			<View style={styles.chooseEmotion}>
				<View style={styles.title}>
					<Text
						style={[
							{ justifyContent: "center", textAlign: "center" },
							GlobalStyle.font_title2,
							GlobalStyle.font_title2,
						]}
					>
						기분
					</Text>
				</View>
				{/* 기분과 날씨 고르는 view */}
				<View style={styles.choose}>
					<TouchableOpacity
						onPress={() => handleMoodPress("happy")}
						style={[
							styles.touchable,
							selectedMood === "happy" && styles.selected,
						]}
						activeOpacity={1}
					>
						<Image source={happy} style={styles.emotion}></Image>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => handleMoodPress("disgust")}
						style={[
							styles.touchable,
							selectedMood === "disgust" && styles.selected,
						]}
						activeOpacity={1}
					>
						<Image source={disgust} style={styles.emotion}></Image>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => handleMoodPress("surprised")}
						style={[
							styles.touchable,
							selectedMood === "surprised" && styles.selected,
						]}
						activeOpacity={1}
					>
						<Image source={surprised} style={styles.emotion}></Image>
					</TouchableOpacity>
				</View>
				<View style={styles.choose}>
					<TouchableOpacity
						onPress={() => handleMoodPress("angry")}
						style={[
							styles.touchable,
							selectedMood === "angry" && styles.selected,
						]}
						activeOpacity={1}
					>
						<Image source={angry} style={styles.emotion}></Image>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => handleMoodPress("sad")}
						style={[
							styles.touchable,
							selectedMood === "sad" && styles.selected,
						]}
						activeOpacity={1}
					>
						<Image source={sad} style={styles.emotion}></Image>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => handleMoodPress("fear")}
						style={[
							styles.touchable,
							selectedMood === "fear" && styles.selected,
						]}
						activeOpacity={1}
					>
						<Image source={fear} style={styles.emotion}></Image>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => handleMoodPress("expressionless")}
						style={[
							styles.touchable,
							selectedMood === "expressionless" && styles.selected,
						]}
						activeOpacity={1}
					>
						<Image source={expressionless} style={styles.emotion}></Image>
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.chooseWeather}>
				<View style={styles.title}>
					<Text
						style={[
							{ justifyContent: "center", textAlign: "center" },
							GlobalStyle.font_title2,
						]}
					>
						날씨
					</Text>
				</View>
				{/* 기분과 날씨 고르는 view */}
				<View style={styles.choose}>
					<TouchableOpacity
						onPress={() => handleWeatherPress("sunny")}
						style={[
							styles.touchable,
							selectedWeather === "sunny" && styles.selected,
						]}
						activeOpacity={1}
					>
						<Image source={sunny} style={styles.emotion}></Image>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => handleWeatherPress("littleCloud")}
						style={[
							styles.touchable,
							selectedWeather === "littleCloud" && styles.selected,
						]}
						activeOpacity={1}
					>
						<Image source={littleCloud} style={styles.emotion}></Image>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => handleWeatherPress("cloudy")}
						style={[
							styles.touchable,
							selectedWeather === "cloudy" && styles.selected,
						]}
						activeOpacity={1}
					>
						<Image source={cloudy} style={styles.emotion}></Image>
					</TouchableOpacity>
				</View>
				<View style={styles.choose}>
					<TouchableOpacity
						onPress={() => handleWeatherPress("rain")}
						style={[
							styles.touchable,
							selectedWeather === "rain" && styles.selected,
						]}
						activeOpacity={1}
					>
						<Image source={rain} style={styles.emotion}></Image>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => handleWeatherPress("snow")}
						style={[
							styles.touchable,
							selectedWeather === "snow" && styles.selected,
						]}
						activeOpacity={1}
					>
						<Image source={snow} style={styles.emotion}></Image>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => handleWeatherPress("lightning")}
						style={[
							styles.touchable,
							selectedWeather === "lightning" && styles.selected,
						]}
						activeOpacity={1}
					>
						<Image source={lightning} style={styles.emotion}></Image>
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.button}>
				<TouchableOpacity
					style={[
						styles.buttonTouchable,
						{
							backgroundColor: isBothSelected
								? "#E76B5C"
								: "rgba(231, 107, 92, 0.5)",
						},
					]}
					onPress={handleNextButton}
					disabled={!isBothSelected}
				>
					<Text
						style={[
							styles.buttonText,
							GlobalStyle.font_title2,
							{ color: isBothSelected ? "white" : "#CCCCCC" },
						]}
					>
						다음
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default Write;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		justifyContent: "center",
		// marginVertical: 10,
		// backgroundColor: "yellow",
	},
	chooseEmotion: {
		width: "100%",
		// height: 50,
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		// marginTop: 5,
		// marginBottom: 60,
		// backgroundColor: "black",
	},
	chooseWeather: {
		width: "100%",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		// backgroundColor: "blue",
	},
	writeDiary: {
		// backgroundColor: "red",
		width: "100%",
		// height: 50,
		justifyContent: "center",
		alignItems: "center",
	},
	writeDiaryText: {
		width: "100%",
		textAlign: "center",
		textAlignVertical: "center",
	},
	title: {
		width: "100%",
		// marginTop: 0,
		marginBottom: 40,
		// backgroundColor: "red",
	},
	choose: {
		display: "flex",
		flexDirection: "row",
		marginTop: 5,
		// backgroundColor: "yellow",
	},
	emotion: {
		width: 36,
		height: 36,
		// marginVertical: 10,
		// marginHorizontal: 15,
		borderRadius: 18,
		resizeMode: "contain",
	},
	selected: {
		borderColor: "#E76B5C",
	},
	touchable: {
		width: 46,
		height: 46,
		borderWidth: 2,
		borderColor: "transparent",
		borderRadius: 23,
		overflow: "hidden",
		marginVertical: 5,
		marginHorizontal: 15,
		justifyContent: "center",
		alignItems: "center",
		// padding: 10,
	},
	button: {
		marginTop: 50,
		marginVertical: 10,
		// marginHorizontal: 30,
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
