import React, { useContext, useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	SafeAreaView,
	Text,
	Pressable,
} from "react-native";
import GlobalStyle from "../../globalStyle/GlobalStyle";
import { Feather, Ionicons } from "@expo/vector-icons";
import {
	COLOR_DARK_FOURTH,
	COLOR_DARK_RED,
	COLOR_DARK_WHITE,
	COLOR_LIGHT_BLUE,
	COLOR_LIGHT_RED,
	COLOR_WHITE, COLOR_BLACK
} from "../../globalStyle/color";
import { addButtonPressCount, getButtonPressCount, getButtonPressDate, moodAnalysisButtonPressCount, setButtonPress, takePhoto } from "../../util/writeDiary";
import themeContext from "../../globalStyle/themeContext";
import HeaderText from "../../components/Header";
import { useIsFocused } from "@react-navigation/native";

const WriteAnalysis = ({ navigation, route }) => {
  const isDark = useContext(themeContext).theme === 'dark';
  const isFocused = useIsFocused()

	const { params } = route;
	const selectedMood = params ? params.selectedMood : null;
	const selectedWeather = params ? params.selectedWeather : null;
	const selectedDate = params ? params.selectedDate : null;
	const [btnPressCount, setBtnPressCount] = useState(null);

  /**
   * 감정분석 버튼 함수
   */
  const handelTakePhoto = async() => {
    if(await moodAnalysisButtonPressCount(setBtnPressCount)){
      const result = await takePhoto();
	  if(result===''){
		await addButtonPressCount()
		setBtnPressCount(await getButtonPressCount())
	  }else{
		  navigation.navigate("AnalysisResultScreen", {
		    imageBase64: result,
		    selectedMood: selectedMood,
		    selectedWeather: selectedWeather,
		    selectedDate: selectedDate,
	    });
	  }
    }
  }

  /**
   * 일기쓰기 페이지 navigate 함수
   */
	const Gowrite = () => {
		navigation.navigate("WriteContent", {
			selectedMood: selectedMood,
			selectedWeather: selectedWeather,
			selectedDate: selectedDate,
		});
	};


  useEffect(() => {
		const fetchButtonPressCount = async () => {
			const currentDate = new Date().toISOString().split("T")[0];
			const storedDate = await getButtonPressDate();

			if (!storedDate || storedDate !== currentDate) {
				// 현재 날짜와 이전에 저장된 날짜가 다른 경우
        await setButtonPress(currentDate, '2')  // 초기값 2
				setBtnPressCount("2");
			} else {
				// 이전에 저장된 날짜와 현재 날짜가 같은 경우
				const storedButtonPressCount = await getButtonPressCount()
				if (storedButtonPressCount !== null) {
					setBtnPressCount(storedButtonPressCount);
				} else {
					// 만약 저장된 값이 없다면 초기값
					setBtnPressCount("2");
				}
			}
		};

		fetchButtonPressCount();
	}, [isFocused]);

	return (
		<SafeAreaView
			style={[{ alignItems: "center" }, GlobalStyle.safeAreaWrap]}
		>
			<View style={styles.container}>
      <Pressable
          onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={30} color={isDark?COLOR_DARK_WHITE : COLOR_BLACK} style={{marginBottom:20}}/>
          </Pressable>
				  <HeaderText headerText='WriteDiary' isDark={isDark}/>
          <Feather name="arrow-left" size={36} color="rgba(0,0,0,0)" style={{marginBottom:20}}/>
			</View>
			<View style={[styles.presswrap]}>
				<Text
					style={[
						styles.count,
						GlobalStyle.font_body,
						{ color: isDark ? COLOR_DARK_WHITE : COLOR_LIGHT_BLUE },
					]}
				>
					남은 분석 티켓: {btnPressCount} 개
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
					onPress={() => { handelTakePhoto(); }}
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
					onPress={() => { Gowrite(); }}
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
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
    display: 'flex',
    flexDirection: 'row',
		justifyContent: "space-between",
		alignItems: "center",
	},
	presswrap: {
		width: "90%",
    justifyContent: 'center'
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
	},
	icon: {
		width: 40,
		height: 40,
	},

	count: {
		textAlign: "right",
		marginHorizontal: 15,
	},
});

export default WriteAnalysis;
