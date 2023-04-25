import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WriteAnalysis from "./write/WriteAnalysis";
import WriteCamera from "./write/WriteCamera";


const Write = () => {


	const Stack = createNativeStackNavigator();


  return (
      <Stack.Navigator>
        {/* TODO to 현서: 여기에 네비게이션 페이지 연결해주세요 */}
        <Stack.Screen name="WriteAnalysisCheckScreen" component={WriteAnalysis}
          options={{headerShown: true}}
        />
        <Stack.Screen name='CameraScreen' component={WriteCamera}/>
      </Stack.Navigator>
  );
}

export default Write;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8fcbbc",
    alignItems: "center",
    justifyContent: "center",
  },
});
