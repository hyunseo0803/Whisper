import React from 'react';
import {View, StyleSheet, Text, Modal, Pressable, Alert} from 'react-native';
import GlobalStyle from '../globalStyle/GlobalStyle'

const SortModal = (props) => {

  const onClickSort = (how) => {
    switch (how) {
      case 'asc':
        props.setHowSortDiary('asc')
        props.setVisible(false)
        break;

      case 'desc':
        props.setHowSortDiary('desc')
        props.setVisible(false)
        break;

      default:
      props.setVisible(false)
      break;
    }
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
        <Pressable style={[modalS.button, GlobalStyle.bgWHITE, {marginBottom: 10}]}
        onPress={() => onClickSort('asc')}>
          <Text style={[GlobalStyle.font_title2, GlobalStyle.fontRED]}>오름차순 정렬</Text>
        </Pressable>
        <Pressable style={[modalS.button, GlobalStyle.bgWHITE, {marginBottom: 20}]}
        onPress={() => onClickSort('desc')}>
          <Text style={[GlobalStyle.font_title2, GlobalStyle.fontRED]}>내림차순 정렬</Text>
        </Pressable>

        <Pressable style={[modalS.button, GlobalStyle.bgRED]}
        onPress={() => onClickSort('cancle')}
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

export default SortModal;
