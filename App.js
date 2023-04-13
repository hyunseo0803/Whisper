import { StyleSheet, View } from "react-native";
import React from "react";
import Login from "./src/pages/login/Login";
import * as Font from "expo-font";
import SignUp from "./src/pages/login/SignUp";

export default function App() {
	Font.loadAsync({ Diary: require("./assets/fonts/EF_Diary.ttf") });
	return (
		<View style={styles.container}>
			<SignUp />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
