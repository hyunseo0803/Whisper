import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Text, Pressable } from "react-native";
import { readcontact } from "../../util/database";
import GlobalStyle from "../../globalStyle/GlobalStyle";

const SettingContactLog = ({ navigation }) => {
	const [contacts, setContacts] = useState([]);

	useEffect(() => {
		const fetchCTitles = async () => {
			try {
				const contactList = await readcontact();
				setContacts(contactList);
				console.log("모든 cTitle:", contactList);
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
						top: 10,
					}}
				>
					<Text style={GlobalStyle.font_caption1}>Inquiry history</Text>
				</View>
				{contacts.map((contact, index) => (
					<Pressable
						key={index}
						onPress={() => detailContact(contact.title)}
						style={{
							paddingVertical: 8,
						}}
					>
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							<Text style={[styles.cTitle, GlobalStyle.font_body]}>
								{index + 1}. {contact.title}
							</Text>
							<Text style={[styles.cDate, GlobalStyle.font_body]}>
								{contact.date}
							</Text>
						</View>
						{index !== contacts.length + 1 && <View style={styles.separator} />}
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
		width: 300,
		height: 1,
		backgroundColor: "#E2E2E2",
		marginVertical: 10,
	},
});

export default SettingContactLog;
