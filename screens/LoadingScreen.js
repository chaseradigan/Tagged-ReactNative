// FIBER?????
import React from "react";
import { StyleSheet } from "react-native";
import firebase from "../firebase";
import "firebase/auth";
import { Spinner, Container, Content } from "native-base";
import { Text, Icon } from "react-native-elements";

export default class Loading extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? "Drawer" : "Login");
    });
  }
  render() {
    return (
      <Container>
        <Content
          contentContainerStyle={{
            justifyContent: "center",
            flex: 1,
            alignItems: "center"
          }}
        >
          <Icon color="grey" type="antdesign" name="barcode" size={36} />
          <Spinner color="grey" style={{ marginTop: 5 }} />
        </Content>
      </Container>
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
