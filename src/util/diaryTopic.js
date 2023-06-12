import { Openai_Api_KEY } from "@env";

/**
 * 일기 주제 질문 함수
 * @param {string} mood
 * @return {string}질문
 */
export const diaryTopicQuestion = (mood) => {
	switch (mood) {
		case "happy":
			return "안녕. 너는 사람의 감정에 맞춰 일기 주제를 추천해주는 AI야. 어떤 사람이 기쁜 감정을 느끼고 있어. 지금 너는 그 사람에게 중복 되지 않는 6가지의 일기 주제를 추천해줘야해. 각 일기 주제는 각 일기 주제는 15글자 이내여야해.";
		case "sad":
			return "안녕. 너는 사람의 감정에 맞춰 일기 주제를 추천해주는 AI야. 어떤 사람이 슬픈 감정을 느끼고 있어. 지금 너는 그 사람에게 중복 되지 않는 6가지의 일기 주제를 추천해줘야해. 각 일기 주제는 각 일기 주제는 15글자 이내여야해. ";
		case "fear":
			return "안녕. 너는 사람의 감정에 맞춰 일기 주제를 추천해주는 AI야. 어떤 사람이 두려움을 느끼고 있어. 지금 너는 그 사람에게 중복 되지 않는 6가지의 일기 주제를 추천해줘야해. 각 일기 주제는 각 일기 주제는 15글자 이내여야해.";
		case "angry":
			return "안녕. 너는 사람의 감정에 맞춰 일기 주제를 추천해주는 AI야. 어떤 사람이 화난 감정을 느끼고 있어. 지금 너는 그 사람에게 중복 되지 않는 6가지의 일기 주제를 추천해줘야해. 각 일기 주제는 각 일기 주제는 15글자 이내여야해.";
		case "surprised":
			return "안녕. 너는 사람의 감정에 맞춰 일기 주제를 추천해주는 AI야. 어떤 사람이 놀라움을 느끼고 있어. 지금 너는 그 사람에게 중복 되지 않는 6가지의 일기 주제를 추천해줘야해. 각 일기 주제는 각 일기 주제는 15글자 이내여야해.";
		case "disgust":
			return "안녕. 너는 사람의 감정에 맞춰 일기 주제를 추천해주는 AI야. 어떤 사람이 혐오감을 느끼고 있어. 지금 너는 그 사람에게 중복 되지 않는 6가지의 일기 주제를 추천해줘야해. 각 일기 주제는 각 일기 주제는 15글자 이내여야해.";
		case "expressionless":
			return "안녕. 너는 사람의 감정에 맞춰 일기 주제를 추천해주는 AI야. 어떤 사람이 무력감을 느끼고 있어. 지금 너는 그 사람에게 중복 되지 않는 6가지의 일기 주제를 추천해줘야해. 각 일기 주제는 각 일기 주제는 15글자 이내여야해.";
		default:
			// console.error('지정된 것 이외에 감정입니다.')
			return "";
	}
};

export const questionToAI = async (prompt, setSubject) => {
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
			temperature: 0.75,
			top_p: 0.5,
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
};
