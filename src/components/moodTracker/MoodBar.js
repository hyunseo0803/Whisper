import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import GlobalStyle from '../../globalStyle/GlobalStyle';

const MoodBar = (props) => {

  return (
    <View style={moodBarWrapS.barWrap}>
      {
        [...Array(props.count)].map((_, index) => <View style={moodBarS(index).barElement} key={index}/>)
      }
      <Text style={[moodBarWrapS.barText, GlobalStyle.font_caption2]}>{props.count}</Text>
    </View>
  );
}

const moodBarWrapS = StyleSheet.create({
  barWrap:{
    flexDirection: 'row',
    alignItems: 'center',
    height: 35
  },
  
  barText: {
    marginLeft: 5,
    color: "#4E4981"
  },
})

const moodBarS = (el) => StyleSheet.create({
  barElement: {
    width: 5,
    height: 35,
    backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`, 
    borderRadius: 10,
    marginRight: 1
  },

})


export default MoodBar;
