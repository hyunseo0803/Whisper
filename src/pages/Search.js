import { StyleSheet, Text, View, SafeAreaView, Alert, useColorScheme,  } from "react-native";
import React, {useState, useNativeDriver, useEffect} from "react";
import GlobalStyle from "../globalStyle/GlobalStyle";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { Keyboard } from "react-native";
import { TextInput } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import DateRangePicker from "../components/datePicker/DateRangePicker";
import { getSearchDiary } from "../util/firebase/CRUD";
import ModeColorStyle from "../globalStyle/ModeColorStyle";
import { COLOR_BLACK, COLOR_DARK_FOURTH, COLOR_DARK_PRIMARY, COLOR_DARK_RED, COLOR_DARK_SECONDARY, COLOR_DARK_THIRD, COLOR_DARK_WHITE, COLOR_LIGHT_SECONDARY, COLOR_LIGHT_THIRD, COLOR_WHITE } from "../globalStyle/color";

const Search = ({navigation}) => {
  // const router = useRouter();
  const isDark = useColorScheme() === 'dark'

  const toDay = new Date();
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);         // 선택된 기분
  const [selectedWeather, setSelectedWeather] = useState(null);   // 선택된 날씨
  //modal
  const [dateModalShow, setDateModalShow] = useState(false);
  const [canPressSearchBtn, setCanPressSearchBtn] = useState(false);

  /**
   * mood picker item 요소
   */
  const mood = [
    { label: '기쁨', value: 'happy' },
    { label: '혐오', value: 'disgust' },
    { label: '놀람', value: 'surprised' },
    { label: '화남', value: 'angry' },
    { label: '슬픔', value: 'sad' },
    { label: '두려움', value: 'fear' },
    { label: '무표정', value: 'expressionless' },
  ]
  /**
   * weather picker item 요소
   */
  const weather = [
    { label: '맑음', value: 'sunny' },
    { label: '구름조금', value: 'littleCloud' },
    { label: '흐림', value: 'cloudy' },
    { label: '비', value: 'rain' },
    { label: '눈', value: 'snow' },
    { label: '천둥', value: 'lightning' },
  ]
  // placeholder 세팅값
  const placeholder = {
    label: '선택없음',
    value: null,
    // color: ,
  };

  /**
   * 검색 버튼 onPress 함수
   */
  const searchDiary = async() => {
    const resultArr = await getSearchDiary(title, startDate, endDate, selectedMood, selectedWeather)
    navigation.navigate('searchResult', {searchedDiarys : resultArr})
  }



  useEffect(() => {
    if(title.replace(/\s/g, "")!=='' || startDate!=='' || endDate!=='' || selectedMood!==null || selectedWeather!==null){
      setCanPressSearchBtn(true)
    }
    else{
      setCanPressSearchBtn(false)
    }
  }, [title, startDate, endDate, selectedMood, selectedWeather])


  return (
    <SafeAreaView style={[{position: "relative",}, GlobalStyle.safeAreaWrap]}>
      <Pressable
        style={styles.flexCenter}
        onPress={() => {Keyboard.dismiss()}}
      >
        <Text style={[{marginBottom: 40}, GlobalStyle.font_caption1, ModeColorStyle(isDark).font_DEFALUT]}>Search</Text>

        <View style={[styles.searchWrap, {backgroundColor : (isDark ? COLOR_DARK_FOURTH : COLOR_WHITE)}]}>
          <View style={[styles.text_input_Box, {marginTop:0}, borderBottom(isDark)]}>
            <Text style={[GlobalStyle.font_body, ModeColorStyle(isDark).font_DEFALUT]}>제목</Text>
            <TextInput
              placeholder="선택없음"
              style={[GlobalStyle.font_body, styles.text_input]}
              value={title}
              onChangeText={text => setTitle(text)}
            />
          </View>

          <View style={[styles.text_input_Box, borderBottom(isDark)]}>
            <Text style={[GlobalStyle.font_body, ModeColorStyle(isDark).font_DEFALUT]}>기간</Text>
            <View style={{display:'flex', flexDirection:'row', alignItems: 'center'}}>
              <Pressable
              onPress={() => setDateModalShow(true)}
              >
                {startDate==='' && endDate==='' ?
                  // 날짜 지정 안해줄 시 -> 전체 일기에서 검색
                  <Text style={[GlobalStyle.font_body, styles.text_input, {color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)'}]}>선택없음</Text>
                :
                  // 날짜 지정
                  <Text style={[GlobalStyle.font_body, styles.text_input, {maxWidth: '100%'}]}>{startDate} ~ {endDate}</Text>
                }
              </Pressable>
              {
                dateModalShow &&
                <DateRangePicker
                  animationType = 'fade'
                  visible={dateModalShow}
                  setVisible={setDateModalShow}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                />
              }
            </View>
          </View>

          <View style={[styles.text_input_Box, borderBottom(isDark)]}>
            <Text style={[GlobalStyle.font_body, ModeColorStyle(isDark).font_DEFALUT]}>기분</Text>
            <RNPickerSelect
              placeholder={placeholder}
              onValueChange={(value) => setSelectedMood(value)}
              value={selectedMood}
              items={mood}
              style={pickerS(selectedMood, isDark)}
            />
          </View>

          <View style={[styles.text_input_Box, borderBottom(isDark), {borderBottomColor:isDark ? COLOR_DARK_FOURTH : COLOR_WHITE, paddingBottom:0}]}>
            <Text style={[GlobalStyle.font_body, ModeColorStyle(isDark).font_DEFALUT]}>날씨</Text>
            <RNPickerSelect
              placeholder={placeholder}
              onValueChange={(value) => setSelectedWeather(value)}
              value={selectedWeather}
              items={weather}
              style={pickerS(selectedWeather, isDark)}
            />
          </View>
        </View>
        
        <Text style={[{marginTop: 20 ,color:(isDark ? COLOR_DARK_PRIMARY : COLOR_LIGHT_SECONDARY)}, GlobalStyle.font_caption1]}>검색 결과가 너무 많을 경우 시간이 지연될 수 있습니다.</Text>

        <Pressable
        disabled={!canPressSearchBtn}
        onPress={() => searchDiary()}
        style={
          canPressSearchBtn?[buttonS.buttonWrap, ModeColorStyle(isDark).bg_RED] : [buttonS.buttonWrap, {backgroundColor:'rgba(231, 107, 92, .5)'}]}>
          <Ionicons name="search-outline" size={36} color={canPressSearchBtn ? COLOR_WHITE : 'rgba(255,255,255,.5)'}/>
        </Pressable>

      </Pressable>

    </SafeAreaView>
  );
}

export default Search;

const styles = StyleSheet.create({
  flexCenter: {
    flex: 1,
    alignItems: "center",
  },

  searchWrap:{
    width: '100%',
    borderRadius: 10,

    boxSizing: 'borderBox',
    paddingHorizontal: 17,
    paddingVertical: 22,
  },

  text_input_Box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent :'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,

    marginTop: 8,
  },
  text_input:{
    textAlign: 'right',
    paddingVertical: 7,
    minWidth: 100,
    maxWidth: '70%',
  }
});

const borderBottom = (isDark) => StyleSheet.create({
  paddingBottom: 8,
  borderBottomColor: isDark ? COLOR_DARK_THIRD : COLOR_LIGHT_THIRD,
  borderBottomWidth: 1
})

const buttonS = StyleSheet.create({
  buttonWrap: {
    width: '100%',
    height: 55,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',

    position: 'absolute',
    bottom: 36,
  }
})

const pickerS = (el,isDark) => StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    fontFamily: "Diary",
    textAlign: 'right',
    paddingVertical: 7,
    width: 100,
    color: isDark?COLOR_DARK_WHITE : COLOR_BLACK
  },
  placeholder:{
    color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)'
  }
})