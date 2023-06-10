import React, { useContext, useEffect } from "react";
import {
	View,
	StyleSheet,
	Text,
	SafeAreaView,
	Pressable,
	Alert,
  Switch,
} from "react-native";
import { useState } from "react";
import Toggle from "react-native-toggle-input";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GlobalStyle from "../../globalStyle/GlobalStyle";
import { Feather, Ionicons } from "@expo/vector-icons";
import HeaderBack from "../../components/HeaderBack";
import ModeColorStyle from "../../globalStyle/ModeColorStyle";
import themeContext from "../../globalStyle/themeContext";
import { COLOR_DARK_BLUE, COLOR_DARK_FOURTH, COLOR_DARK_PRIMARY, COLOR_DARK_RED, COLOR_DARK_SECONDARY, COLOR_DARK_WHITE, COLOR_LIGHT_BLUE, COLOR_LIGHT_PRIMARY, COLOR_LIGHT_RED, COLOR_LIGHT_SECONDARY, COLOR_WHITE } from "../../globalStyle/color";

const SettingAlert = ({ navigation }) => {
  const isDark = useContext(themeContext).theme === 'dark'

	const [toggle, setToggle] = useState(false);
	const [modal, setModal] = useState(false);
	const [selectedTime, setSelectedTime] = useState(null);

	const handleToggle = () => {
		setToggle(!toggle);
	};

	const handleConfirmTime = (time) => {
		const selectedTime = moment(time).format("HH:mm");
		setSelectedTime(selectedTime);
	};
	const handleCancelTimePicker = () => {
		setModal(false);
		setToggle(false);
	};
	const savedAlertTime = async () => {
		if (selectedTime) {
			await AsyncStorage.setItem("AlertTime", selectedTime);
			navigation.navigate("setting");
		} else {
			Alert.alert(
				"알림 시간 저장",
				"알람시간을 설정하지 않나요? 그렇다면 저장버튼을 누르지 않으셔도 됩니다!"
			);
		}
	};

	useEffect(() => {
		if (toggle && selectedTime === null) {
			setModal(true);
		} else if (toggle && selectedTime !== null) {
			setModal(false);
		} else if (toggle !== true && selectedTime !== null) {
			setSelectedTime(null);
		}
	});

  const colorGray = isDark?COLOR_DARK_SECONDARY:COLOR_LIGHT_SECONDARY
  const colorPrimary = isDark?COLOR_DARK_PRIMARY:COLOR_LIGHT_PRIMARY

	return (
	  <SafeAreaView style={GlobalStyle.safeAreaWrap}>
      <HeaderBack text={'Setting Alert'} backFun={() => navigation.pop()}/>

        <View style={{flex:.4}}>
          <View style={styles.middleLabel}>
            <Text style={[{ marginHorizontal: 5, color:isDark?COLOR_DARK_SECONDARY:COLOR_LIGHT_SECONDARY }, 
              GlobalStyle.font_caption1 ]}
            >
              일기를 매일 쓸 수 있도록 제가 챙겨줄게요
            </Text>
            <Feather name="smile" size={20} color={isDark?COLOR_DARK_SECONDARY:COLOR_LIGHT_SECONDARY} />
          </View>

          {/* 시간 설정 박스 */}
          <View style={[styles.selectTimeView, {backgroundColor:isDark?COLOR_DARK_FOURTH:COLOR_WHITE}]}>
            <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
              <Ionicons
                name="alarm"
                size={35}
                style={[styles.selectTimeView_icon, ModeColorStyle(isDark).font_DEFALUT]}
              />
              <Text style={[styles.selectTimeView_label, GlobalStyle.font_title2, ModeColorStyle(isDark).font_DEFALUT]}>
                알람 시간 설정하기
              </Text>
            </View>
            <Switch
              value={toggle}
              onValueChange={handleToggle}
              trackColor={
                {true : isDark?COLOR_DARK_RED:COLOR_LIGHT_RED}
              }
            />
            <DateTimePickerModal
              isVisible={modal}
              mode="time"
              onConfirm={handleConfirmTime}
              onCancel={handleCancelTimePicker}
            />
          </View>
        </View>

        {/* 설명 & 시간 view */}
				<View style={{flex:.58}}>
					{selectedTime ? (
						<View style={styles.isSelectedTime}>
              {/* text Wrap */}
              <View>
                <Text style={[styles.selectedtimeView, GlobalStyle.font_title1, {color:colorPrimary}]}>
                  {selectedTime}
                </Text>
                <Text
                  style={[
                    {letterSpacing: 5, color:colorPrimary},
                    styles.selectedwordView,
                    GlobalStyle.font_body,
                  ]}
                >
                  으로 선택되었습니다.
                </Text>
                <Text style={[{letterSpacing: 2, color:colorPrimary}, styles.selectedwordView, GlobalStyle.font_caption1 ]}>
                  알림 받기를 원하시면 저장 버튼까지 눌러주세요 !
                </Text>
              </View>
							<Pressable
								style={[styles.pressableButton, ModeColorStyle(isDark).bg_RED]}
								onPress={savedAlertTime}
							>
								<Text style={[{color:isDark?COLOR_DARK_WHITE:COLOR_WHITE}, GlobalStyle.font_title2]}>
									저장
								</Text>
							</Pressable>
						</View>
					) : (
						<Text style={[styles.textView, GlobalStyle.font_body, {color:isDark?COLOR_DARK_SECONDARY:COLOR_LIGHT_SECONDARY}]}>
							알람 시간을 설정하시면, {"\n"}매일 소곤소곤 일기장이 일기 쓸 시간에 {"\n"} 알려드릴게요.
						</Text>
					)}
				</View>
			</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safearea: {
		alignItems: "center",
	},

	middleLabel: {
		width: "100%",
		alignItems: "center",
		textAlign: "center",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
    marginTop: 30,
    marginBottom:10
	},
	selectTimeView: {
		borderRadius: 15,
		flexDirection: "row",
		width: "100%",
		shadowColor: "black",
		shadowOffset: {
			width: 5,
			height: 5,
		},
		shadowOpacity: 0.2,
		shadowRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
		paddingHorizontal: 15,
    paddingVertical: 10
	},
	selectTimeView_icon: {
    marginRight: 10,
		marginVertical: 3,
		alignItems: "center",
		justifyContent: "center",
	},
	selectTimeView_label: {
		textAlign: "center",
	},
	selectedtimeView: {
		alignItems: "center",
		textAlign: "center",
		justifyContent: "center",
		letterSpacing: 5,
	},
	selectedwordView: {
		textAlign: "center",
		marginTop: 15,
	},
	pressableButton: {
		width: '90%',
		height: 55,
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
	},
	textView: {
		textAlign: "center",
		letterSpacing: 1,
	},
  isSelectedTime:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
});

export default SettingAlert;
