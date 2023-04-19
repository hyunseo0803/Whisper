import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import GlobalStyle from '../../globalStyle/GlobalStyle';

const MoodBar = (props) => {

  const LoopCount = (count) => {
    for(i=1; i<=count; i++){
      return(
        <View style={moodBarS.barElement}></View>
      )
    }
  }


  return (
    <View style={moodBarS.barWrap}>
      {
        LoopCount(props.count)
      }
      <Text style={[GlobalStyle.font_caption2]}>{props.count}</Text>
    </View>
  );
}

const moodBarS = StyleSheet.create({
  barWrap:{
    flexDirection: 'row'
  },
  barElement: {
    width: 5,
    height: 30,
    backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    borderRadius: 10,
    marginRight: 1
  },

})

export default MoodBar;
