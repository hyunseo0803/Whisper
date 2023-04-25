import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Button, Pressable, Image, Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const WriteAnalysis = ({navigation}) => {

  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [isLoding, setIsLoding] = useState(false);

  /**
   * 카메라 접근 권한 허용 get
   * @returns true/false
   */
  const getPermission = async() => {
    if (Platform.OS !== 'web'){
      const{
        status,
      } = await ImagePicker.requestCameraPermissionsAsync();
      if( state !== 'granted'){
        alert("감정분석을 위해서는 이미지 촬영 권한을 허용해야합니다.")
        return false;
      }
      return true;
    }
  }


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // 이미지 타입 지정 가능
      allowsEditing: true, // 사진 수정 허용 여부
      aspect: [4, 3], // 사진의 비율
      quality: 1,
      base64: true
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageBase64(result.assets[0].base64)
    }
  };


  const submitToGoogle = async () => {
    try {
      setIsLoding(true)
      let body = JSON.stringify({
        requests: [
          {
            features: [
              { type: "FACE_DETECTION", maxResults: 5 },
              // { type: "IMAGE_PROPERTIES", maxResults: 5 },
            ],
            image: {
              source: {
                imageUri: imageBase64
              }
            }
          }
        ]
      });

      let response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" +
          'AIzaSyDvtD7gg7HtR27QN2iuj6j180HP9TYCHpQ',
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: body
        }
      );
      let responseJson = await response.json();
      console.log(responseJson);
      setIsLoding(false)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      {
        imageBase64 &&
        <Button title='분석하기!!' onPress={submitToGoogle}/>
      }
    </View>
  );
}

const styles = StyleSheet.create({})

export default WriteAnalysis;
