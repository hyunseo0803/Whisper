import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image, TouchableOpcity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

import MoodTrackerScreen from '../pages/MoodTracker'
import SearchScreen from '../pages/Search'
import WriteScreen from '../pages/Write'
import ListScreen from '../pages/List'
import SettingScreen from '../pages/Setting'

const Tab = createBottomTabNavigator();

const Tabs = () => {
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
                  shadowOffset: 1,
                  shadowOpacity: .7,
                  borderTopWidth: 0,    // 탭 상단 선 제거
                },
                headerShown: false,  // 상단 안내 보일 것인지
            }}
        >
            <Tab.Screen name='MoodTracker' component={MoodTrackerScreen}
            options={{
              tabBarIcon: ({focused}) => (
                <Ionicons name="analytics-outline" size={32} color={focused ? '#E76B5C' : 'gray'} />
              ),
            }}
            />
            <Tab.Screen name='Search' component={SearchScreen}
            options={{
              tabBarIcon: ({focused}) => (
                <Ionicons name="search-outline" size={32} color={focused ? '#E76B5C' : 'gray'} />
              ),
            }}
            />
            <Tab.Screen name='Write' component={WriteScreen}
            options={{
              tabBarIcon: ({focused}) => (
                <Ionicons name="add-outline" size={55} color='white' />
              ),
              tabBarItemStyle: {
                borderRadius: 100,  // 둘글게 만들기 위함
                top: -40,           // 위로 40만큼 올라옴
                height: '110%',
                backgroundColor: '#E76B5C',
                shadowColor: '#BDBFC4',
                shadowOpacity: 1,
                shadowRadius: 10,
              },
            }}
            />
            <Tab.Screen name='List' component={ListScreen}
              options={{
              tabBarIcon: ({focused}) => (
                <Ionicons name="list-outline" size={32} color={focused ? '#E76B5C' : 'gray'} />
              ),
            }}/>
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