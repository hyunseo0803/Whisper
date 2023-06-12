import React, { useEffect } from "react";
import {
	View,
	StyleSheet,
	Text,
	SafeAreaView,
	Pressable,
	Alert,
} from "react-native";
import { useState } from "react";
import Toggle from "react-native-toggle-input";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GlobalStyle from "../../globalStyle/GlobalStyle";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";

const SettingAlert = ({ navigation }) => {
	const [toggle, setToggle] = useState(false);
	const [modal, setModal] = useState(false);
	const [selectedTime, setSelectedTime] = useState(null);
	const [initialToggle, setInitialToggle] = useState(false);

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
			navigation.pop();

			const { status } = await Notifications.requestPermissionsAsync();
			if (status === "granted") {
				const now = new Date();
				const selectedDateTime = moment(selectedTime, "HH:mm").toDate();
				let trigger;

				if (selectedDateTime < now) {
					const nextDay = moment().add(1, "day").startOf("day");
					const nextTrigger = nextDay.clone().set({
						hour: moment(selectedDateTime).hours(),
						minute: moment(selectedDateTime).minutes(),
					});

					if (nextTrigger < now) {
						trigger = nextDay
							.clone()
							.add(1, "day")
							.set({
								hour: moment(selectedDateTime).hours(),
								minute: moment(selectedDateTime).minutes(),
							})
							.toDate();
					} else {
						trigger = nextTrigger.toDate();
					}
				} else {
					trigger = selectedDateTime;
				}

				const schedulingOptions = {
					time: trigger,
					repeat: "day",
				};

				const notificationContent = {
					title: "소곤소곤",
					body: "오늘의 일기를 쓸 시간이에요 ! ",
					sound: true,
					vibrate: true,
					priority: "high",
				};

				await Notifications.scheduleNotificationAsync({
					content: notificationContent,
					trigger: schedulingOptions.time,
				});

				console.log(
					"알림이 울릴 날짜와 시간:",
					moment(trigger).format("YYYY-MM-DD HH:mm")
				);
			} else {
				Alert.alert("알림 권한 설정", "알림 권한 설정 해 주세요.");
			}
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

	useEffect(() => {
		const loadAlertTime = async () => {
			const storedAlertTime = await AsyncStorage.getItem("AlertTime");
			if (storedAlertTime) {
				setToggle(true);
				setSelectedTime(storedAlertTime);
				setInitialToggle(true);
			}
		};

		loadAlertTime();
	}, []);
	useEffect(() => {
		const handleToggleOff = async () => {
			if (initialToggle && !toggle) {
				try {
					await AsyncStorage.removeItem("AlertTime");
				} catch (error) {
					console.log("Error removing AlertTime from AsyncStorage:", error);
				}
			}
		};

		handleToggleOff();
	}, [toggle]);

	return (
		<View>
			<SafeAreaView style={styles.safearea}>
				<View style={styles.topLabel}>
					<Text style={GlobalStyle.font_caption1}>Setting Alert</Text>
				</View>
				<View style={styles.middleLabel}>
					<Text style={[{ marginHorizontal: 5 }, GlobalStyle.font_caption1]}>
						일기를 매일 쓸 수 있도록 제가 챙겨줄게요
					</Text>
					<Feather name="smile" size={24} color="black" />
				</View>
				<View style={styles.selectTimeView}>
					<Ionicons
						name="alarm"
						size={45}
						color="black"
						style={styles.selectTimeView_icon}
					/>
					<Text style={[styles.selectTimeView_label, GlobalStyle.font_title2]}>
						알람 시간 설정하기
					</Text>
					<View style={styles.toggleWrapper}>
						<Toggle
							size={27}
							filled={true}
							circleColor={"white"}
							toggle={toggle}
							setToggle={handleToggle}
						/>

						<DateTimePickerModal
							isVisible={modal}
							mode="time"
							onConfirm={handleConfirmTime}
							onCancel={handleCancelTimePicker}
						/>
					</View>
				</View>
				<View>
					{selectedTime ? (
						<View>
							<Text style={[styles.selectedtimeView, GlobalStyle.font_title1]}>
								{selectedTime}
							</Text>
							<Text
								style={[
									{
										letterSpacing: 5,
									},
									styles.selectedwordView,
									GlobalStyle.font_body,
								]}
							>
								으로 선택되었습니다.
							</Text>
							<Text
								style={[
									{
										letterSpacing: 2,
									},
									styles.selectedwordView,
									GlobalStyle.font_caption1,
								]}
							>
								알림 받기를 원하시면 저장 버튼까지 눌러주세요 !
							</Text>
							<Pressable
								style={styles.pressableButton}
								onPress={savedAlertTime}
							>
								<Text style={[styles.pressableText, GlobalStyle.font_title2]}>
									저장
								</Text>
							</Pressable>
						</View>
					) : (
						<Text style={[styles.textView, GlobalStyle.font_body]}>
							알람 시간을 설정하시면, {"\n"}매일 소곤소곤 일기장이 일기 쓸
							시간에
							{"\n"}
							알려드릴게요.
						</Text>
					)}
				</View>
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	safearea: {
		alignItems: "center",
		height: "90%",
		marginVertical: 40,
		marginHorizontal: 20,
	},
	topLabel: {
		width: "100%",
		alignItems: "center",
		marginBottom: 100,
		top: 10,
	},
	middleLabel: {
		width: "100%",
		alignItems: "center",
		textAlign: "center",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
	},
	selectTimeView: {
		backgroundColor: "white",
		borderRadius: 15,
		flexDirection: "row",
		width: "100%",
		height: "8%",
		marginVertical: 10,
		shadowColor: "black",
		shadowOffset: {
			width: 5,
			height: 5,
		},
		shadowOpacity: 0.2,
		shadowRadius: 8,
	},
	selectTimeView_icon: {
		marginHorizontal: 10,
		marginVertical: 3,
		alignItems: "center",
		justifyContent: "center",
	},
	selectTimeView_label: {
		textAlign: "center",
		marginVertical: 15,
	},
	toggleWrapper: {
		justifyContent: "center",
		marginLeft: 40,
	},
	selectedtimeView: {
		color: "#5f5f5f",
		alignItems: "center",
		textAlign: "center",
		justifyContent: "center",
		marginTop: 80,
		letterSpacing: 5,
	},
	selectedwordView: {
		color: "#5f5f5f",
		textAlign: "center",
		marginTop: 15,
	},
	pressableButton: {
		width: 330,
		height: 50,
		backgroundColor: "#E76B5C",
		borderRadius: 15,
		marginTop: 240,
		marginHorizontal: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	pressableText: {
		color: "white",
	},
	textView: {
		color: "gray",
		alignItems: "center",
		textAlign: "center",
		justifyContent: "center",
		marginVertical: 80,
		letterSpacing: 1,
	},
});

export default SettingAlert;
