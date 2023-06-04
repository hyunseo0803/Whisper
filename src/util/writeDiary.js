import {GOOGLE_VISION_KEY} from '@env'
import { Alert } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

/**
 * 감정분석 버튼 누른 횟수 카운트 함수
 * @param {useState} setButtonPressCount 
 * @returns 
 */
export const moodAnalysisButtonPressCount = async(setButtonPressCount) => {
  //현재 날짜 받기 , 최근 버튼 누른 날짜 및 횟수 가져오기
	const currentDate = new Date().toISOString().split("T")[0];
	const storedDate = await AsyncStorage.getItem("buttonPressDate");
	let buttonPressCount = await AsyncStorage.getItem("buttonPressCount");
  
	//만약 한번도 버튼을 누른적이 없어서 가져올 storedDate 가 없는 경우
	if (!storedDate) {
		//현재 날짜로 최근 버튼 누른 날짜 저장
		await AsyncStorage.setItem("buttonPressDate", currentDate);
	}
	//최근 누른 날짜와 현재 날짜가 다른경우,
	if (storedDate && storedDate !== currentDate) {
		// 최근 누른 날짜에 현재 날짜로 업데이트
		await AsyncStorage.setItem("buttonPressDate", currentDate);
		// 버튼 누른 횟수 1로 업데이트
		await AsyncStorage.setItem("buttonPressCount", "1");
		buttonPressCount = "1";
		setButtonPressCount(buttonPressCount);

		//버튼 누른 적이 없는 경우
	} else if (!buttonPressCount) {
		//버튼 누른 횟수 1로 업데이트
		await AsyncStorage.setItem("buttonPressCount", "1");
		buttonPressCount = "1";
		setButtonPressCount(buttonPressCount);
	} else {
		// 버튼 누름 횟수가 있는 경우
		let count = parseInt(buttonPressCount);
		if (count > 0) {
			// 버튼 누름 횟수가 2보다 작은 경우, 횟수 감소
			buttonPressCount = (count - 1).toString();
			setButtonPressCount(buttonPressCount);
			await AsyncStorage.setItem("buttonPressCount", buttonPressCount);
		} else {
			// 버튼 누름 횟수가 0인 경우, 누를 수 없음
			Alert.alert(
				"오늘의 분석 티켓을 모두 사용하셨습니다. 내일 다시 이용하실 수 있어요 !"
			);
			return;
		}
	}

	await AsyncStorage.setItem("buttonPressCount", buttonPressCount);
}