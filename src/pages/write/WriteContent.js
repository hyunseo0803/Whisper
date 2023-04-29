import React, { useState, useEffect } from 'react';
import {View, StyleSheet, SafeAreaView, Text, Pressable, ScrollView, TextInput, KeyboardAvoidingView, Keyboard, NativeModules, Image} from 'react-native';
import GlobalStyle from '../../globalStyle/GlobalStyle';
import { Ionicons, Feather } from "@expo/vector-icons";
import { async } from '@firebase/util';

const { StatusBarManager } = NativeModules

const WriteContent = ({navigation, route}) => {

  const [dSubject, setDSubject] = useState([]);   // 일기 주제  // 여러개 골라서 넣을 수 있다는 가정
  const [dTitle, setDTitle] = useState('');       // 일기 제목
  const [dContent, setDContent] = useState('');   // 일기 내용
  const [contentLength, setContentLength] = useState(0);
  const [dImgUrl, setDImgUrl] = useState([]);     // 오늘의 사진  // 프리미엄 회원은 최대 3개까지이므로 일단 배열로 지정
  const [canSave, setCanSave] = useState('#BDBFC4');

  // TODO to 현서 : 프리미엄 회원 구분해주세요
  const premium = true  // 프리미엄 회원 임시

  useEffect(() => {
    setDSubject(['# 오늘의 작은 기쁨', '# 나만의 행복 습관', '# 나만의 행복 습관'])
  }, []);
  console.log(dSubject)
  console.log(dSubject.length !== 0)

  /**
   * 음성 녹음 / stt 관련 함수
   */
  const voiceRecording = async() => {
    alert("음성 녹음 기능을 넣어주세요")
  }

  /**
   * 프리미엄 유저인지 확인해서 글자 최대값 리턴
   * @param {boolean} premium 
   * @returns maxLength
   */
  const textLength = (premium) => {
    if(premium) {
      // 프리미엄 유저라면 글자수 제한 없음
      return null
    }else{
      // 일반 유저라면 글자수 500자 제한
      return 500
    }
  }

  const checkValue = () => {
    if(typeof(dContent)==undefined || dContent===null || !dContent ||
    typeof(dTitle)==undefined || dTitle===null || !dTitle){
      return '#BDBFC4'
    }
    else{
      return '#E76B5C'
    }
  }

  useEffect(() => {
    setContentLength(dContent.length)
    if(dContent.replace(/\s/g, "") === '' || dTitle.replace(/\s/g, "") === ''){
      setCanSave('#BDBFC4')
    }
    else{
      setCanSave('#E76B5C')
    }
  }, [dContent, dTitle])


  return (
    <SafeAreaView style={GlobalStyle.safeAreaWrap}>
      <KeyboardAvoidingView 
      style={{flex:1}}
      behavior={"padding"}
      >
      <Pressable
      onPress={Keyboard.dismiss}
      style={{flex:1}}>

        {/* header */}
        <View style={[headerStyle.mainWrap]}>
          <Pressable
          onPress={() => navigation.pop()}>
            <Ionicons name="arrow-back-outline" size={40} color='black'/>
          </Pressable>
          <Text style={[GlobalStyle.font_caption1]}>Write Diary</Text>
          <Pressable
          // TODO to 현서: 다음 페이지로 네비게이션 넣어주세요
          onPress={() => alert("다음 페이지로")}
          >
            <Feather name="check" size={40} color={canSave} />
          </Pressable>
        </View>

        {
          // 일기 주제가 하나라도 있다면 실행
          dSubject.length !== 0 &&
          <ScrollView style={headerStyle.subjectWrap}
          horizontal
          >
            {
              dSubject.map((subjectElement, index) => (
                <View style={headerStyle.subjectBox} key={index}>
                <Text style={[GlobalStyle.font_body, headerStyle.subjectText]}>{subjectElement}</Text>
              </View>
            ))
          }
          </ScrollView>
        }

        {/* body */}
        <ScrollView style={BodyStyle.mainWrap}
        >
          {/* 일기 제목 */}
          <View style={BodyStyle.titleInputBox}>
            <TextInput
            value={dTitle}
            onChangeText={text => setDTitle(text)}
            placeholder='일기에 제목을 붙여주세요'
            style={[BodyStyle.titleInput, GlobalStyle.font_title2]}/>
          </View>
          {/* 음성녹음 버튼 */}
          <Pressable style={BodyStyle.btnMic}
          onPress={() => voiceRecording()}>
            <Ionicons name="mic-circle" size={45} color='#E76B5C'></Ionicons>
          </Pressable>
          {/* 본문 textInput */}
          <TextInput
            onChangeText={text => setDContent(text)}
            value={dContent}
            placeholder=' 음성 인식 기능(녹음시작)을 활용하거나 직접 입력하여 일기를 기록해 보세요! 
            여러분의 이야기를 기록해드릴게요. 오늘은 어떤 하루였나요? :)'
            editable
            multiline
            maxLength={textLength(premium)}   // 프리미엄 회원이 맞으면 true, 아니면 false
            textAlign='center'
            style={[BodyStyle.contentInput, GlobalStyle.font_body]}
            />
          
          <View style={BodyStyle.textCountWrap}>
            {
              // 프리미엄 회원이 아닐 때만 500자 제한 나타남
              !premium &&
              <Text style={[{color:'#86878C'},GlobalStyle.font_caption2]}>500/</Text>
            }
            <Text style={[{color:'#86878C'},BodyStyle.textCountText, GlobalStyle.font_caption2]}>{contentLength}</Text>
          </View>

          {
            premium ?
            (
            <ScrollView
            horizontal>
              <Pressable style={BodyStyle.btnImg}
              onPress={() => alert('hi')}>
                <Image 
                style={{width:'100%', height:'100%'}}
                source={{uri: "https://images.unsplash.com/photo-1682752013336-7446ed2d507a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"}}/>
              </Pressable>

              <Pressable style={BodyStyle.btnImg}
              onPress={() => alert('hi')}>
                <Image 
                style={{width:'100%', height:'100%'}}
                source={{uri: "https://images.unsplash.com/photo-1682752013336-7446ed2d507a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"}}/>
              </Pressable>
              <Pressable style={BodyStyle.btnImg}
              onPress={() => alert('hi')}>
                <Image 
                style={{width:'100%', height:'100%'}}
                source={{uri: "https://images.unsplash.com/photo-1682752013336-7446ed2d507a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"}}/>
              </Pressable>
            </ScrollView>
            ) 
            :
            (
              <View style={{width: '100%', justifyContent:'center', alignItems:'center'}}>
                <Pressable style={BodyStyle.btnImg}
                onPress={() => alert('hi')}>
                  <Image 
                  style={{width:'100%', height:'100%'}}
                  source={{uri: "https://images.unsplash.com/photo-1682752013336-7446ed2d507a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"}}/>
                </Pressable>
              </View>
            )
          }

        </ScrollView>
      </Pressable>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}


