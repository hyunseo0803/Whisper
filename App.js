import { StyleSheet, View } from "react-native";
import React from "react";
import LoginScreen from "./src/pages/login/Login";
import FindPWScreen from "./src/pages/login/FindPW";
import SignUpScreen from "./src/pages/login/SignUp";
import * as Font from "expo-font";
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
        <Stack.Screen name="FindPW" component={FindPWScreen}/>

	  	</Stack.Navigator>
	  </NavigationContainer>
	);
}