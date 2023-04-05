import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image, TouchableOpcity } from "react-native";

import MoodTrackerScreen from '../pages/MoodTracker'
import SearchScreen from '../pages/Search'
import WriteScreen from '../pages/Write'
import ListScreen from '../pages/List'
import SettingScreen from '../pages/Setting'

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator
            tabBarOptions={{
                // showLabel: false,
                style: {
                    position: 'absolute',
                    // bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#000',
                    borderRadius: 15,
                    height: 90,
                }
            }}
        >
            <Tab.Screen name='MoodTracker' component={MoodTrackerScreen}/>
            <Tab.Screen name='Search' component={SearchScreen}/>
            <Tab.Screen name='Write' component={WriteScreen}/>
            <Tab.Screen name='List' component={ListScreen}/>
            <Tab.Screen name='Setting' component={SettingScreen}/>
        </Tab.Navigator>

    )
}

export default Tabs;