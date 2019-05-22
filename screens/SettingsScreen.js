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
  Button,
  Icon,
  View,
  Text,
  Footer
} from "native-base";
import { ImagePicker } from "expo";
import { Image, StyleSheet, Alert } from "react-native";

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
          style={{ fontWeight: "bold", marginLeft: 10 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-back" style={{ color: "black" }} />
        </Button>
      )
    };
  };
  state = {
    image: null,
    name: "",
    url: "",
    insta: "",
    twitter: "",
    linkedin: "",
    saved: false,
    exists: false,
    loaded: false
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
            exists: true,
            loaded: true
          });
        } else {
          // doc.data() will be undefined in this case
          this.setState({ loaded: true });
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  }
  handleDelete = () => {
    db.collection("Cards")
      .doc(firebase.auth().currentUser.uid)
      .delete()
      .then(function() {
        Alert.alert("Alert", "Card Deleted");
      })
      .catch(function(error) {
        Alert.alert("Alert", error.response);
      });
  };
  handleUpdate = () => {
    var docRef = db.collection("Cards").doc(firebase.auth().currentUser.uid);
    var o = {};
    o.name = this.state.name;
    o.url = this.state.url;
    if (this.state.insta.length > 1) {
      o.insta = this.state.insta;
    }
    if (this.state.linkedin.length > 1) {
      o.linkedin = this.state.linkedin;
    }
    if (this.state.twitter.length > 1) {
      o.twitter = this.state.twitter;
    }
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
        <Content
          contentContainerStyle={{
            justifyContent: "center",
            flex: 1,
            margin: 10,
            alignItems: "center"
          }}
        >
          <Form>
            <Item>
              <Button block transparent info onPress={this._pickImage}>
                <Text>Choose Image</Text>
              </Button>
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 200 }}
                />
              )}
              <Image source={this.image} style={{ width: 200, height: 200 }} />
            </Item>
            <Item inlineLabel>
              <Label>Name</Label>
              <Input
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
              />
            </Item>
            <Item inlineLabel>
              <Label>Phone Number</Label>
              <Input
                onChangeText={url => this.setState({ url })}
                value={this.state.url}
              />
            </Item>
            <Item>
              <Icon name="logo-instagram" />
              <Input
                placeholder="Instagram"
                placeholderTextColor="grey"
                onChangeText={insta => this.setState({ insta })}
                value={this.state.insta}
              />
            </Item>
            <Item>
              <Icon name="logo-linkedin" />
              <Input
                placeholder="LinkedIn"
                placeholderTextColor="grey"
                onChangeText={linkedin => this.setState({ linkedin })}
                value={this.state.linkedin}
              />
            </Item>
            <Item>
              <Icon name="logo-twitter" />
              <Input
                placeholder="Twitter"
                placeholderTextColor="grey"
                onChangeText={twitter => this.setState({ twitter })}
                value={this.state.twitter}
              />
            </Item>
          </Form>
          <View style={{ alignItems: "center" }}>
            {this.state.saved ? <Text>Saved!</Text> : <Text />}
            {this.state.exists ? (
              <Button rounded info onPress={this.handleUpdate}>
                <Text>Update</Text>
              </Button>
            ) : (
              <View>
                {this.state.loaded ? (
                  <Button rounded info onPress={this.handleSave}>
                    <Text>Save</Text>
                  </Button>
                ) : (
                  <Button rounded info>
                    <Text>Save</Text>
                  </Button>
                )}
              </View>
            )}
          </View>
        </Content>
        <View style={{ marginBottom: 5 }}>
          <Button iconLeft danger full onPress={this.handleDelete}>
            <Icon style={{ color: "white" }} name="trash" />
            <Text>Delete</Text>
          </Button>
        </View>
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
