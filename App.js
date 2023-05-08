import { Alert } from "react-native";
import React, {useState, useEffect, useCallback} from "react";
import LoginScreen from "./src/pages/login/Login";
import FindPWScreen from "./src/pages/login/FindPW";
import SignUpScreen from "./src/pages/login/SignUp";
import WriteScreen from "./src/pages/Write";
import HomeScreen from "./src/pages/Home";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Tabs from './src/components/tabs'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchResult from "./src/pages/search/SearchResult";
import Search from "./src/pages/Search";
import Setting from "./src/pages/Setting";
import SettingAlert from "./src/pages/setting/settingAlert";
import SettingContact from "./src/pages/setting/settingContact";
import SettingContactLog from "./src/pages/setting/settingContactLog";
import SettingPremium from "./src/pages/setting/settingPremium";
import SettingWithdrawal from "./src/pages/setting/settingWithdrawal";

export default function App() {

  const [fontsLoaded] = useFonts({
    'Diary': require('./assets/fonts/EF_Diary.ttf'),
  });

	const Stack = createNativeStackNavigator();
  const [islogin, setIsLogin] = useState(false);

  /**
   * 로그인 되었는지 체크하는 함수
   */
  const checkLogin = () => {
    onAuthStateChanged(auth, (user) => {
      if (user){
        setIsLogin(true);
      }
      else{
        setIsLogin(false);
      }
    })
  }

  useEffect(() => {
    const getSessionFun = async() => {
      await AsyncStorage.getItem('user', (err, result) => {
        console.log(result);
      })
    }
  }, [])

  useEffect(() => {
    checkLogin();
  }, [islogin]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  if(islogin){
    return(
      <NavigationContainer onLayout={onLayoutRootView}>
        <Stack.Navigator>
          <Stack.Screen name="HomeTab" component={Tabs}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Write" component={WriteScreen}
          options={{headerShown: false}}/>
          
          {/* search */}
          <Stack.Screen name="search" component={Search}
          options={{headerShown: false}}/>
          <Stack.Screen name="searchResult" component={SearchResult}
          options={{headerShown: false}}/>

          {/* setting */}
          <Stack.Screen name="setting" component={Setting}
            options={{headerShown: false}}/>
          <Stack.Screen name="settingAlert" component={SettingAlert}
            options={{headerShown: false}}/>
          <Stack.Screen name="settingContact" component={SettingContact}
            options={{headerShown: false}}/>
          <Stack.Screen name="settingcontackLog" component={SettingContactLog}
            options={{headerShown: false}}/>
          <Stack.Screen name="settingPremium" component={SettingPremium}
            options={{headerShown: false}}/>
          <Stack.Screen name="settingWithdrawal" component={SettingWithdrawal}
            options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  return(
    <NavigationContainer onLayout={onLayoutRootView}>
      <Stack.Navigator>
        {/* 로그인 화면 */}
        <Stack.Screen name="Login" component={LoginScreen} 
        options={{headerShown: false}}/>
        {/* 회원가입 화면 */}
        <Stack.Screen name="SignUp" component={SignUpScreen} 
        options={{headerStyle: {backgroundColor:'rgba(0,0,0,0)'}, headerTitle:""}}/>
        {/* 비밀번호 변경 화면 */}
        <Stack.Screen name="FindPW" component={FindPWScreen}
        options={{headerStyle: {backgroundColor:'rgba(0,0,0,0)'}, headerTitle:""}}/>
      </Stack.Navigator>
    </NavigationContainer>

  )
}