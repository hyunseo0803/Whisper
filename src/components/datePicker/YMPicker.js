import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, Button, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GlobalStyle from "../../globalStyle/GlobalStyle";
import ModeColorStyle from "../../globalStyle/ModeColorStyle";
import { COLOR_BLACK, COLOR_DARK_BG, COLOR_DARK_BLUE, COLOR_DARK_FIVTH, COLOR_DARK_FOURTH, COLOR_DARK_PRIMARY, COLOR_DARK_QUATERNARY, COLOR_DARK_RED, COLOR_DARK_SECONDARY, COLOR_DARK_TERTIARY, COLOR_DARK_WHITE, COLOR_LIGHT_BG, COLOR_LIGHT_BLUE, COLOR_LIGHT_PRIMARY, COLOR_LIGHT_RED, COLOR_LIGHT_SECONDARY } from "../../globalStyle/color";

/**
 * 연, 월 picker
 * @param year
 * @param month 
 * @param animationType "slide", "fade", "none"
 * @param visible (boolean)
 * @param setVisible (useState set값)
 * @param isDark
 * @returns year,month
 */
export default function YMPicker(props) {
	const isDark = props.isDark
	const [selectYear, setSelectYear] = useState(props.year);
	const [selectMonth, setSelectMonth] = useState(props.month);

	/**
	 * 다음 년도 선택 함수
	 * @param {number} year
	 */
	const btnNextYear = (year) => {
		setSelectYear((prevYear) => prevYear + 1);
	};
	/**
	 * 이전년도 함수
	 * @param {number} year
	 */
	const btnPrevYear = (year) => {
		setSelectYear((prevYear) => prevYear - 1);
	};

	/**
	 * 달(월) 선택 함수
	 */
	const onClickSelectMonth = (month) => {
		setSelectMonth(month);
	};

	/**
	 *  모달 선택 취소 버튼
	 *  @result showModal -> false
	 */
	const onClickBtnCancle = () => {
		setSelectYear(props.year);
		setSelectMonth(props.month);
		props.setShowModal(false);
	};

	/**
	 * 모달 선택(저장) 버튼
	 */
	const onClickBtnSave = () => {
		props.setMonth(selectMonth);
		props.setYear(selectYear);
		props.setShowModal(false);
	};

	/**
	 * 모달창을 닫을 때 선택한 연도, 월을 보내주는 함수
	 * @param {number} year
	 * @param {number} month
	 */
	// const sendYM = (year, month) => {

	// }

	/**
	 * 세글자 월 이름 배열
	 */
	const Month = [
		"Jan",
		"Fab",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	return (
		<Modal
			animationType={props.animationType}
			visible={props.visible}
			transparent={true}
			style={modalS.modalBackground}
		>
      <Pressable
      style={{flex:1}}
      onPress={() => onClickBtnSave()}>
			<View style={modalS.modalBackground}>
				<View style={[modalS.modalBody, isDark?{backgroundColor: COLOR_DARK_FOURTH,}:{backgroundColor:'#fff'}]}>
					{/* HEADER */}
					<View style={pickerS.header}>
						<Pressable>
							<Ionicons
								name="chevron-back-outline"
								size={35}
								style={[pickerS.btnArrow, ModeColorStyle(isDark).font_DEFALUT]}
								onPress={btnPrevYear}
							/>
						</Pressable>

						<Text style={[GlobalStyle.font_title2, ModeColorStyle(isDark).font_DEFALUT]}>
							{selectYear}
						</Text>

						<Pressable>
							<Ionicons
								name="chevron-forward-outline"
								size={35}
								color="black"
								style={[pickerS.btnArrow, ModeColorStyle(isDark).font_DEFALUT]}
								onPress={btnNextYear}
							/>
						</Pressable>
					</View>

					{/* BODY */}
					<View style={pickerS.body}>
						{Month.map((monthName, index) => (
							<Pressable
								style={[
									pickerS.btnMonth,
									TextS(index + 1, selectMonth, isDark).btnMonthBox,
								]}
								key={index}
								onPress={() => onClickSelectMonth(index + 1)}
							>
								<Text
									style={[
										GlobalStyle.font_body,
										pickerS.monthText,
										TextS(index + 1, selectMonth, isDark).btnMonthText,
									]}
								>
									{monthName}
								</Text>
							</Pressable>
						))}
					</View>

				</View>
			</View>
      </Pressable>
		</Modal>
	);
}

export const modalS = StyleSheet.create({
	modalBackground: {
		flex: 1,
		justifyContent: "center",
    alignItems: 'center',
		backgroundColor: "rgba(0,0,0,0.4)",
	},
	modalBody: {
		justifyContent: "space-between",
		display: "flex",
		gap: 5,
		padding: 20,
		borderRadius: 16,
    maxWidth: 310,
	},
});

const pickerS = StyleSheet.create({
	// 헤더
	header: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	btnArrow: {
		justifyContent: "center",
		alignItems: "center",
	},

	// 바디
	body: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		// gap: 10,
		justifyContent: "space-between",
	},
	btnMonth: {
		width: "33%",
		padding: 20,
		marginVertical: 3,
		borderRadius: 10,

		alignItems: "center",
		justifyContent: "center",
	},
	monthText: {
		color: "#fff",
	},

	// 푸터
	footer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		flex: 1,
	},
	btnInFooter: {
		width: "47%",
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 2,
	},
});

const TextS = (el, month, isDark) => StyleSheet.create({
	btnMonthBox: {
		backgroundColor: 
			el === month ? 
        isDark ? COLOR_DARK_RED : COLOR_LIGHT_RED
        : 
        isDark ? COLOR_DARK_FOURTH : '#fff',
	},
	btnMonthText: {
		color: el === month ? 
      "#fff"
      : 
      isDark ? COLOR_DARK_WHITE : COLOR_BLACK
      ,
	},
});