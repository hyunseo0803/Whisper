import React, { useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	SafeAreaView,
	Text,
	Pressable,
	ScrollView,
	Alert,
} from "react-native";
import { readcontactDetail, deleteContact } from "../../util/database";
import GlobalStyle from "../../globalStyle/GlobalStyle";
import { AntDesign } from "@expo/vector-icons";

const SettingContactDetail = ({ navigation, route }) => {
	const { params } = route;
	const id = params ? params.id : null;
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [email, setEmail] = useState("");
	const [date, setDate] = useState("");
	useEffect(() => {
		const fetchDetails = async () => {
			try {
				const details = await readcontactDetail(id);
				setTitle(details.title);
				setContent(details.content);
				setEmail(details.email);
				setDate(details.date);
			} catch (error) {
				console.error("Error fetching details:", error);
			}
		};

		fetchDetails();
	}, [id]);

	const checkDeleteContact = () => {
		const okhandelDeleteContact = async () => {
			try {
				await deleteContact(id);
				navigation.navigate("settingContactLog");
				console.log("지움");
			} catch (error) {
				console.error("Error deleting contact:", error);
			}
		};

		Alert.alert(
			"문의 내역을 삭제하시겠습니까?",
			"삭제하신 내용은 복구가 불가능합니다.",
			[
				{ text: "취소하기" },
				{
					text: "삭제하기",
					onPress: okhandelDeleteContact,
				},
			]
		);
	};

	return (
		<SafeAreaView
			style={{
				alignItems: "center",
				height: "90%",
				marginVertical: 40,
				marginHorizontal: 20,
			}}
		>
			<ScrollView
				contentContainerStyle={{ alignItems: "center" }}
				showsVerticalScrollIndicator={false}
			>
				<View
					style={{
						width: "100%",
						alignItems: "center",
						marginBottom: 60,
						top: 10,
					}}
				>
					<Text style={GlobalStyle.font_caption1}>Inquiry history</Text>
				</View>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: 10,
					}}
				>
					<Text
						style={[
							{ flex: 1, textAlign: "left", marginHorizontal: 10 },
							GlobalStyle.font_body,
						]}
					>
						문의 제목
					</Text>
					<Text
						style={[
							{
								flex: 1,
								textAlign: "right",
								marginHorizontal: 10,
								color: "#5F5F5F",
							},
							GlobalStyle.font_caption2,
						]}
					>
						{date}
					</Text>
				</View>
				<View
					style={{
						backgroundColor: "white",
						width: 320,
						padding: 10,
						justifyContent: "flex-start",
						alignItems: "flex-start",

						borderRadius: 10,
						marginBottom: 35,
					}}
				>
					<Text style={[{ textAlignVertical: "top" }, GlobalStyle.font_body]}>
						{title}
					</Text>
				</View>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: 10,
					}}
				>
					<Text
						style={[{ flex: 1, marginHorizontal: 10 }, GlobalStyle.font_body]}
					>
						문의 내용
					</Text>
				</View>
				<View
					style={{
						backgroundColor: "white",
						width: 320,
						minHeight: 340,
						padding: 10,
						justifyContent: "flex-start",
						alignItems: "flex-start",
						borderRadius: 10,
						marginBottom: 35,
					}}
				>
					<Text style={({ textAlignVertical: "top" }, GlobalStyle.font_body)}>
						{content}
					</Text>
				</View>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						marginBottom: 10,
					}}
				>
					<Text
						style={[{ flex: 1, marginHorizontal: 10 }, GlobalStyle.font_body]}
					>
						회신 받으실 이메일
					</Text>
				</View>
				<View
					style={{
						backgroundColor: "white",
						width: 320,
						padding: 10,
						justifyContent: "flex-start",
						alignItems: "flex-start",
						borderRadius: 10,
					}}
				>
					<Text style={[{ textAlignVertical: "top" }, GlobalStyle.font_body]}>
						{email}
					</Text>
				</View>
				<Pressable
					onPress={checkDeleteContact}
					style={{
						width: "100%",
						height: 55,
						backgroundColor: "#E76B5C",
						borderRadius: 15,
						marginVertical: 40,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<AntDesign name="delete" size={30} color="white" />
				</Pressable>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});

export default SettingContactDetail;
