import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { COLOR_DARK_BLUE, COLOR_LIGHT_BLUE } from '../../globalStyle/color';
import GlobalStyle from '../../globalStyle/GlobalStyle';

const MoodBar = (props) => {

  return (
    <View style={moodBarWrapS(props.isDark).barWrap}>
      {
        [...Array(props.count)].map((_, index) => <View style={moodBarS(index).barElement} key={index}/>)
      }
      <Text style={[moodBarWrapS(props.isDark).barText, GlobalStyle.font_caption2]}>{props.count}</Text>
    </View>
  );
}

const moodBarWrapS = (isDark) => StyleSheet.create({
  barWrap:{
    flexDirection: 'row',
    alignItems: 'center',
    height: 35
  },
  
  barText: {
    marginLeft: 5,
    color: isDark ? COLOR_DARK_BLUE : COLOR_LIGHT_BLUE
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
