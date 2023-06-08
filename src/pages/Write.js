import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Image,
	TouchableOpacity,
  Pressable,
  useColorScheme,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import GlobalStyle from "../globalStyle/GlobalStyle";
import { Ionicons, Feather } from "@expo/vector-icons";
import DatePicker from "../components/datePicker/DatePicker";
import { changeNumberTwoLength } from "../util/Calender";
import ModeColorStyle from "../globalStyle/ModeColorStyle";
import { COLOR_BLACK, COLOR_DARK_WHITE } from "../globalStyle/color";
import HeaderText from "../components/Header";
import { getDiaryDates } from "../util/database";
import { moodArr, MoodWeatherFile, weatherArr } from "../util/MoodWeather";
import themeContext from "../globalStyle/themeContext";

const Write = ({ navigation }) => {
  const isDark = useContext(themeContext).theme === 'dark';

  const DATE = new Date()

	const [selectedMood, setSelectedMood] = useState("");
	const [selectedWeather, setSelectedWeather] = useState("");
	const [selectedDate, setSelectedDate] = useState(`${DATE.getFullYear()}-${changeNumberTwoLength(DATE.getMonth()+1)}-${changeNumberTwoLength(DATE.getDate())}`);
	const [datepickershow, setDatepickerShow] = useState(false) 
  const [dotMarkingDate, setDotmarkingDate] = useState(false)

  /**
   * mood onPress 함수
   * @param {string} mood 
   */
	const handleMoodPress = (mood) => {
		if (selectedMood === mood) {
			setSelectedMood("");
		} else {
			setSelectedMood(mood);
		}
	};

  /**
   * 날씨 onPress 함수
   * @param {string} weather 
   */
	const handleWeatherPress = (weather) => {
		if (selectedWeather === weather) {
			setSelectedWeather("");
		} else {
			setSelectedWeather(weather);
		}
	};

	const isBothSelected = !!selectedMood && !!selectedWeather && selectedDate!=='';
	
  /**
   * next 버튼 onPress 함수
   */
  const handleNextButton = () => {
		navigation.navigate("WriteAnalysis", {
			selectedMood: selectedMood,
			selectedWeather: selectedWeather,
			selectedDate: selectedDate,
		});
	};

  // 화면이 뜨고 한 번만 실행
  useEffect(() => {
    // 일기를 쓸 수 없는 날짜 배열 찾는 함수
    async function getDiaryDateFun() {
      setDotmarkingDate(await getDiaryDates())
    } 
    getDiaryDateFun()
  }, []);

	return (
		<SafeAreaView
			style={[GlobalStyle.safeAreaWrap, {alignItems:'center', justifyContent:'center', flex:1}]}>
			<View style={styles.container}>
				<View className="writeDiary" style={styles.writeDiary}>
          <Pressable
          onPress={() => navigation.pop()}>
            <Feather name="arrow-left" size={30} color={isDark?COLOR_DARK_WHITE : COLOR_BLACK} style={{marginBottom:20}}/>
          </Pressable>
				  <HeaderText headerText='WriteDiary' isDark={isDark}/>
          <Feather name="arrow-left" size={36} color="rgba(0,0,0,0)" style={{marginBottom:20}}/>
				</View>

        {/* datepicker */}
        <Pressable
        style={[{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}]}
        onPress={() => setDatepickerShow(true)}>
          <Text style={[, ModeColorStyle(isDark).font_DEFALUT,
          (GlobalStyle.font_title1)]}>
            {
              selectedDate.replace(/\-/g, '.')
            }
          </Text>
          <Ionicons
							name="caret-down-outline"
							size={30}
							color={isDark?COLOR_DARK_WHITE : COLOR_BLACK}
							style={{ marginLeft: 10 }}
					/>
        </Pressable>
				{
					datepickershow &&
					<DatePicker
						visible = {datepickershow}
						setVisible = {setDatepickerShow}
            setSelectedDate={setSelectedDate}
            dotMarkingDate={dotMarkingDate}
					/>
				}
			</View>
			<View style={styles.chooseEmotion}>
				<View style={styles.title}>
					<Text
						style={[ { justifyContent: "center", textAlign: "center" },
							GlobalStyle.font_title2, ModeColorStyle(isDark).font_DEFALUT ]}
					> 기분 </Text>
				</View>
				{/* 기분과 날씨 고르는 view */}
				<View style={styles.choose}>
          {
            moodArr.map((mood, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleMoodPress(mood)}
                style={[
                  styles.touchable,
                  selectedMood === mood && styles.selected,
                ]}
                activeOpacity={1}
              >
                <Image source={MoodWeatherFile(mood)} style={styles.emotion}></Image>
              </TouchableOpacity>
            ))
          }
				</View>
			</View>
			<View style={styles.chooseWeather}>
				<View style={styles.title}>
					<Text
						style={[
							{ justifyContent: "center", textAlign: "center" },
							GlobalStyle.font_title2, ModeColorStyle(isDark).font_DEFALUT ]}
					>날씨</Text>
				</View>
				{/* 기분과 날씨 고르는 view */}
				<View style={[styles.choose, {width: 80*3}]}>
          {
            weatherArr.map((weather, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleWeatherPress(weather)}
                style={[
                  styles.touchable,
                  selectedWeather === weather && styles.selected,
                ]}
                activeOpacity={1}
              >
                <Image source={MoodWeatherFile(weather)} style={styles.emotion}></Image>
              </TouchableOpacity>
            ))
          }
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
							{ color: isBothSelected ? "white" : 'rgba(255,255,255,0.5)' },
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
	},
	chooseEmotion: {
		width: "100%",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	chooseWeather: {
		width: "100%",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	writeDiary: {
    display: 'flex',
    flexDirection: 'row',
		justifyContent: "space-between",
		alignItems: "center",
	},
	writeDiaryText: {
		width: "100%",
		textAlign: "center",
		textAlignVertical: "center",
	},
	title: {
		width: "100%",
		marginBottom: 20,
	},
	choose: {
		display: "flex",
		flexDirection: "row",
		marginTop: 5,
    width: 110*3,
    flexWrap: 'wrap',
    justifyContent: 'center'
	},
	emotion: {
		width: 36,
		height: 36,
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
	},
	button: {
		marginTop: 50,
		marginVertical: 10,
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
