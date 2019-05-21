import React from "react";
import SettingsScreen from "../screens/SettingsScreen";
import { createStackNavigator } from "react-navigation";

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});
SettingsStack.navigationOptions = {
  title: "Settings"
};
export default SettingsStack;
