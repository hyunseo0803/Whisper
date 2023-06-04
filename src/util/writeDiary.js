import {GOOGLE_VISION_KEY} from '@env'
import { Alert } from 'react-native';
import * as ImagePicker from "expo-image-picker";

/**
 * 감정 중에 가장 가능성 있는걸 출력해주는 함수
 * @param {array} response 
 * @return {string} mood
 */
const moodAnalysis = (response) => {
  const rate = {
    VERY_UNLIKELY : -1, // 매우 해당되지 않음
    UNLIKELY : 0,       // 해당되지 않음
    POSSIBLE : 1,       // 가능성이 있음
    LIKELY : 2,         // 해당됨
    VERY_LIKELY : 3     // 매우 해당됨
  }
  
  response.forEach(face => {
    if(face.joyLikelihood===face.angerLikelihood===face.sorrowLikelihood===face.surpriseLikelihood){
      return 'expressionless'
    }
      alsMood = [
          {mood:'happy', percent: rate[face.joyLikelihood]},
          {mood:'angry', percent: rate[face.angerLikelihood]},
          {mood:'sad', percent: rate[face.sorrowLikelihood]},
          {mood:'surprised', percent: rate[face.surpriseLikelihood]},
      ]
  });

    // percent 내림차순으로 정렬
    const moodResult = alsMood.sort(function(a,b){
        return b.percent - a.percent
    })

    return moodResult[0].mood;
}


/**
 * 감정 분석 결과 GET 함수
 * @param {string} base64 
 */
export const getGoogleVisionResult = async (base64) => {
  try {
    let response = await fetch(
      "https://vision.googleapis.com/v1/images:annotate?key="+GOOGLE_VISION_KEY,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          requests: [
            {
              features: [
                { type: "FACE_DETECTION", maxResults: 5 },
              ],
              image: {
                content: base64
              }
            }
          ]
        })
      }
    );
    let responseJson = await response.json();
    console.log()
    if(JSON.stringify(responseJson.responses[0]) === '{}'){
      return false
    }else{
      return moodAnalysis(responseJson.responses[0].faceAnnotations)
    }
  } catch (error) {
    console.log(error);
  }
};


/**
 * 카메라 접근권한 확인
 * @returns {boolean}true
 */
const askPermissionsAsync = async () => {
	if (Platform.OS !== "web") {
		const { status } = await ImagePicker.requestCameraPermissionsAsync();
		if (status !== "granted") {
			Alert.alert(
				"카메라 접근 권한",
				"설정으로 이동해서 카메라 접근권한을 허용해주세요!"
			);
			return false;
		}
		return true;
	}
};


/**
 * 사진 찍고 base64값 받는 함수
 */
export const pickImage = async () => {
	askPermissionsAsync();
	let result = await ImagePicker.launchCameraAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.Images, // 이미지만 받음
		allowsEditing: true, // 사진 수정 허용 여부
		aspect: [1, 1], // 사진의 비율
		quality: 0.5,
		base64: true,
	});

	if (!result.canceled) {
    return result.assets[0].base64
	}else{
    return ''
  }
};