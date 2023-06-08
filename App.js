import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from 'react-native';
import WriteScreen from "./src/pages/Write";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Tabs from "./src/components/tabs";
import { NavigationContainer } from "@react-navigation/native";
import { DarkTheme, DefaultTheme, theme } from "./src/globalStyle/theme";
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
import { createTable, createContact } from "./src/util/database";
import { loadThemeMode } from "./src/util/storage";
import { EventRegister } from 'react-native-event-listeners'
import themeContext from './src/globalStyle/themeContext'

export default function App() {
  const [isDark, setIsDark] = useState(false)
  const Stack = createNativeStackNavigator();

  const [fontsLoaded] = useFonts({
    Diary: require("./assets/fonts/EF_Diary.ttf"),
  });
  
  useEffect(() => {
    const loadThemeFun = async() => {
      setIsDark(await loadThemeMode()==='dark')
    }
    loadThemeFun()
    createTable();
    createContact();
  }, []);

  useEffect(() => {
    const listener = EventRegister.addEventListener('ChangeTheme', (data) => {
      setIsDark(data)
      console.log(data)
    })
    if(isDark){
      StatusBar.setBarStyle('light-content');
    }else{
      StatusBar.setBarStyle('dark-content');
    }
    return () => {
      EventRegister.removeAllListeners(listener)
    }
  }, [isDark])

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      const mode = await loadThemeMode();
      setThemeMode(mode);
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <themeContext.Provider
    value={isDark === true ? theme.dark : theme.light}>
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
    </themeContext.Provider>
  );
}
