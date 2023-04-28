import { Button, StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import ExpoDatePicker from "../components/ExpoDatePicker/ExpoDatePicker";
import GlobalStyle from "../globalStyle/GlobalStyle";

const Write = () => {
	return (
		<SafeAreaView
			style={{
				display: "flex",
				alignItems: "center",
				marginHorizontal: "10%",
				marginVertical: "10%",
				height: "90%",
				backgroundColor: "red",
			}}
		>
			<View style={styles.container}>
				<View className="writeDiary">
					<Text style={[styles.writeDiaryText, GlobalStyle.font_caption1]}>
						Write Diary
					</Text>
				</View>
				<ExpoDatePicker />
			</View>
			<View style={styles.title}>
				<Text>기분</Text>
			</View>
		</SafeAreaView>
	);
};

export default Write;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		justifyContent: "center",
		backgroundColor: "yellow",
	},
	writeDiary: {
		backgroundColor: "red",
		width: "100%",
		// height: 50,
		justifyContent: "center",
		alignItems: "center",
	},
	writeDiaryText: {
		width: "100%",
		textAlign: "center",
		textAlignVertical: "center",
	},
});
