import { StyleSheet, View } from "react-native";
import React from "react";
import LoginScreen from "./src/pages/login/Login";
import * as Font from "expo-font";
import SignUpScreen from "./src/pages/login/SignUp";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
	Font.loadAsync({ Diary: require("./assets/fonts/EF_Diary.ttf") });
	const Stack = createNativeStackNavigator();

	return (
	  <NavigationContainer >
	    <Stack.Navigator>
        {/* 로그인 화면 */}
	  	  <Stack.Screen name="Login" component={LoginScreen} 
        options={{headerShown: false}}/>
        {/* 회원가입 화면 */}
	  	  <Stack.Screen name="SignUp" component={SignUpScreen} 
        options={{headerStyle: {backgroundColor:'rgba(0,0,0,0)'}, headerTitle:""}}/>
        {/* 비밀번호 변경 화면 */}

	  	</Stack.Navigator>
	  </NavigationContainer>
		// <View style={styles.container}>
		// 	{/* <SignUp /> */}
		// 	<Login/>
		// </View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
