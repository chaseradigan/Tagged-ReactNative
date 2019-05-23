// Loading.js
import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import firebase from "../firebase";
import "firebase/auth";
import { Spinner } from "native-base";

export default class Loading extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? "Drawer" : "Login");
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Spinner color="red" style={{ marginTop: 80 }} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  }
});
