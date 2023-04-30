import React from 'react';
import {View, StyleSheet, Button, Alert, Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const WriteAnalysis = ({navigation: {navigate}}) => {

  /**
   * 카메라 접근권한 확인
   * @returns {boolean}true
   */
  const askPermissionsAsync = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("카메라 접근 권한", "설정으로 이동해서 카메라 접근권한을 허용해주세요!")
        return false;
      }
      return true;
    }
  };
  /**
   * 사진 찍고 base64값 받는 함수
   */
  const pickImage = async () => {
    askPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // 이미지만 받음
      allowsEditing: true, // 사진 수정 허용 여부
      aspect: [1, 1], // 사진의 비율
      quality: 0.5,
      base64: true,
    });
    
        if (!result.canceled) {
          // 사진 다 찍고 next누르면 base64 파라미터와 함께 페이지 이동
          navigate('AnalysisResultScreen', {imageBase64: result.assets[0].base64})
        }
      // }
    // }
  };

  return (
    // TODO to 현서: 이 부분 바로 일기쓰기로 넘어갈건지 사진찍을건지 확인하는 그 페이지로 수정해주세요. 
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={() => {pickImage()}} />
    </View>
  );
}

const styles = StyleSheet.create({})

export default WriteAnalysis;
