import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import MyCardScreen from "../screens/MyCardScreen";
import CameraScreen from "../screens/CameraScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ContactsScreen from "../screens/ContactsScreen";
import ProfilesScreen from "../screens/ProfilesScreen";

const HomeStack = createStackNavigator({
  Home: MyCardScreen,
  Settings: SettingsScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-contact" : "md-contact"}
    />
  )
};

const CameraStack = createStackNavigator({
  Camera: CameraScreen
});

CameraStack.navigationOptions = {
  tabBarLabel: "Camera",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-camera" : "md-camera"}
    />
  )
};

const ContactsStack = createStackNavigator({
  Contacts: ContactsScreen,
  Profiles: ProfilesScreen
});

ContactsStack.navigationOptions = {
  tabBarLabel: "Contacts",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-contacts" : "md-contacts"}
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  CameraStack,
  ContactsStack
});
