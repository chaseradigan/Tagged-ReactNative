import React from "react";
import { createDrawerNavigator } from "react-navigation";
import MainTabNavigator from "./MainTabNavigator";
import DrawerScreen from "../screens/DrawerScreen";
const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: MainTabNavigator
    }
  },
  {
    drawerPosition: "left",
    initialRouteName: "Home",
    drawerWidth: 200,
    contentComponent: DrawerScreen,
    hideStatusBar: true
  }
);
export default DrawerNavigator;
