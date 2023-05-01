// React Native Date Picker – To Pick the Date using Native Calendar
// https://aboutreact.com/react-native-datepicker/

// import React in our code
import React, { useState } from "react";

// import all the components we are going to use
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GlobalStyle from "../../globalStyle/GlobalStyle";

//import DatePicker from the package we installed
import DatePicker from "react-native-datepicker";

const ExpoDatePicker = (props) => {
	const [date, setDate] = useState(props.date);

	return (
		<View style={styles.container}>
			<View style={styles.datePickerContainer}>
				<DatePicker
					style={styles.datePickerStyle}
					date={date} //initial date from state
					mode="date" //The enum of date, datetime and time
					placeholder="select date"
					format="yyyy.MM.DD"
					minDate="2016-01-01"
					maxDate={new Date()}
					confirmBtnText="Confirm"
					cancelBtnText="Cancel"
					customStyles={{
						dateInput: {
							borderWidth: 0,
							textAlign: "center",
						},

						dateText: {
							fontFamily: GlobalStyle.font_title1.fontFamily,
							fontSize: GlobalStyle.font_title1.fontSize,
						},
					}}
					iconComponent={
						<Ionicons
							name="caret-down-outline"
							size={24}
							color="black"
							style={{ marginLeft: 10 }}
						/>
					}
					onDateChange={(date) => {
						setDate(date);
						props.onDateChange(date);
					}}
				/>
			</View>
		</View>
	);
};

export default ExpoDatePicker;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 50,
		alignItems: "center",
		justifyContent: "center",
		// backgroundColor: "blue",
		marginTop: 15,
	},
	datePickerContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
	},
	datePickerStyle: {
		width: "100%",
		// backgroundColor: "yellow",
	},
});
