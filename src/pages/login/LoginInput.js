import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	View,
	Alert,
	SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import GlobalStyle from "../../globalStyle/GlobalStyle";

export default function LoginInput(props) {
	const [showPassword, setShowPassword] = useState(false);

	const passwordShowcheck = () => {
		setShowPassword(!showPassword);
	};

	return (
		<View
			style={{
				// backgroundColor: "white",
				alignItems: "stretch",
				marginTop: 50,
				flexDirection: "row",
				flexWrap: "wrap",
			}}
		>
			<TextInput
				style={[styles.inputbox, GlobalStyle.font_caption1]}
				value={props.email}
				placeholder="이메일"
				label="email"
				onChangeText={props.setEmail}
			/>
			<View
				style={{
					width: "100%",
					height: 60,
					//backgroundColor: "blue",
				}}
			>
				<TextInput
					style={[styles.inputbox, GlobalStyle.font_caption1]}
					value={props.password}
					placeholder="비밀번호"
					onChangeText={props.setPassword}
					label="Password"
					secureTextEntry={!showPassword}
				/>
				<Pressable style={styles.selectShow} onPress={passwordShowcheck}>
					<Ionicons
						name={showPassword ? "eye-off-outline" : "eye-outline"}
						size={24}
						color="black"
					/>
				</Pressable>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	inputbox: {
		// flex: 1,
		width: "100%",
		height: 60,
		borderColor: "#4E4981",
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
		marginBottom: 20,
		position: "relative",
		//backgroundColor: "red",
	},
	selectShow: {
		height: "100%",
		position: "absolute",
		right: 0,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 10,
	},
});
