// SignUp.js
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

import firebase from "../firebase";
import {
  Text,
  Container,
  Content,
  Icon,
  Header,
  Body,
  Form,
  Item,
  Input,
  Button,
  Title
} from "native-base";
export default class SignUpScreen extends React.Component {
  state = { email: "", password: "", errorMessage: null };
  handleSignUp = () => {
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password);
    } catch (error) {
      console.log(error.toString(error));
    }
    console.log("handleSignUp");
  };
  render() {
    return (
      <Container>
        <Header>
          <Title style={{ marginTop: 5 }}>Sign Up</Title>
        </Header>
        <Content
          contentContainerStyle={{
            justifyContent: "center",
            flex: 1,
            margin: 10
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Icon
              color="grey"
              type="AntDesign"
              name="barcode"
              style={{ fontSize: 60 }}
            />
            {this.state.errorMessage && (
              <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
            )}
          </View>
          <Form>
            <Item rounded style={{ marginTop: 20, marginBottom: 10 }}>
              <Icon name="mail" />
              <Input
                style={{ marginLeft: 10 }}
                placeholder="Email"
                autoCapitalize="none"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
              />
            </Item>
            <Item rounded style={{ marginTop: 20, marginBottom: 20 }}>
              <Input
                style={{ marginLeft: 10 }}
                secureTextEntry
                placeholder="Password"
                autoCapitalize="none"
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
              />
            </Item>
          </Form>
          <Button
            rounded
            block
            info
            onPress={this.handleSignUp}
            style={{
              marginTop: 30,
              marginBottom: 20,
              marginRight: 40,
              marginLeft: 40
            }}
          >
            <Text>Sign Up</Text>
          </Button>
          <View style={{ alignItems: "center" }}>
            <Text>Already have an account?</Text>
            <Button
              info
              transparent
              onPress={() => this.props.navigation.navigate("Login")}
              style={{
                marginTop: 10,
                alignSelf: "center"
              }}
            >
              <Text>Login</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8
  }
});
