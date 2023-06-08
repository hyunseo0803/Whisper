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
		if (selectedTime) {
			await AsyncStorage.setItem("AlertTime", selectedTime);
			console.log(selectedTime);
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
						top: 10,
					}}
				>
					<Text style={GlobalStyle.font_caption1}>Setting Alert</Text>
				</View>
				<View
					style={{
						width: "100%",
						alignItems: "center",
						textAlign: "center",
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
					}}
				>
					<Text style={[{ marginHorizontal: 5 }, GlobalStyle.font_caption1]}>
						일기를 매일 쓸 수 있도록 제가 챙겨줄게요
					</Text>
					<Feather name="smile" size={24} color="black" />
				</View>
				<View
					style={{
						// justifyContent: "space-between",
						backgroundColor: "white",
						borderRadius: 15,
						// display: "flex",
						flexDirection: "row",
						width: "100%",
						height: "8%",
						marginVertical: 10,
						// position: "relative",
						shadowColor: "black",
						shadowOffset: {
							width: 5,
							height: 5,
						},
						shadowOpacity: 0.2,
						shadowRadius: 8,
					}}
				>
					<Ionicons
						name="alarm"
						size={45}
						color="black"
						style={{
							marginHorizontal: 10,
							marginVertical: 3,
							alignItems: "center",
							justifyContent: "center",
							// backgroundColor: "red",
						}}
					/>
					<Text
						style={[
							{
								// justifyContent: "center",
								textAlign: "center",
								marginVertical: 15,
								// alignItems: "center",
								// position: "absolute",
							},
							GlobalStyle.font_title2,
						]}
					>
						알람 시간 설정하기
					</Text>
					<View
						style={[
							{
								justifyContent: "center",
								marginLeft: 40,
							},
						]}
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
					{selectedTime ? (
						<View>
							<Text
								style={[
									{
										color: "#5f5f5f",
										alignItems: "center",
										textAlign: "center",
										justifyContent: "center",
										marginTop: 80,
										letterSpacing: 5,
									},
									GlobalStyle.font_title1,
								]}
							>
								{selectedTime}
							</Text>
							<Text
								style={[
									{
										color: "#5f5f5f",
										textAlign: "center",
										letterSpacing: 5,
										marginTop: 15,
									},
									GlobalStyle.font_body,
								]}
							>
								으로 선택되었습니다.
							</Text>
							<Text
								style={[
									{
										color: "#5f5f5f",
										textAlign: "center",
										letterSpacing: 2,
										marginTop: 15,
									},
									GlobalStyle.font_caption1,
								]}
							>
								알림 받기를 원하시면 저장 버튼까지 눌러주세요 !
							</Text>
							<Pressable
								style={{
									width: 330,
									height: 50,
									backgroundColor: "#E76B5C",
									borderRadius: 15,
									marginTop: 240,
									marginHorizontal: 10,
									// display: "flex",
									// flex: 1,
									justifyContent: "center",
									alignItems: "center",
									// position: "absolute",
									// textAlign: "center",
								}}
								onPress={savedAlertTime}
							>
								<Text
									style={[
										{
											color: "white",
											// wordSpacing: 10,
											// letterSpacing: 50,
											// position: "relative",
										},
										GlobalStyle.font_title2,
									]}
								>
									저장
								</Text>
							</Pressable>
						</View>
					) : (
						<Text
							style={[
								{
									color: "gray",
									alignItems: "center",
									textAlign: "center",
									justifyContent: "center",
									marginVertical: 80,
									letterSpacing: 1,
								},
								GlobalStyle.font_body,
							]}
						>
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

const styles = StyleSheet.create({});

export default SettingAlert;
