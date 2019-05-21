import React from "react";
import firebase from "../firebase";
import "firebase/firestore";
import "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button
} from "native-base";
import { ImagePicker } from "expo";
import { Image, View, Text, StyleSheet } from "react-native";

import { CAMERA_ROLL, Permissions } from "expo";
var db = firebase.firestore();
export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: null,
      headerLeft: (
        <Button
          transparent
          light
          style={{ marginLeft: 10 }}
          onPress={() => {
            navigation.navigate("Main");
          }}
        >
          <Ionicons name="ios-arrow-back" size={32} color="black" />
        </Button>
      )
    };
  };
  state = {
    image: null,
    name: "",
    url: "",
    saved: false,
    exists: false
  };
  componentDidMount() {
    var docRef = db.collection("Cards").doc(firebase.auth().currentUser.uid);
    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({
            name: doc.data().name,
            url: doc.data().url,
            exists: true
          });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
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
  handleUpdate = () => {
    var docRef = db.collection("Cards").doc(firebase.auth().currentUser.uid);
    var o = {};
    o.name = this.state.name;
    o.url = this.state.url;
    docRef.update(o);
    this.setState({
      saved: true
    });
    console.log("Update");
  };
  handleSave = () => {
    var cardsRef = db.collection("Cards");
    cardsRef
      .doc(firebase.auth().currentUser.uid)
      .set({
        name: this.state.name,
        url: this.state.url
        // image: this.state.image,
      })
      .then(response => {
        this.setState({
          saved: true
        });
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });

    console.log("save");
  };
  render() {
    let { image } = this.state;
    return (
      <Container>
        <Content>
          <Button onPress={this._pickImage}>
            <Text>Choose Image</Text>
          </Button>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
          <Image source={this.image} style={{ width: 200, height: 200 }} />
          <Form>
            <Item inlineLabel>
              <Label>Name</Label>
              <Input
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
              />
            </Item>
            <Item inlineLabel last>
              <Label>URL</Label>
              <Input
                onChangeText={url => this.setState({ url })}
                value={this.state.url}
              />
            </Item>
          </Form>
          {this.state.saved ? <Text>Saved!</Text> : <Text />}
        </Content>
        {this.state.exists ? (
          <Button title="Update" onPress={this.handleUpdate} />
        ) : (
          <Button title="Create" onPress={this.handleSave} />
        )}

        <Button title="Logout" onPress={this.handleLogout} />
      </Container>
    );
  }
  _pickImage = async () => {
    const { CAMERA_ROLL, Permissions } = Expo;
    // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
    const { status, permissions } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });
      this.setState({
        image: result.uri
      });
      console.log(result);
    } else {
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
      throw new Error("Camera roll permissions not granted");
    }
  };
}
const styles = StyleSheet.create({
  back: {
    flex: 1,
    top: 20,
    left: 5,
    alignItems: "flex-start",
    height: 50
  }
});
