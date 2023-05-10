import {
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React from "react";
import GlobalStyle from "../../globalStyle/GlobalStyle";
import ModeColorStyle from "../../globalStyle/ModeColorStyle";
import { COLOR_DARK_PRIMARY, COLOR_LIGHT_PRIMARY } from "../../globalStyle/color";

export default function LoginButton(props) {
	return (
		<View style={styles.loginButtonWrap}>
			<Pressable
				style={[styles.loginbutton, ModeColorStyle(props.isDark).bg_RED]}
				onPress={props.handleLogin}
			>
				<Text
					style={[
						{ fontSize: 20, color: COLOR_DARK_PRIMARY },
						GlobalStyle.font_title2,
					]}
				>
					{props.title}
				</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	loginButtonWrap: {
		width: "100%",
		height: 60,
		flexDirection: "row",
		marginTop: 20,
	},
	loginbutton: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,
	},
});
