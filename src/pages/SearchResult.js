import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, SafeAreaView, Pressable, ScrollView} from 'react-native';
import GlobalStyle from '../globalStyle/GlobalStyle';
import { Ionicons } from "@expo/vector-icons";
import { timestampToDate } from '../util/firebase/CRUD';
import DiaryView from '../components/DiaryView';

const SearchResult = ({ navigation, route }) => {

  const Diarys = route.params.searchedDiarys
  console.log(Diarys)

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if(redirect === true){
      setRedirect(false)
    }
  }, [redirect]);


  return (
    <SafeAreaView
    style={GlobalStyle.safeAreaWrap}>
      {/* header */}
      <View style={styles.headerWrap}>
        <Pressable
        onPress={() => navigation.pop()}>
          <Ionicons name="arrow-back-outline" size={36} color="#000"/>
        </Pressable>
        <Text style={[GlobalStyle.font_caption1]}>Search</Text>
        <Ionicons name="arrow-back-outline" size={36} color="#f2f2f2"/>
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
        {Diarys.map((diary, index)=> (
          <DiaryView
            dId={diary.d_id}
            key={index}
            date = {timestampToDate(diary.date)}
            title = {diary.title}
            mood = {diary.mood}
            weather = {diary.weather}
            img = {diary.image}
            voice = {diary.voice}
            content = {diary.content}
            setRedirect = {setRedirect}
          />
        )
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
