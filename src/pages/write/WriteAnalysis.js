import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Button, Pressable, Image, Platform, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getGoogleVisionResult, moodAnalysis } from '../../util/writeDiary';

const WriteAnalysis = ({navigation}) => {

  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [analysisResult, setAnalysisResult] = useState('');



  const pickImage = async () => {

    // if (Platform.OS !== 'web'){
    //   const{
    //     status,
    //   } = await ImagePicker.requestCameraPermissionsAsync();
    //   if( state !== 'granted'){
    //     alert("감정분석을 위해서는 이미지 촬영 권한을 허용해야합니다.")
    //     return false;
    //   }
    //   return true;
    // }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // 이미지 타입 지정 가능
      allowsEditing: true, // 사진 수정 허용 여부
      aspect: [4, 3], // 사진의 비율
      quality: 0.5,
      base64: true,
      type: 'image',
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageBase64(result.assets[0].base64)
    }
  };

  useEffect(() => {
    getGoogleVisionResultFun = () => {
      const result = getGoogleVisionResult(imageBase64);
      setAnalysisResult(result)
    }
  }, [imageBase64]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      {
        imageBase64 &&
        <Button title='분석하기!!' onPress={() => getGoogleVisionResultFun(imageBase64)}/>
      }
      {
        analysisResult !== '' &&
        <Text>당신은 {analysisResult} 하군요!</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({})

export default WriteAnalysis;
