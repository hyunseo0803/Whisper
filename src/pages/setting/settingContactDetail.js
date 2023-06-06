import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Text, Pressable } from "react-native";
import { readcontactDetail } from "../../util/database";

const settingContactDetail = ({ navigation, route }) => {
	const { cTitle } = route.params;
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [email, setEmail] = useState("");
	useEffect(() => {
		const fetchDetails = async () => {
			try {
				const details = await readcontactDetail(cTitle);
				setTitle(details.title);
				setContent(details.content);
				setEmail(details.email);
			} catch (error) {
				console.error("Error fetching details:", error);
			}
		};

		fetchDetails();
	}, [cTitle]);

	return (
		<View>
			<Text>Title: {title}</Text>
			<Text>Content: {content}</Text>
			<Text>Email: {email}</Text>
		</View>
	);
};

const styles = StyleSheet.create({});

export default settingContactDetail;
