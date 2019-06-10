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
import { flipY, zoomIn } from "react-navigation-transitions";
import CameraButton from "../components/CameraButton";
const HomeStack = createStackNavigator(
  {
    Home: MyCardScreen,
    Settings: SettingsScreen
  },
  {
    transitionConfig: () => flipY()
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-contact" : "md-contact"}
    />
  ),
  initialRouteName: "Home"
};

const CameraStack = createStackNavigator({
  Camera: CameraScreen
});

CameraStack.navigationOptions = {
  tabBarLabel: "Scan",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-qr-scanner" : "md-camera"}
    />
  )
};

const ContactsStack = createStackNavigator(
  {
    Contacts: ContactsScreen,
    Profiles: ProfilesScreen
  },
  {
    initialRouteName: "Contacts",
    transitionConfig: () => zoomIn()
  }
);

ContactsStack.navigationOptions = {
  tabBarLabel: "Contacts",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-contacts" : "md-contacts"}
    />
  ),
  initialRouteName: "Contacts"
};

export default createBottomTabNavigator(
  {
    HomeStack,
    CameraStack,
    ContactsStack
  },
  {
    resetOnBlur: true,
    tabBarOptions: {
      activeTintColor: "#ff2f56",
      inactiveTintColor: "#ccc"
    }
  }
);
