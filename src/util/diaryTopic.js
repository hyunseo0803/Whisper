import { Openai_Api_KEY } from "@env";

/**
 * 일기 주제 질문 함수
 * @param {string} mood 
 * @return {string}질문
 */
export const diaryTopicQuestion = (mood) => {
  switch (mood) {
    case 'happy':
			return "기쁜 감정일때 쓰기좋은 재미있는 일기 주제 6가지 추천해줘.";
    case 'sad':
			return "슬픈 감정일때 쓰기좋은 재미있는 일기 주제 6가지 추천해줘.";
    case 'fear':
			return "두려움이나 불안감을 느낄때 쓰기 좋은 재미있는 일기 주제 6가지 추천해줘.";
    case 'angry':
			return "화났을때 쓰기 좋은 재미있는 일기 주제 6가지 추천해줘.";
    case 'surprised' :
			return "놀랐을때 쓰기 좋은 재미있는 일기 주제 6가지 추천해줘.";
    case 'disgust' :
      return "혐오감을 느낄때 쓰기 좋은 재미있는 일기 주제 6가지 추천해줘.";
    case 'expressionless' :
      return "재미있는 일기 주제 6가지 추천해줘.";
    default:
      // console.error('지정된 것 이외에 감정입니다.')
      return ''
  }
}

export const questionToAI = async(prompt, setSubject) => {
	const { Configuration, OpenAIApi } = require("openai");
  const config = new Configuration({
		apiKey: Openai_Api_KEY,
	});
	const openai = new OpenAIApi(config);

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 2048,
      temperature: 1,
    });

    try {
      const answer = response.data.choices[0].text;
      const subject = answer
        .split("\n")
        .map((item) => item.replace(/^\s*\d+\.\s*/, "# "))
        .filter((item) => item);

      setSubject(subject);
      // console.log(answer);
    } catch (error) {
      console.error(error);
    }
    return true;
  } catch (error) {
    console.error(error);
  }
}