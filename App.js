import { useColorScheme } from "react-native";
import React, { useCallback } from "react";
import WriteScreen from "./src/pages/Write";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Tabs from "./src/components/tabs";
import { NavigationContainer } from "@react-navigation/native";
import { DarkTheme, DefaultTheme } from "./src/globalStyle/theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WriteAnalysis from "./src/pages/write/WriteAnalysis";
import AnalysisResultScreen from "./src/pages/write/AnalysisResultScreen";
import WriteContent from "./src/pages/write/WriteContent";
import SearchResult from "./src/pages/search/SearchResult";
import Search from "./src/pages/Search";
import Setting from "./src/pages/Setting";
import SettingAlert from "./src/pages/setting/settingAlert";
import SettingContact from "./src/pages/setting/settingContact";
import SettingContactLog from "./src/pages/setting/settingContactLog";
import SettingContactDetail from "./src/pages/setting/settingContactDetail";
import SettingPremium from "./src/pages/setting/settingPremium";
import SettingWithdrawal from "./src/pages/setting/settingWithdrawal";
import SettingScreenMode from "./src/pages/setting/settingScreenMode";
import { createTable, createContact } from "./src/util/database";

export default function App() {
	const isDark = useColorScheme() === "dark";
  const Stack = createNativeStackNavigator();

	const [fontsLoaded] = useFonts({
		Diary: require("./assets/fonts/EF_Diary.ttf"),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	createTable();
	createContact();
  
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
