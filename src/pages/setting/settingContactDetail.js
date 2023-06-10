import React, { useContext, useEffect, useState } from "react";
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
import { Octicons, Feather } from "@expo/vector-icons";
import themeContext from "../../globalStyle/themeContext";
import ModeColorStyle from "../../globalStyle/ModeColorStyle";
import { COLOR_BLACK, COLOR_DARK_FOURTH, COLOR_DARK_PRIMARY, COLOR_DARK_RED, COLOR_DARK_SECONDARY, COLOR_DARK_WHITE, COLOR_LIGHT_PRIMARY, COLOR_LIGHT_RED, COLOR_LIGHT_SECONDARY, COLOR_WHITE } from "../../globalStyle/color";
import HeaderBack from "../../components/HeaderBack";

const SettingContactDetail = ({ navigation, route }) => {
	const isDark = useContext(themeContext).theme === 'dark'

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
		<SafeAreaView style={GlobalStyle.safeAreaWrap}>
      {/* header */}
      <HeaderBack text='Inquiry history Detail' backFun={() => navigation.pop()}/>
      
      <View style={styles(isDark).bodyWrap}>
        {/* title */}
        <View style={styles(isDark).contact_titleContent_wrap}>
          <View style={styles(isDark).title_date_wrap}>
            <Text style={[styles(isDark).title, GlobalStyle.font_body]}>
              문의 제목
            </Text>
            <Text style={[styles(isDark).dateLabel, GlobalStyle.font_caption2]}>
              {date}
            </Text>
          </View>
          <View style={[styles(isDark).contentBox, boxStyle(isDark).textBox]}>
            <Text style={[{ textAlignVertical: "top" }, GlobalStyle.font_body, ModeColorStyle(isDark).font_DEFALUT]}>
              {title}
            </Text>
          </View>
        </View>
        {/* content */}
				<View style={styles(isDark).contact_titleContent_wrap}>
					<Text style={[styles(isDark).title, GlobalStyle.font_body]}>
						문의 내용
					</Text>
          <ScrollView style={[styles(isDark).contentBox, boxStyle(isDark).textBox, {height:'50%'}]}>
            <Text style={[{ textAlignVertical: "top" }, GlobalStyle.font_body, ModeColorStyle(isDark).font_DEFALUT]}>
              {content}
            </Text>
          </ScrollView>
				</View>
        {/* email */}
				<View style={styles.contact_titleContent_wrap}>
					<Text style={[GlobalStyle.font_body, styles(isDark).title]}>
						회신 받으실 이메일
					</Text>
          <View style={[styles(isDark).contentBox, boxStyle(isDark).textBox]}>
            <Text style={[{ textAlignVertical: "top" }, GlobalStyle.font_body, ModeColorStyle(isDark).font_DEFALUT]}>
              {email}
            </Text>
				  </View>
				</View>
      </View>

      {/* button */}
			<Pressable onPress={checkDeleteContact} style={[styles(isDark).deleteButton]}>
				<Octicons name="trash" size={30} color="white" />
			</Pressable>
		</SafeAreaView>
	);
};

const styles = (isDark) => StyleSheet.create({
  bodyWrap:{
    width: '100%',
    display: 'flex',
    flex: 0.97,
    marginTop: 20
  },

  title_date_wrap:{
    display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
    paddingRight: 10
  },
  contact_titleContent_wrap:{
    marginBottom: 30
  },
  title:{
    color: isDark? COLOR_DARK_PRIMARY : COLOR_LIGHT_PRIMARY,
    paddingLeft: 10
  },
  contentBox:{
    marginTop: 10,
    width: '100%',
		padding: 10,
		borderRadius: 10,
  },
	dateLabel: {
		flex: 1,
		textAlign: "right",
		color: isDark ? COLOR_DARK_PRIMARY : COLOR_LIGHT_PRIMARY,
	},
	deleteButton: {
		width: "100%",
		height: 60,
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
    backgroundColor: isDark? COLOR_DARK_RED : COLOR_LIGHT_RED
	},
});

const boxStyle = (isDark) => StyleSheet.create({
  textBox: {
    backgroundColor: isDark? COLOR_DARK_FOURTH : COLOR_WHITE
  },
})

export default SettingContactDetail;
