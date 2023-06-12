import React, { useCallback, useContext, useState } from "react";
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
import themeContext from "../../globalStyle/themeContext";
import {
	COLOR_DARK_PRIMARY,
	COLOR_DARK_THIRD,
	COLOR_LIGHT_PRIMARY,
	COLOR_LIGHT_THIRD,
} from "../../globalStyle/color";
import ModeColorStyle from "../../globalStyle/ModeColorStyle";
import HeaderBack from "../../components/HeaderBack";

const SettingContactLog = ({ navigation }) => {
	const isDark = useContext(themeContext).theme === "dark";
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
		<SafeAreaView style={[styles.safearea, GlobalStyle.safeAreaWrap]}>
			{/* header */}
			<HeaderBack text="Inquiry history" backFun={() => navigation.pop()} />

			{contacts.length === 0 ? (
				<View style={styles.nothingContentView}>
					<Text
						style={[
							GlobalStyle.font_body,
							styles.nothingContentText,
							ModeColorStyle(isDark).font_DEFALUT,
						]}
					>
						문의 내역이 없습니다.
					</Text>
					<Text
						style={[
							GlobalStyle.font_caption1,
							styles.nothingContentText,
							{ color: isDark ? COLOR_DARK_PRIMARY : COLOR_LIGHT_PRIMARY },
						]}
					>
						{"\n"}피드백도, 칭찬도 모두 좋으니 {"\n"}
						편하게 남겨주세요!
					</Text>
				</View>
			) : (
				<ScrollView style={{ flex: 1, width: "95%", paddingTop: 20 }}>
					{contacts.map((contact, index) => (
						<Pressable
							key={index}
							onPress={() => detailContact(contact.id)}
							style={[
								{ overflow: "auto", paddingVertical: 10 },
								{
									borderBottomWidth: index === contacts.length - 1 ? 0 : 1,
									borderColor: isDark ? COLOR_DARK_THIRD : COLOR_LIGHT_THIRD,
								},
							]}
						>
							<View style={styles.contactListView}>
								<Text
									style={[
										styles.cTitle,
										GlobalStyle.font_body,
										ModeColorStyle(isDark).font_DEFALUT,
									]}
									ellipsizeMode={"tail"}
									numberOfLines={1}
								>
									{index + 1}. {contact.title}
								</Text>
								<Text
									style={[
										styles.cDate,
										GlobalStyle.font_caption2,
										{
											color: isDark ? COLOR_DARK_PRIMARY : COLOR_LIGHT_PRIMARY,
										},
									]}
								>
									{contact.date}
								</Text>
							</View>
						</Pressable>
					))}
				</ScrollView>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safearea: {
		alignItems: "center",
	},
	cTitle: {
		flex: 0.97,
	},
	cDitle: {
		justifyContent: "flex-end",
	},
	nothingContentView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	nothingContentText: {
		letterSpacing: 3,
		textAlign: "center",
	},
	contactListView: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
});

export default SettingContactLog;
