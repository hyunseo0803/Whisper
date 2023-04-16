import { Alert, StyleSheet, View } from "react-native";
import React, {useState, useEffect} from "react";
import LoginScreen from "./src/pages/login/Login";
import FindPWScreen from "./src/pages/login/FindPW";
import SignUpScreen from "./src/pages/login/SignUp";
import * as Font from "expo-font";
import Tabs from './src/components/tabs'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';

export default function App() {
	Font.loadAsync({ Diary: require("./assets/fonts/EF_Diary.ttf") });
	const Stack = createNativeStackNavigator();
  const [islogin, setIsLogin] = useState(false);


  const checkLogin = () => {
    onAuthStateChanged(auth, (user) => {
      if (user){
        setIsLogin(true);
        Alert.alert('로그인 성공!')
        console.log(islogin)
      }
      else{
        setIsLogin(false);
        Alert.alert('로그아웃!!')
        console.log(islogin)
      }
    })
  }
  checkLogin();
  useEffect(() => {
    checkLogin
  }, [islogin]);

  if(islogin){
    return(
      <NavigationContainer>
      <Tabs />
      </NavigationContainer>
    )
  }
  return(
    <NavigationContainer >
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