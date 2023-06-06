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

const SettingAlert = ({ navigation }) => {
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
		await AsyncStorage.setItem("AlertTime", selectedTime);
		console.log(selectedTime);
		navigation.navigate("setting");
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

	return (
		<View>
			<SafeAreaView
				style={{
					alignItems: "center",
					height: "90%",
					marginVertical: 40,
					marginHorizontal: 20,
				}}
			>
				<View
					style={{
						width: "100%",
						alignItems: "center",
						marginBottom: 100,
					}}
				>
					<Text>Setting Alert</Text>
				</View>
				<View
					style={{
						width: "100%",
						alignItems: "center",
					}}
				>
					<Text>일기를 매일 쓸 수 있도록 제가 챙겨줄게요</Text>
				</View>
				<View
					style={{
						justifyContent: "space-between",
						backgroundColor: "white",
						borderRadius: 15,
						display: "flex",
						flexDirection: "row",
						width: "100%",
						height: "9%",
						marginVertical: 10,
						shadowColor: "black",
						shadowOffset: {
							width: 5,
							height: 7,
						},
						shadowOpacity: 0.2,
						shadowRadius: 8,
					}}
				>
					<Text style={{ marginHorizontal: 20, marginVertical: 20 }}>
						알람 시간 설정하기
					</Text>
					<View
						style={{
							justifyContent: "center",
							marginHorizontal: 10,
						}}
					>
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
					<Text
						style={{
							color: "gray",
							alignItems: "center",
							textAlign: "center",
							justifyContent: "center",
							marginVertical: 80,
							letterSpacing: 1,
						}}
					>
						알람 시간을 설정하시면, {"\n"}매일 소곤소곤 일기장이 일기 쓸 시간에
						{"\n"}
						알려드릴게요.
					</Text>
					<Pressable
						style={{
							width: 250,
							height: 50,
							backgroundColor: "#E76B5C",
							borderRadius: 15,
							marginTop: 150,
							justifyContent: "center",
							alignItems: "center",
						}}
						onPress={savedAlertTime()}
					>
						<Text style={{ color: "white", letterSpacing: 10 }}>저장</Text>
					</Pressable>
				</View>
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({});

export default SettingAlert;
