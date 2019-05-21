import React from "react";
import ProfilesScreen from "../screens/ProfilesScreen";
import { createStackNavigator } from "react-navigation";

const ProfilesStack = createStackNavigator({
  Profiles: ProfilesScreen
});
ProfilesStack.navigationOptions = {
  title: "Profiles"
};
export default ProfilesStack;
