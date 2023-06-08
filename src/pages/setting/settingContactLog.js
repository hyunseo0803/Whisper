import React, { useCallback, useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	SafeAreaView,
	Text,
	Pressable,
	ScrollView,
} from "react-native";
import { readcontact } from "../../util/database";
import GlobalStyle from "../../globalStyle/GlobalStyle";
import { useFocusEffect } from "@react-navigation/native";

const SettingContactLog = ({ navigation }) => {
	const [contacts, setContacts] = useState([]);

	const fetchCTitles = useCallback(async () => {
		try {
			const contactList = await readcontact();
			setContacts(contactList);
			console.log(contactList);
		} catch (error) {
			console.error("문의 상세내역 가져오기 오류:", error);
		}
	}, []);

	useFocusEffect(
		useCallback(() => {
			fetchCTitles();
		}, [fetchCTitles])
	);

	const detailContact = (id) => {
		navigation.navigate("settingContactDetail", { id: id });
	};
	return (
		<SafeAreaView style={styles.safearea}>
			{contacts.length === 0 ? (
				<View style={styles.nothingContentView}>
					<Text style={[GlobalStyle.font_body, styles.nothingContentText]}>
						문의 내역이 없습니다.
					</Text>
					<Text style={[GlobalStyle.font_caption1, styles.nothingContentText]}>
						{"\n"}피드백도, 칭찬도 모두 좋으니 {"\n"}
						편하게 남겨주세요!
					</Text>
				</View>
			) : (
				<>
					<View style={styles.topLabel}>
						<Text style={GlobalStyle.font_caption1}>Inquiry history</Text>
					</View>
					{contacts.map((contact, index) => (
						<Pressable
							key={index}
							onPress={() => detailContact(contact.id)}
							style={{
								overflow: "auto",
							}}
						>
							<View style={styles.contactListView}>
								<Text style={[styles.cTitle, GlobalStyle.font_body]}>
									{index + 1}. {contact.title}
								</Text>
								<View style={{ justifyContent: "flex-end" }}>
									<Text style={[styles.cDate, GlobalStyle.font_caption2]}>
										{contact.date}
									</Text>
								</View>
							</View>
							{index !== contacts.length + 1 && (
								<View style={styles.separator} />
							)}
						</Pressable>
					))}
				</>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safearea: {
		alignItems: "center",
		height: "90%",
		marginVertical: 40,
		marginHorizontal: 20,
	},
	cTitle: {
		flex: 1,
	},
	cDitle: {},
	separator: {
		width: 300,
		height: 1,
		backgroundColor: "#E2E2E2",
		marginVertical: 10,
	},
	nothingContentView: {
		marginTop: "80%",
		justifyContent: "center",
		alignItems: "center",
	},
	nothingContentText: {
		letterSpacing: 3,
		textAlign: "center",
	},
	topLabel: {
		width: "100%",
		alignItems: "center",
		marginBottom: 100,
		top: 10,
	},
	contactListView: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
});

export default SettingContactLog;
