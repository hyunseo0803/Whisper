import { StyleSheet, Text, View, SafeAreaView,  } from "react-native";
import React, {useState, useNativeDriver} from "react";
import GlobalStyle from "../globalStyle/GlobalStyle";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { Keyboard } from "react-native";
import { TextInput } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';

const Search = () => {
  const toDay = new Date();
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedWeather, setSelectedWeather] = useState('');


  /**
   * 검색 날짜 onChange 함수
   * @param {e} event 
   * @param {date} selectedDate 
   * @param {string} type 
   */
  const onChangeDate = (event, selectedDate, type) => {
    const currentDate = selectedDate;
    type === 'start' ? setStartDate(currentDate) : setEndDate(currentDate);
  };

  return (
    <SafeAreaView style={[{position: "relative",}, GlobalStyle.safeAreaWrap]}>
      <Pressable
        style={styles.flexCenter}
        onPress={() => Keyboard.dismiss()}
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
              <DateTimePicker
                value={startDate}
                mode={'date'}
                minimumDate={new Date(2015, 12, 1)}
                maximumDate={toDay}
                onChange={(e, date) => onChangeDate(e, date, "start")}
                themeVariant='light'   // TODO to emyo : 라이트모드(light) 다크모드(dark) 설정 바람
              />
              <Text style={[GlobalStyle.font_body]}> ~</Text>
              <DateTimePicker
                value={endDate}
                mode={'date'}
                minimumDate={startDate}
                maximumDate={toDay}
                onChange={(e, date) => onChangeDate(e, date, "end")}
                style={[GlobalStyle.font_body]}
                themeVariant='light'  // TODO to emyo : 라이트모드(light) 다크모드(dark) 설정 바람
              />
            </View>
          </View>

          <View style={[styles.text_input_Box]}>
            <Text style={[GlobalStyle.font_body]}>기분</Text>
            <TextInput
              placeholder="선택없음"
              style={[GlobalStyle.font_body, styles.text_input]}
            />
          </View>

          <View style={[styles.text_input_Box, {borderBottomColor:'#fff', paddingBottom:0}]}>
            <Text style={[GlobalStyle.font_body]}>날씨</Text>
            <TextInput
              placeholder="선택없음"
              style={[GlobalStyle.font_body, styles.text_input]}
            />
          </View>
        </View>

        <Pressable
        style={[buttonS.buttonWrap, GlobalStyle.bgRED]}>
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
    backgroundColor: 'yellow',

    marginTop: 8,
    paddingBottom: 8,
    borderBottomColor: '#D3D5DA',
    borderBottomWidth: 1

  },
  text_input:{
    textAlign: 'right',
    backgroundColor: 'red',
    paddingVertical: 7,
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