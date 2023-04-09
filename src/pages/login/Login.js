import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	View,
	Alert,
} from "react-native";
import React from "react";
import NameLogo from "../../../assets/images/NameLogo.png";
import AutoLogin from "../../../assets/images/AutoLogin.png";

export default function App() {
	state = {
		emailinput: "",
		passwordinput: "",
	};

	return (
		<View
			style={{
				display: "flex",
				backgroundColor: "yellow",
				alignItems: "center",
				width: "90%",
				height: 750,
			}}
		>
			<View
				style={{
					display: "flex",
					//backgroundColor: "white",
					alignItems: "center",
					justifyContent: "center",
					//position: "absolute",
					top: "15%",
				}}
			>
				<Image source={NameLogo} style={styles.logo} />
				<Text style={styles.login}>로그인</Text>
			</View>
			<View
				style={{
					display: "flex",
					backgroundColor: "white",
					alignItems: "center",
					justifyContent: "center",
					position: "absolute",
					top: "40%",
				}}
			>
				<TextInput
					style={styles.inputbox}
					value={this.state.emailinput}
					placeholder="이메일"
					label="email"
					onChange={(emailinput) => this.setState({ emailinput: emailinput })}
				/>
				<TextInput
					style={styles.inputbox}
					value={this.state.passwordinput}
					placeholder="비밀번호"
					label="Password"
					onChange={(passwordinput) =>
						this.setState({ passwordinput: passwordinput })
					}
				/>
			</View>
			<View
				style={{
					//display: "flex",
					height: 40,
					justifyContent: "center",
					position: "absolute",
					top: 430,
					backgroundColor: "blue",
					flex: 1,
					flexDirection: "row",
				}}
			>
				<Image source={AutoLogin} style={styles.autoLoginImg} />
				<Text style={styles.autoLogin}>자동 로그인</Text>
			</View>
			<View>
				<TouchableOpacity
					activeOpacity={0.8}
					style={styles.loginbutton}
					onPress={() => Alert.alert("test", "테스트.")}
				>
					<Text
						style={{
							color: "white",
							textAlign: "center",
							top: 15,
							fontSize: 20,
						}}
					>
						로그인
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	logo: {
		width: 200,
		height: 50,
		margin: "auto",
		textAlign: "center",
		//display: "block",
		top: "10%",
		//bottom: "20%",
	},

	login: {
		fontSize: 20,
		justifyContentcontent: "center",
		color: "#4E4981",
		fontWeight: 800,
		LineHeight: 23,
		// backgroundColor: "black",
		fontfamily: "Abhaya Libre ExtraBold",
		textAlign: "center",
		top: 30,
	},
	inputbox: {
		//backgroundColor: "black",
		width: 250,
		height: 40,
		// justifyContent: "center",
		borderColor: "#4E4981",
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
		marginBottom: 20,
	},
	autoLogin: {
		width: 210,
		height: 40,
		top: 10,
		fontSize: 15,
	},
	autoLoginImg: {
		width: 40,
		height: 40,
	},
	loginbutton: {
		width: 300,
		height: 50,
		borderRadius: 10,
		backgroundColor: "#E76B5C",
		top: 410,
	},
});
