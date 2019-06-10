import React, { Component } from "react";
import { StyleSheet, TouchableHighlight, Image, Alert } from "react-native";
import firebase from "../firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { Text, View, Button, Icon, Container, Content } from "native-base";
import { SocialIcon, Avatar } from "react-native-elements";

var db = firebase.firestore();
var st = firebase.storage();
export default class ProfilesScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    exists: false,
    loaded: false,
    value: {},
    image: null
  };
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: null,
      headerLeft: (
        <Button
          iconLeft
          transparent
          style={{ fontWeight: "bold", marginLeft: 15 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon style={{ color: "#ff2f56" }} name="arrow-back" />
          <Text style={{ color: "#ff2f56" }}>Back</Text>
        </Button>
      ),
      tabBarVisible: false
    };
  };

  onClickListener = viewId => {
    Alert.alert("Alert", "Button pressed " + viewId + `${this.state.value}`);
  };
  componentDidMount() {
    const { navigation } = this.props;
    const itemId = navigation.getParam("itemId", "NO-ID");
    const title = navigation.getParam("title", "some default value");

    var docRef = db
      .collection("Cards")
      .doc(firebase.auth().currentUser.uid)
      .collection("Contacts")
      .doc(itemId)
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({
            value: doc.data(),
            exists: true,
            loaded: true
          });
        } else {
          this.setState({
            loaded: true,
            exists: false
          });
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
    var storageRef = st
      .ref()
      .child(itemId)
      .getDownloadURL()
      .then(response => {
        if (response != null) {
          this.setState({
            image: response
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  //https://www.npmjs.com/package/react-native-custom-qr-codes-expo custome qrCodes
  render() {
    return (
      <Container>
        <Content>
          <View style={styles.container}>
            <View style={styles.header}>
              {this.state.exists ? (
                <View style={styles.headerContent}>
                  <Avatar
                    rounded
                    size="xlarge"
                    source={{
                      uri: this.state.image
                    }}
                  />
                  <Text style={styles.name}>{this.state.value.name}</Text>
                  <Text style={styles.name}>{this.state.value.url}</Text>

                  <View style={styles.buttonContainer}>
                    <TouchableHighlight
                      style={[styles.button, styles.buttonMessage]}
                      onPress={() => this.onClickListener("message")}
                    >
                      <Icon name="person-add" />
                    </TouchableHighlight>

                    <TouchableHighlight
                      style={[styles.button, styles.buttonLinkedIn]}
                      onPress={() => this.onClickListener("linkedin")}
                    >
                      <Icon name="logo-linkedin" />
                    </TouchableHighlight>

                    <SocialIcon
                      button
                      type="instagram"
                      onPress={() => this.onClickListener("instagram")}
                    />

                    <SocialIcon
                      button
                      type="twitter"
                      onPress={() => this.onClickListener("phone")}
                    />
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    height: 300
                  }}
                >
                  <Text>Profile doesn't exist</Text>
                </View>
              )}
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1
  },
  header: {
    marginBottom: 0,
    backgroundColor: "rgb(42, 54, 59)",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.8,
    borderRadius: 15
  },
  box: {
    marginTop: 10,
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2
    },
    elevation: 2,
    paddingTop: 10
  },
  headerContent: {
    padding: 20,
    alignItems: "center"
  },
  name: {
    fontSize: 35,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#1E90FF"
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center"
  },

  button: {
    width: 60,
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 30,
    margin: 10,
    shadowColor: "black",
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 2,
      width: -2
    },
    elevation: 4
  },
  buttonMessage: {
    backgroundColor: "#d7d7d8"
  },
  buttonLinkedIn: {
    backgroundColor: "#0077b5"
  },
  buttonInstagram: {
    backgroundColor: "#5851db"
  },
  buttonTwitter: {
    backgroundColor: "#1da1f2"
  },
  icon: {
    width: 35,
    height: 35
  }
});
