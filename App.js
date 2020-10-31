console.disableYellowBox = true;
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from "./screens/homescreen";
import GalleryScreen from "./screens/galleryscreen";
import SnapScreen from "./screens/snapscreen";
import Picture from "./reducers/pictures";
import {Provider} from 'react-redux';

import {createStore, combineReducers}  from 'redux';

const store = createStore(combineReducers({Picture}));


var BottomNavigator = createBottomTabNavigator(
  {
  Gallery: GalleryScreen,
  Snap: SnapScreen
  },

  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        var iconName;
        if (navigation.state.routeName == 'Gallery') {
          iconName = 'ios-images';
        } else if (navigation.state.routeName == 'Snap') {
          iconName = 'ios-camera';
        }
  
  return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeBackgroundColor: '#111224',
      inactiveBackgroundColor: '#111224',
      activeTintColor: '#009788',
      inactiveTintColor: '#FFFFFF',
    },
  }
);


var StackNavigator = createStackNavigator(
  {
  Home: {screen: HomeScreen,
         navigationOptions: () => ({
          header: null
    })
  },
  navBottom: BottomNavigator,
  },
  {headerMode: 'none'}
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Navigation = createAppContainer(StackNavigator)


export default function App() {
  return (
    <Provider store={store}>
      <Navigation/>
   </Provider>
  );
}

