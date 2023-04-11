import { Text, TouchableOpacity, View, Alert } from "react-native";
import React, { useState } from "react";
import GlobalStyle from "../../globalStyle/GlobalStyle";

export default function PwSettingSignup() {
	return (
		<View
			style={{
				width: "100%",
				height: 14,
				// position: "absolute",
				marginTop: 20,
				// flex: 1,
				flexDirection: "row",
				//backgroundColor: "red",
			}}
		>
			<TouchableOpacity
				activeOpacity={0.8}
				style={{
					//backgroundColor: "green",
					width: 100,
					height: 14,
					marginLeft: 70,
				}}
				onPress={() => Alert.alert("test", "테스트.")}
			>
				<Text
					style={[
						{
							color: "black",
							textAlign: "center",
						},
						GlobalStyle.font_caption1,
					]}
				>
					비밀번호 재설정
				</Text>
			</TouchableOpacity>
			<Text>|</Text>
			<TouchableOpacity
				activeOpacity={0.8}
				style={{
					//backgroundColor: "pink",
					width: 100,
					height: 14,
					marginEnd: 70,
				}}
				onPress={() => Alert.alert("test", "테스트.")}
			>
				<Text
					style={[
						{
							color: "black",
							textAlign: "center",
						},
						GlobalStyle.font_caption1,
					]}
				>
					회원가입
				</Text>
			</TouchableOpacity>
		</View>
	);
}
