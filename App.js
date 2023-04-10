import React, { useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './src/components/tabs';
import * as Font from "expo-font";


const App = () => {
  Font.loadAsync({"Diary": require("./assets/fonts/EF_Diary.ttf")});


  return(
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}

export default App;