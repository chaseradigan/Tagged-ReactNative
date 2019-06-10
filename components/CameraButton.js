import React, { Component } from "react";
import { Platform, StyleSheet, View, TouchableOpacity } from "react-native";
import { Icon } from "expo";
import { Colors } from "../constants/Colors";
class CameraButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={style.bigBubble}
          onPress={() => alert("pressed")}
        >
          <Icon.Ionicons
            name={Platform.OS === "ios" ? "ios-camera" : "md-camera"}
            size={35}
            color={this.props.focused ? "#2f95dc" : "#ccc"}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
const style = StyleSheet.create({
  bigBubble: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
    top: -20,
    position: "absolute",
    borderWidth: 2,
    borderColor: "grey",
    zIndex: 999
  }
});
export default CameraButton;
