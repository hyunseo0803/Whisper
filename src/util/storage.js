import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 현재 테마 불러오기
 */
export const loadThemeMode = async () => {
  try {
    const storedThemeMode = await AsyncStorage.getItem('themeMode');
    if (storedThemeMode === 'light') {
      return 'light';
    } else if (storedThemeMode === 'dark') {
      return 'dark';
    } else {
      // 기본 테마 모드 설정
      await AsyncStorage.setItem('themeMode', 'light');
      return 'light';
    }
  } catch (error) {
    console.error('Error loading theme mode:', error);
  }
};



/**
 * 테마 적용
 * @param {string} theme  "light | dark | system" 
 */
export const saveThemeMode = async (value) => {
  try {
    await AsyncStorage.setItem('themeMode', value ? 'dark' : 'light');
  } catch (error) {
    console.error('Error saving theme mode:', error);
  }
};



// ******************* 앱 내 잠금 ******************* //
/**
 * 비밀번호 저장
 * @param {string} value 
 */
export const savePassword = async(value) => {
  try{
    await AsyncStorage.setItem('password', value)
    return true
  }catch(e){
    console.error('Error saving password', e)
    return false
  }
}

/**
 * 비밀번호 불러오기
 */
export const loadPassword = async() => {
  try {
    const storedPw = await AsyncStorage.getItem('password');
    if (storedPw === undefined || storedPw === '' || storedPw === null) {
      return false;
    }else {
      return storedPw;
    }
  } catch (error) {
    console.error('Error loading theme mode:', error);
  }
}