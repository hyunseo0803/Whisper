import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, SafeAreaView, Pressable, ScrollView, useColorScheme} from 'react-native';
import GlobalStyle from '../../globalStyle/GlobalStyle';
import { Ionicons } from "@expo/vector-icons";
import DiaryView from '../../components/DiaryView';
import { COLOR_BLACK, COLOR_DARK_WHITE } from '../../globalStyle/color';
import ModeColorStyle from '../../globalStyle/ModeColorStyle';

const SearchResult = ({ navigation, route }) => {
  const isDark = useColorScheme() === 'dark'

  const Diarys = route.params.searchedDiarys

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if(redirect){
      navigation.pop()
    }
  }, [redirect]);


  return (
    <SafeAreaView
    style={GlobalStyle.safeAreaWrap}>
      {/* header */}
      <View style={styles.headerWrap}>
        <Pressable
        onPress={() => navigation.pop()}>
          <Ionicons name="arrow-back-outline" size={36} color={isDark?COLOR_DARK_WHITE : COLOR_BLACK}/>
        </Pressable>
        <Text style={[GlobalStyle.font_caption1, ModeColorStyle(isDark).font_DEFALUT]}>Search</Text>
        <Ionicons name="arrow-back-outline" size={36} color="rgba(0,0,0,0)"/>
      </View>

      {/* body */}
      {
        Diarys.length === 0 &&
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={[GlobalStyle.font_body, {color: '#86878C'}]}>검색 결과가 없습니다 :(</Text>
        </View>
      }
      {
        Diarys.length !== 0 &&
        <ScrollView style={{marginTop:20,}}>
        {Diarys.map((diary, index)=> {
          const audio = {
            audio_id : diary.audio_id,
            sound : diary.sound,
            status : diary.status
          }
          return(
            <DiaryView
              dId={diary.d_id}
              key={index}
              date = {diary.date}
              title = {diary.title}
              mood = {diary.mood}
              weather = {diary.weather}
              img = {diary.image}
              audioObj = {audio}
              content = {diary.content}
              setRedirect = {setRedirect}
              isDark={isDark}
            />
          )
        }
        )}
        </ScrollView>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerWrap:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default SearchResult;
