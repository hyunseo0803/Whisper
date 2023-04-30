import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import { getGoogleVisionResult, moodAnalysis } from '../../util/writeDiary';

const AnalysisResultScreen = ({navigation, route}) => {

  const [analysisMood, setAnalysisMood] = useState('');

  useEffect(() => {
    const getGoogleVisionResultFun = async() => {
      const result = await getGoogleVisionResult(route.params.imageBase64);
      setAnalysisMood(result)
    } 
    getGoogleVisionResultFun()
  }, [analysisMood]);
  
    return (
      // TODO to 현서: 감정분석 결과 및 일기 주제추천 진행해주세요.
    <View>
      {
        // 분석된 감정이 공백이 아니면 분석감정 출력
        analysisMood!=='' &&
        <Text>{analysisMood}</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({})

export default AnalysisResultScreen;