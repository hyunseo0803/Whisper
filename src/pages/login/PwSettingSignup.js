import { Text, TouchableOpacity, View,} from "react-native";
import React from "react";
import GlobalStyle from "../../globalStyle/GlobalStyle";

export default function PwSettingSignup({navigation}) {
	return (
		<View
			style={{
				width: "100%",
				height: 14,
				marginTop: 20,
				flexDirection: "row",
				alignItems: 'center'
			}}
		>
			<TouchableOpacity
				activeOpacity={0.8}
				style={{
					width: 100,
					height: 14,
					marginLeft: 70,
				}}
				onPress={() => navigation.navigate('FindPW')}
			>
				<Text
					style={[
						{
							color: "#86878C",
							textAlign: "center",
						},
						GlobalStyle.font_caption1,
					]}
				>
					비밀번호 재설정
				</Text>
			</TouchableOpacity>
			<Text style={{color: '#86878C'}}>|</Text>
			<TouchableOpacity
				activeOpacity={0.8}
				style={{
					width: 100,
					height: 14,
					marginEnd: 70,
				}}
				onPress={() => navigation.navigate('SignUp')}
			>
				<Text
					style={[
						{
							color: "#86878C",
							textAlign: "center",
						},
						GlobalStyle.font_caption1,
					]}
				>
					회원가입
				</Text>
			</TouchableOpacity>
		</View>
	);
}
