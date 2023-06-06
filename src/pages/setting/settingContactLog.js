import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Text, Pressable } from "react-native";
import { readcontact } from "../../util/database";

const SettingContactLog = ({ navigation }) => {
	const [cTitles, setCTitles] = useState([]);

	useEffect(() => {
		const fetchCTitles = async () => {
			try {
				const cTitles = await readcontact();
				setCTitles(cTitles);
				console.log("모든 cTitle:", cTitles);
			} catch (error) {
				console.error("cTitle 가져오기 오류:", error);
			}
		};

		fetchCTitles();
	}, []);

	const detailContact = (cTitle) => {
		console.log(`'${cTitle}' 선택`);
		navigation.navigate("settingContactDetail", { cTitle: cTitle });
	};
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
					}}
				>
					<Text>Inquiry history</Text>
				</View>
				{cTitles.map((cTitle, index) => (
					<Pressable key={index} onPress={() => detailContact(cTitle)}>
						<Text style={styles.cTitle}>{cTitle}</Text>
						{index !== cTitles.length + 1 && <View style={styles.separator} />}
					</Pressable>
				))}
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	cTitle: {
		fontSize: 16,
		marginBottom: 4,
	},
	separator: {
		// width: "100%",
		height: 1,
		backgroundColor: "gray",
		marginVertical: 10,
	},
});

export default SettingContactLog;
