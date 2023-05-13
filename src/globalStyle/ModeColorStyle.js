import { StyleSheet } from "react-native";
import { COLOR_BLACK, COLOR_DARK_BLUE, COLOR_DARK_FOURTH, COLOR_DARK_PRIMARY, COLOR_DARK_QUATERNARY, COLOR_DARK_RED, COLOR_DARK_SECONDARY, COLOR_DARK_TERTIARY, COLOR_DARK_THIRD, COLOR_DARK_WHITE, COLOR_LIGHT_BLUE, COLOR_LIGHT_PRIMARY, COLOR_LIGHT_QUATERNARY, COLOR_LIGHT_RED, COLOR_LIGHT_SECONDARY, COLOR_LIGHT_TERTIARY, COLOR_LIGHT_THIRD, COLOR_WHITE } from "./color";

const ModeColorStyle = (isDark) => StyleSheet.create({
  bg_RED: {
		backgroundColor: isDark ? COLOR_DARK_RED : COLOR_LIGHT_RED
	},
	bg_BLUE: {
		backgroundColor: isDark ? COLOR_DARK_BLUE : COLOR_LIGHT_BLUE
	},
	bg_box:{
    backgroundColor: isDark ? COLOR_DARK_FOURTH : COLOR_WHITE
  },
	bg_primary: {
		backgroundColor: isDark ? COLOR_DARK_WHITE : COLOR_BLACK
	},
  bg_secondary :{
    backgroundColor: isDark ? COLOR_DARK_SECONDARY : COLOR_LIGHT_SECONDARY
  },
  bg_tertiary:{
    backgroundColor: isDark ? COLOR_DARK_TERTIARY : COLOR_LIGHT_TERTIARY
  },  
  bg_quaternary:{
    backgroundColor: isDark ? COLOR_DARK_FOURTH : COLOR_LIGHT_QUATERNARY
  },  

	font_RED: {
		color: isDark ? COLOR_DARK_RED: COLOR_LIGHT_RED
	},
	font_BLUE :{
		color: isDark ? COLOR_DARK_BLUE : COLOR_LIGHT_BLUE
	},
	font_DEFALUT: {
		color: isDark ? COLOR_DARK_WHITE : COLOR_BLACK
	},
})

export default ModeColorStyle;