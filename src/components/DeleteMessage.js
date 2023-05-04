// 회색화면 버튼들 있는 컴포넌트

import React from 'react';
import {View, StyleSheet, Text, Modal, Pressable, Alert} from 'react-native';
import GlobalStyle from '../globalStyle/GlobalStyle'
import { deleteDiary } from '../util/firebase/CRUD';

/**
 * 일기 삭제 안내 모달창
 * @param {visible, setVisible, wantDelteId(dId), wantDelteDate(date)} props 
 */
const DeleteMessage = (props) => {

  const onClickDelete = (want_delete) => {
    if(want_delete === true) {
      // TODO to 이묘 : 일기를 삭제하는 코드 추가 바람
      Alert.alert("삭제하시겠습니까?", `삭제하시면 다시 복구하실 수 없습니다. 
      ${props.wantDelteDate}의 일기를 정말 삭제할까요?`, [
        {
          text: '취소',
          onPress: () => props.setVisible(false)
        },
        {
          text: '삭제',
          onPress: () => deleteDiaryFun(props.wantDelteId)
        }
      ])
    }
    else {
      props.setVisible(false)
    }
  }

  const deleteDiaryFun = async(id) => {
    // TODO to emyo : 삭제가 완료되면 리스트 리다이렉트
    deleteDiary(id)
    props.setVisible(false)
  }

  return (
    <Modal 
    animationType={'fade'}
    visible={props.showDeleteModal}
    transparent={true}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
    }}
    >
      <View style={modalS.background}>
        <Pressable style={[modalS.button, GlobalStyle.bgWHITE, {marginBottom: 20}]}
        onPress={() => onClickDelete(true)}>
          <Text style={[GlobalStyle.font_title2, GlobalStyle.fontRED]}>삭 제</Text>
        </Pressable>
        <Pressable style={[modalS.button, GlobalStyle.bgRED]}
        onPress={() => onClickDelete(false)}
        >
          <Text style={[GlobalStyle.font_title2, GlobalStyle.fontWHITE]}>취 소</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const modalS = StyleSheet.create({
  background:{
		flex: 1,
		justifyContent: "flex-end",
    alignItems :'center',
    paddingBottom: 40,
    display: 'flex',
		backgroundColor: "rgba(0,0,0,0.4)",
    // backgroundColor: 'red'
  }, 

  button:{
    width: '80%',
    height: 80,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
})

export default DeleteMessage;
