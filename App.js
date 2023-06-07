import { Alert, useColorScheme } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import LoginScreen from "./src/pages/login/Login";
import FindPWScreen from "./src/pages/login/FindPW";
import SignUpScreen from "./src/pages/login/SignUp";
import WriteScreen from "./src/pages/Write";
import HomeScreen from "./src/pages/Home";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Tabs from "./src/components/tabs";
import { NavigationContainer } from "@react-navigation/native";
import { DarkTheme, DefaultTheme } from "./src/globalStyle/theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import WriteAnalysis from "./src/pages/write/WriteAnalysis";
import AnalysisResultScreen from "./src/pages/write/AnalysisResultScreen";
import WriteContent from "./src/pages/write/WriteContent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchResult from "./src/pages/search/SearchResult";
import Search from "./src/pages/Search";
import Setting from "./src/pages/Setting";
import SettingAlert from "./src/pages/setting/settingAlert";
import SettingContact from "./src/pages/setting/settingContact";
import SettingContactLog from "./src/pages/setting/settingContactLog";
import SettingContactDetail from "./src/pages/setting/settingContactDetail";
import SettingPremium from "./src/pages/setting/settingPremium";
import SettingWithdrawal from "./src/pages/setting/settingWithdrawal";
import { COLOR_DARK_BG, COLOR_LIGHT_BG } from "./src/globalStyle/color";
import SettingScreenMode from "./src/pages/setting/settingScreenMode";
import { createTable, createContact, deleteContact } from "./src/util/database";

export default function App() {
	const isDark = useColorScheme() === "dark";

	const [fontsLoaded] = useFonts({
		Diary: require("./assets/fonts/EF_Diary.ttf"),
	});

	const Stack = createNativeStackNavigator();
	const [islogin, setIsLogin] = useState(false);

	const checkLogin = () => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setIsLogin(true);
				// Alert.alert('로그인 성공!')
				console.log(islogin);
			} else {
				setIsLogin(false);
				// Alert.alert('로그아웃!!')
				console.log(islogin);
			}
		});
	};
	checkLogin();
	useEffect(() => {
		checkLogin;
	}, [islogin]);

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	if (islogin) {
		createTable();
		createContact();
		// deleteContact();
		return (
			<NavigationContainer
				onLayout={onLayoutRootView}
				theme={isDark ? DarkTheme : DefaultTheme}
			>
				<Stack.Navigator>
					<Stack.Screen
						name="HomeTab"
						component={Tabs}
						options={{ headerShown: false }}
					/>

					{/* Write */}
					<Stack.Screen
						name="Write"
						component={WriteScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="WriteAnalysis"
						component={WriteAnalysis}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="AnalysisResultScreen"
						component={AnalysisResultScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="WriteContent"
						component={WriteContent}
						options={{ headerShown: false }}
					/>

					{/* search */}
					<Stack.Screen
						name="search"
						component={Search}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="searchResult"
						component={SearchResult}
						options={{ headerShown: false }}
					/>

					{/* setting */}
					<Stack.Screen
						name="setting"
						component={Setting}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="settingAlert"
						component={SettingAlert}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="settingScreenMode"
						component={SettingScreenMode}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="settingContact"
						component={SettingContact}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="settingContactLog"
						component={SettingContactLog}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="settingContactDetail"
						component={SettingContactDetail}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="settingPremium"
						component={SettingPremium}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="settingWithdrawal"
						component={SettingWithdrawal}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
	return (
		<NavigationContainer
			onLayout={onLayoutRootView}
			theme={isDark ? DarkTheme : DefaultTheme}
		>
			<Stack.Navigator>
				{/* 로그인 화면 */}
				<Stack.Screen
					name="Login"
					component={LoginScreen}
					options={{ headerShown: false }}
				/>
				{/* 회원가입 화면 */}
				<Stack.Screen
					name="SignUp"
					component={SignUpScreen}
					options={{
						headerStyle: {
							backgroundColor: isDark ? COLOR_DARK_BG : COLOR_LIGHT_BG,
						},
						headerTitle: "",
					}}
				/>
				{/* 비밀번호 변경 화면 */}
				<Stack.Screen
					name="FindPW"
					component={FindPWScreen}
					options={{
						headerStyle: {
							backgroundColor: isDark ? COLOR_DARK_BG : COLOR_LIGHT_BG,
						},
						headerTitle: "",
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
