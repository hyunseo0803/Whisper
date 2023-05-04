import { StyleSheet, Dimensions } from "react-native";

const GlobalStyle = StyleSheet.create({
	// font
	font_caption2: {
		fontSize: 12,
		fontFamily: "Diary",
	},
	font_caption1: {
		fontSize: 14,
		fontFamily: "Diary",
	},
	font_body: {
		fontSize: 16,
		fontFamily: "Diary",
	},
	font_title2: {
		fontSize: 20,
		fontFamily: "Diary",
	},
	font_title1: {
		fontSize: 28,
		fontFamily: "Diary",
	},

	bgRED: {
		backgroundColor: '#E76B5C'
	},
	bgBLUE: {
		backgroundColor: '#4E4981'
	},
	bgWHITE: {
		backgroundColor: '#FFF'
	},

	fontRED: {
		color: '#E76B5C'
	},
	fontBLUE :{
		color: '#4E4981'
	},
	fontBLACK: {
		color: '#000'
	},
	fontWHITE: {
		color: '#fff'
	},

	/**
	 * safeArea 감싸는 wrap
	 */
	safeAreaWrap: {
		marginHorizontal: 20,
		display: 'flex',
		flex: 1
	}
});

export default GlobalStyle;