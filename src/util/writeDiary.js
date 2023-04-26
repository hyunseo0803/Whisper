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
      "https://vision.googleapis.com/v1/images:annotate?key="+'AIzaSyDvtD7gg7HtR27QN2iuj6j180HP9TYCHpQ',
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
      Alert.alert('인식되지 못했습니다!', '카메라로 지금 자신의 모습을 찍어주세요!')
    }else{
      // console.log(moodAnalysis(responseJson.responses[0].faceAnnotations))
      return moodAnalysis(responseJson.responses[0].faceAnnotations)
    }
  } catch (error) {
    console.log(error);
  }
};