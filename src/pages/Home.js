import { SafeAreaView, StyleSheet, View, Pressable } from "react-native";
import React from "react";
import Calender from "../components/calender/Calender";
import GlobalStyle from "../globalStyle/GlobalStyle";
import { Image } from "react-native";
import Logo from "../../assets/images/Logo.png";
import { btnGoWriteScreen } from "../globalStyle/BtnStyle";
import { Ionicons } from "@expo/vector-icons";

const Home = () => {
	return (
		<SafeAreaView style={[GlobalStyle.GWidth, styles.container]}>
			<View style={styles.imgWrap}>
				<Image source={Logo} style={styles.logoImg} />
			</View>
			<Calender />
		</SafeAreaView>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
	},

	imgWrap: {
		height: 18,
		marginBottom: 40,
	},
	logoImg: {
		height: "100%",
		width: "100%",
		resizeMode: "contain",
	},
});
