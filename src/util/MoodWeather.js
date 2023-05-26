/**
 * 영어 감정 배열
 */
export const moodArr = [
  "happy",           // 기쁨
  "disgust",         // 혐오
  "surprised",       // 놀람
  "angry",           // 화남
  "sad",             // 슬픔
  "fear",            // 두려움
  "expressionless",  // 무표정
]

export const weatherArr = [
  "sunny",
  "littleCloud",
  "cloudy",
  "rain",
  "snow",
  "lightning"
]

/**
 * 영어로된 감정을 한글로 바꿔주는 함수
 * @param {string} moodEng 
 * @returns {string}moodKr
 */
export const moodEngToKr = (moodEng) => {
  switch (moodEng) {
    case "happy":
      return "기쁨"
    case "disgust":
      return "혐오"
    case "surprised":
      return "놀람"
    case "angry":
      return "화남"
    case "sad":
      return "슬픔"
    case "fear":
      return "두려움"
    case "expressionless":
      return "무표정"
  }
}

    /**
   * 이미지의 로컬 경로를 리턴하는 함수
   * @param {string} moodWeather 
   * @returns require(url)
   */
    export const MoodWeatherFile = (moodWeather) => {
      switch (moodWeather) {
        case 'sunny': return require('../../assets/images/weather/sunny.png')
        case 'littleCloud': return require('../../assets/images/weather/littleCloud.png')
        case 'cloudy': return require('../../assets/images/weather/cloudy.png')
        case 'lightning': return require('../../assets/images/weather/lightning.png')
        case 'rain': return require('../../assets/images/weather/rain.png')
        case 'snow': return require('../../assets/images/weather/snow.png')
        case 'sunny': return require('../../assets/images/weather/sunny.png')
        case 'angry': return require('../../assets/images/mood/angry.png')
        case 'disgust': return require('../../assets/images/mood/disgust.png')
        case 'expressionless': return require('../../assets/images/mood/expressionless.png')
        case 'fear': return require('../../assets/images/mood/fear.png')
        case 'happy': return require('../../assets/images/mood/happy.png')
        case 'sad': return require('../../assets/images/mood/sad.png')
        case 'surprised': return require('../../assets/images/mood/surprised.png')
      }
    }