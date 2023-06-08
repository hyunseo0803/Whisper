import { Theme } from "@react-navigation/native";

export const DarkTheme = {
  dark: true,
  colors: {
    primary: 'rgb(10, 132, 255)',
    background: '#1C1C1E',
    card: '#2A292E',
    text: 'rgb(229, 229, 231)',
    border: 'rgb(39, 39, 41)',
    notification: 'rgb(255, 69, 58)',
  },
};

export const DefaultTheme = {
    dark: false,
    colors: {
      primary: 'rgb(0, 122, 255)',
      background: 'rgb(242, 242, 242)',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(216, 216, 216)',
      notification: 'rgb(255, 59, 48)',
    },
  };

export const theme = {
  light : {
    theme: 'light',
    color: 'rgb(28, 28, 30)',
    background: 'rgb(242, 242, 242)',
  },
  dark:{
    theme: 'dark',
    color: 'rgb(229, 229, 231)',
    background: '#1C1C1E',
  }
}