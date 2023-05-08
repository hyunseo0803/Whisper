import { StyleSheet, Text, View, SafeAreaView, Alert,  } from "react-native";
import React, {useState, useNativeDriver, useEffect} from "react";
import GlobalStyle from "../globalStyle/GlobalStyle";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { Keyboard } from "react-native";
import { TextInput } from "react-native";
// import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import DateRangePicker from "../components/datePicker/DateRangePicker";
import { getSearchDiary } from "../util/firebase/CRUD";

const Search = () => {
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
    color: '#9EA0A4',
  };

  /**
   * 검색 버튼 onPress 함수
   */
  const searchDiary = async() => {
    const resultArr = await getSearchDiary(title, startDate, endDate, selectedMood, selectedWeather)
    console.log(resultArr)
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
        <Text style={[{marginBottom: 40}, GlobalStyle.font_caption1]}>Search</Text>

        <View style={[styles.searchWrap, GlobalStyle.bgWHITE]}>
          <View style={[styles.text_input_Box, {marginTop:0}]}>
            <Text style={[GlobalStyle.font_body]}>제목</Text>
            <TextInput
              placeholder="선택없음"
              style={[GlobalStyle.font_body, styles.text_input]}
              value={title}
              onChangeText={text => setTitle(text)}
            />
          </View>

          <View style={[styles.text_input_Box,]}>
            <Text style={[GlobalStyle.font_body]}>기간</Text>
            <View style={{display:'flex', flexDirection:'row', alignItems: 'center'}}>
              <Pressable
              onPress={() => setDateModalShow(true)}
              >
                {startDate==='' && endDate==='' ?
                  // 날짜 지정 안해줄 시 -> 전체 일기에서 검색
                  <Text style={[GlobalStyle.font_body, styles.text_input, {color: '#BDBFC4'}]}>선택없음</Text>
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

          <View style={[styles.text_input_Box]}>
            <Text style={[GlobalStyle.font_body]}>기분</Text>
            <RNPickerSelect
              placeholder={placeholder}
              onValueChange={(value) => setSelectedMood(value)}
              value={selectedMood}
              items={mood}
              style={pickerS}
            />
          </View>

          <View style={[styles.text_input_Box, {borderBottomColor:'#fff', paddingBottom:0}]}>
            <Text style={[GlobalStyle.font_body]}>날씨</Text>
            <RNPickerSelect
              placeholder={placeholder}
              onValueChange={(value) => setSelectedWeather(value)}
              value={selectedWeather}
              items={weather}
              style={pickerS}
            />
          </View>
        </View>
        
        <Text style={[{marginTop: 20 ,color:'#BDBFC4'}, GlobalStyle.font_caption1]}>검색 결과는 최대 30개로 제한됩니다.</Text>

        <Pressable
        disabled={!canPressSearchBtn}
        onPress={() => searchDiary()}
        style={
          canPressSearchBtn?[buttonS.buttonWrap, GlobalStyle.bgRED] : [buttonS.buttonWrap, {backgroundColor:'rgba(231, 107, 92, .5)'}]}>
          <Ionicons name="search-outline" size={36} color="#fff"/>
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
    paddingBottom: 8,
    borderBottomColor: '#D3D5DA',
    borderBottomWidth: 1

  },
  text_input:{
    textAlign: 'right',
    paddingVertical: 7,
    minWidth: 100,
    maxWidth: '70%',
  }
});

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

const pickerS = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    fontFamily: "Diary",
    textAlign: 'right',
    paddingVertical: 7,
    width: 100
  }
})