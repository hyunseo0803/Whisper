import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useState } from "react";
import GlobalStyle from "../../globalStyle/GlobalStyle";

export default function LoginButton(props) {
	return (
		<View style={styles.loginButtonWrap}>
			<TouchableOpacity
				activeOpacity={0.8}
				style={styles.loginbutton}
				onPress={props.handleLogin}
			>
				<Text
					style={[
						{
							color: "white",
							fontSize: 20,
						},
						GlobalStyle.font_title2,
					]}
				>
					로그인
				</Text>
			</TouchableOpacity>
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
		backgroundColor: "#E76B5C",
	},
});
