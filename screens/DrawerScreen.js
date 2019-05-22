import React from "react";
import { StyleSheet, View } from "react-native";
import { Alert } from "react-native";
import { Button, Icon, Container, Content, Text } from "native-base";
import firebase from "../firebase";
import "firebase/firestore";
import "firebase/auth";

export default class DrawerScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        this.props.navigation.navigate("Login");
      })
      .catch(function(error) {
        console.log(error.response);
      });
  };
  render() {
    return (
      <Container>
        <Content
          contentContainerStyle={{
            justifyContent: "center",
            flex: 1
          }}
        >
          <Button
            full
            transparent
            dark
            iconLeft
            onPress={() => {
              Alert.alert("Alert", "Button pressed ");
            }}
          >
            <Icon name="cog" />
            <Text>Settings</Text>
          </Button>
          <Button
            full
            transparent
            dark
            iconLeft
            onPress={() => {
              Alert.alert("Alert", "Button pressed ");
            }}
          >
            <Icon name="information-circle" />
            <Text>About</Text>
          </Button>
        </Content>

        <View
          style={{
            backgroundColor: "grey",
            marginBottom: 0,
            alignItems: "center"
          }}
        >
          <Button
            full
            transparent
            dark
            onPress={this.handleLogout}
            style={{ alignSelf: "center", marginRight: 0, marginLeft: 0 }}
          >
            <Text>Log Out</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    paddingHorizontal: 20
  }
});
