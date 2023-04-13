import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React from "react";
import GlobalStyle from "../../globalStyle/GlobalStyle";
import { Ionicons } from "@expo/vector-icons";

export default function FindPwButon(props) {
	return (
		<View style={styles.loginButtonWrap}>
			<TouchableOpacity
				activeOpacity={0.8}
				style={styles.loginbutton}
				onPress={props.handleFindPw}
			>
				<Ionicons
					name="ios-mail-outline"
					size={24}
					color="white"
					style={{ paddingHorizontal: 10 }}
				/>
				<Text
					style={[
						{
							color: "white",
							fontSize: 20,
						},
						GlobalStyle.font_title2,
					]}
				>
					메일 보내기
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
		marginTop: 110,
	},
	loginbutton: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,
		backgroundColor: "#E76B5C",
		flexDirection: "row",
	},
});
