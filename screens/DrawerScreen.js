import React from "react";
import { Alert, StyleSheet } from "react-native";
import {
  Button,
  Container,
  Content,
  Text,
  Left,
  Header,
  View,
  Body,
  Right
} from "native-base";
import firebase from "../firebase";
import "firebase/storage";
import "firebase/auth";
import { Avatar, ListItem, Icon } from "react-native-elements";

var st = firebase.storage();
export default class DrawerScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    image: null,
    loaded: false
  };

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
  componentDidMount() {
    var storageRef = st
      .ref()
      .child(firebase.auth().currentUser.uid)
      .getDownloadURL()
      .then(response => {
        if (response != null) {
          this.setState({
            image: response,
            loaded: true
          });
          console.log(this.state.image);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    return (
      <Container>
        <Header>
          <Left>
            {this.state.loaded ? (
              <Avatar
                rounded
                size="small"
                source={{
                  uri: this.state.image
                }}
                renderPlaceholderContent={<Icon type="feather" name="user" />}
              />
            ) : (
              <Text>Title</Text>
            )}
          </Left>
          <Body>
            <Text>Profile</Text>
          </Body>
          <Right />
        </Header>
        <Content
          contentContainerStyle={{
            flex: 1
          }}
        >
          <ListItem
            title={"Settings"}
            onPress={() => {
              Alert.alert("Alert", "ListItem pressed ");
            }}
            leftIcon={{ name: "settings", type: "feather" }}
            chevron
          />
          <ListItem
            title={"About"}
            onPress={() => {
              Alert.alert("Alert", "About pressed ");
            }}
            leftIcon={{ name: "external-link", type: "feather" }}
            chevron
          />
          <ListItem
            title={"Info"}
            onPress={() => {
              Alert.alert("Alert", "Info pressed ");
            }}
            leftIcon={{ name: "alert-circle", type: "feather" }}
            chevron
          />
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
            iconLeft
            onPress={this.handleLogout}
            style={{ alignSelf: "center", marginRight: 0, marginLeft: 0 }}
          >
            <Icon name="log-out" type="feather" color="#ff2f56" />
            <Text style={{ color: "#ff2f56" }}>Log Out</Text>
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
  },
  buttonBorder: {
    borderTopColor: "grey",
    borderTopWidth: 1
  },
  buttonBorderLast: {
    borderTopColor: "grey",
    borderTopWidth: 1,
    borderBottomColor: "grey",
    borderBottomWidth: 1
  }
});
