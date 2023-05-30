import {
	StyleSheet,
	TextInput,
	View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import GlobalStyle from "../../globalStyle/GlobalStyle";
import { COLOR_DARK_BLUE, COLOR_DARK_PRIMARY, COLOR_DARK_QUATERNARY, COLOR_DARK_SECONDARY, COLOR_LIGHT_BLUE, COLOR_LIGHT_PRIMARY, COLOR_LIGHT_SECONDARY } from "../../globalStyle/color";
import ModeColorStyle from "../../globalStyle/ModeColorStyle";

export default function LoginInput(props) {
	const [showPassword, setShowPassword] = useState(false);

  const {
    isDark,
    email,
    setEmail,
    password,
    setPassword
  } = props

	const passwordShowcheck = () => {
		setShowPassword(!showPassword);
	};

	return (
		<View
			style={{
				alignItems: "stretch",
				marginTop: 50,
				flexDirection: "row",
				flexWrap: "wrap",
			}}
		>
			<TextInput
				style={[styles(isDark).inputbox, GlobalStyle.font_caption1, ModeColorStyle(isDark).font_DEFALUT]}
				value={email}
				placeholder="이메일"
				label="email"
				onChangeText={setEmail}
        keyboardType="email-address"
			/>
			<View
				style={{
					width: "100%",
					height: 60,
				}}
			>
				<TextInput
					style={[styles(isDark).inputbox, GlobalStyle.font_caption1, ModeColorStyle(isDark).font_DEFALUT]}
					value={password}
					placeholder="비밀번호"
					onChangeText={setPassword}
					label="Password"
					secureTextEntry={!showPassword}
				/>
				<Pressable style={styles(isDark).selectShow} onPress={passwordShowcheck}>
					<Ionicons
						name={showPassword ? "eye-off-outline" : "eye-outline"}
						size={24}
						color={isDark ? COLOR_DARK_SECONDARY : COLOR_LIGHT_SECONDARY}
					/>
				</Pressable>
			</View>
		</View>
	);
}
const styles = (isdark) => StyleSheet.create({
	inputbox: {
		width: "100%",
		height: 60,
		borderColor: isdark ? COLOR_DARK_BLUE : COLOR_LIGHT_BLUE,
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
		marginBottom: 20,
		position: "relative",
		color: isdark ? COLOR_DARK_PRIMARY : COLOR_LIGHT_PRIMARY
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
