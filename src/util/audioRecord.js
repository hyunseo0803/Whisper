import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * 녹음 데이터 가져오기
 * @param {string} audioId 
 * @returns 소리데이터
 */
export const getAudioData = async (audioId) => {
	try {
		const audio = await AsyncStorage.getItem(`audio_${audioId}`);
		if (audio) {
      return JSON.parse(audio)
			// setAudioData(JSON.parse(audio));
		}
	} catch (e) {
		console.log(e);
	}
};

/**
 * 음성 재생
 * @param {object} audioData 
 */
export const playAudio = async (audioData) => {
	if (audioData) {
		const sound = new Audio.Sound();
		await sound.loadAsync({ uri: audioData.file, shouldPlay: true });
		console.log("Playing Sound");
		await sound.playAsync();
	}
};