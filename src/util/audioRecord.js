import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

/**
 * 고유아이디 생성
 * @returns {string} uniqueID
 */
const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
};

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
 * @returns {object} 녹음된 소리 객체
 */
export const playAudio = async (audioData) => {
	if (audioData) {
		const SOUND = new Audio.Sound();
		await SOUND.loadAsync({ uri: audioData.file, shouldPlay: true });
		// console.log("Playing Sound");
		await SOUND.playAsync();
    return(SOUND)
	}else{
    return false
  }
};

/**
 * 음성 재생 중지
 * @param {*} sound 
 * @param {*} setIsPlaying 
 * @param {*} isPlaying 
 */
export const stopPlayAudio = async (sound, setIsPlaying, isPlaying) => {
	if (sound) {
		if (isPlaying) {
			await sound.stopAsync(); // 오디오 멈추기
			console.log("Sound stopped");
			setIsPlaying(false);
		}
	}
};

/**
 * 녹음 시작
 * @returns {object} 음성
 */
export const startRecording = async() => {
  try {
    console.log("Requesting permissions..");
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    // console.log("Starting recording..");
    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );
    // setRecording(recording);
    return recording
    // console.log("Recording started");
  } catch (error) {
    return false
  }
}

/**
 * 녹음 중지 & 저장
 * @param {*} recording 
 * @returns {setAudioData해야함} audio 
 */
export const stopRecording = async(recording) => {
  await recording.stopAndUnloadAsync();

	const { sound, status } = await recording.createNewLoadedSoundAsync();
	const audioId = generateUniqueId();
	const audio = {
		id: audioId,
		sound: sound,
		file: recording.getURI(),
		status: status,
	};

	//스토리지 저장
	await AsyncStorage.setItem(`audio_${audio.id}`, JSON.stringify(audio));
  return audio
}

/**
 * 음성 데이터 삭제 함수
 * @param {*} audioData 
 * @param {*} setAudioData 
 */
export const deleteAudio = async(audioData) => {
  try {
    if (audioData && audioData.id) {
      console.log(audioData.id);
      await AsyncStorage.removeItem(`audio_${audioData.id}`);
      console.log("Audio deleted");
      return ''
    } else {
      throw new Error("Invalid audio data or audio ID is missing");
    }
  } catch (error) {
    console.error("Failed to delete audio", error);
    return 'false'
  }
}