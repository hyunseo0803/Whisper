import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image, TouchableOpcity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

import MoodTrackerScreen from '../pages/MoodTracker'
import HomeScreen from '../pages/Home'
import SearchScreen from '../pages/Search'
import ListScreen from '../pages/List'
import SettingScreen from '../pages/Setting'

const Tab = createBottomTabNavigator();

const Tabs = ({ navigation }) => {
    return(
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false, // text 나타나지 않게
                tabBarStyle: {
                  position: 'relative',
                  display: 'flex',        // 아이템들의 정렬
                  justifyContent: 'space-between',
                  height: 100,  // 탭 높이 지정
                  shadowColor: '#D3D5DA', // 그림자
                  shadowRadius: 10,
                  shadowOpacity: .7,
                  borderTopWidth: 0,    // 탭 상단 선 제거
                  backgroundColor: '#fff'
                },
                headerShown: false,  // 상단 안내 안보이도록
            }}
        >
            <Tab.Screen name='MoodTracker' component={MoodTrackerScreen}
            navigation={navigation}
            options={{
              tabBarIcon: ({focused}) => (
                <Ionicons name="analytics-outline" size={32} color={focused ? '#E76B5C' : 'gray'} />
                ),
              }}
            />
            <Tab.Screen name='List' component={ListScreen}
              options={{
                tabBarIcon: ({focused}) => (
                  <Ionicons name="list-outline" size={32} color={focused ? '#E76B5C' : 'gray'} />
                  ),
                }}/>
            <Tab.Screen name='Home' component={HomeScreen}
              navigation = {navigation}
              options={{
                tabBarIcon: ({focused}) => (
                  <Ionicons name="home-outline" size={32} color={focused ? '#E76B5C' : 'gray'} />
                ),
              }}
            />
            <Tab.Screen name='Search' component={SearchScreen}
              navigation = {navigation}
              options={{
                tabBarIcon: ({focused}) => (
                  <Ionicons name="search-outline" size={32} color={focused ? '#E76B5C' : 'gray'} />
                ),
              }}
            />
            <Tab.Screen name='Setting' component={SettingScreen}
              options={{
                tabBarIcon: ({focused}) => (
                  <Ionicons name="settings-outline" size={32} color={focused ? '#E76B5C' : 'gray'} />
                ),
              }}
            />
        </Tab.Navigator>

    )
}

export default Tabs;