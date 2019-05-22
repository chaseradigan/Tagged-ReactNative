import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import LoadingScreen from "../screens/LoadingScreen";
import SignUpScreen from "../screens/SignUpScreen";
import LoginScreen from "../screens/LoginScreen";
import DrawerNavigator from "./Drawer";

export default createAppContainer(
  createSwitchNavigator(
    {
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      Auth: LoadingScreen,
      SignUp: SignUpScreen,
      Login: LoginScreen,
      Main: MainTabNavigator,
      Drawer: DrawerNavigator
    },
    {
      backBehavior: "order",
      initialRouteName: "Auth"
    }
  )
);
