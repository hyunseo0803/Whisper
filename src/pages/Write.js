import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WriteAnalysis from "./write/WriteAnalysis";
import AnalysisResultScreen from "./write/AnalysisResultScreen";
import WriteContentScreen from "./write/WriteContent";


const Write = () => {
	const Stack = createNativeStackNavigator();

  return (
      <Stack.Navigator>
        {/* TODO to 현서: 여기에 네비게이션 페이지 연결해주세요 */}
        <Stack.Screen name="WriteAnalysisCheckScreen" component={WriteAnalysis}
          options={{headerShown: true}}
        />
        <Stack.Screen name='AnalysisResultScreen' component={AnalysisResultScreen}
        />
        <Stack.Screen name='WriteContentScreen' component={WriteContentScreen}
        options={{headerShown: false}}/>
      </Stack.Navigator>
  );
}

export default Write;