const headerStyle = StyleSheet.create({
  mainWrap: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  subjectWrap:{
    width: '100%',
    maxHeight: 35,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  subjectBox:{
    backgroundColor: '#4E4981',
    paddingHorizontal: 15,
    marginHorizontal: 5,
    borderRadius: 50,
    justifyContent: 'center'
  },
  subjectText:{
    color: '#fff'
  }
})

const BodyStyle = StyleSheet.create({
  mainWrap:{
    display: 'flex',
    flex: 20,
    marginTop: 14,
  },
  titleInputBox:{
    width: '100%',
    alignItems: 'center'
  },
  titleInput: {
    width: '70%',
    textAlign: 'center',
    padding: 7,
    borderBottomWidth: 1,
    borderColor: '#86878C',
  },

  btnMic:{
    marginTop: 15,
    alignItems: 'center'
  },

  contentInput:{
    width: '100%',
    marginTop: 10,
    height: 400,
  },

  textCountWrap:{
    width: '100%',
    marginTop: 15,
    justifyContent: 'flex-end',
    display: 'flex',
    flexDirection: 'row'
  },
  textCountText: {
    textAlign: 'right'
  },

  btnImg:{
    width: 250,
    height: 250,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 40,
    marginHorizontal: 10,
  }
})

export default WriteContent;
