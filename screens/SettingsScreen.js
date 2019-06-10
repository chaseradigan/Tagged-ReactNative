import React from "react";
import firebase from "../firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
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
  Spinner
} from "native-base";
import { ImagePicker } from "expo";
import { StyleSheet, Alert, ScrollView, ActionSheetIOS } from "react-native";
import { Avatar } from "react-native-elements";
import { CAMERA_ROLL, Permissions } from "expo";
var db = firebase.firestore();
var st = firebase.storage();
async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child(firebase.auth().currentUser.uid);
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}
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
          <Icon name="arrow-back" style={{ color: "#ff2f56" }} />
        </Button>
      ),
      tabBarVisible: false
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
  componentWillMount() {
    var docRef = db.collection("Cards").doc(firebase.auth().currentUser.uid);
    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({
            name: doc.data().name,
            url: doc.data().url,
            insta: doc.data().insta,
            twitter: doc.data().twitter,
            linkedin: doc.data().linkedin,
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
  componentDidMount() {
    var storageRef = st
      .ref()
      .child(firebase.auth().currentUser.uid)
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
  showActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        message: "Are you sure you want to delete this card?",
        options: ["Yes", "No"],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          this.handleDelete;
        }
      }
    );
  };

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

    this.handleUpdate();
  };
  handleUpdate = () => {
    this.setState({ saved: false });
    var docRef = db.collection("Cards").doc(firebase.auth().currentUser.uid);
    var o = {};
    o.name = this.state.name;
    o.url = this.state.url;
    if (this.state.insta.length > 0) {
      o.insta = this.state.insta;
    }
    if (this.state.linkedin.length > 0) {
      o.linkedin = this.state.linkedin;
    }
    if (this.state.twitter.length > 0) {
      o.twitter = this.state.twitter;
    }
    docRef.update(o);
    this.setState({
      saved: true
    });
    console.log("Update");
  };
  handleSave = () => {
    this.setState({ saved: false });
    var cardsRef = db.collection("Cards");
    cardsRef
      .doc(firebase.auth().currentUser.uid)
      .set({
        name: this.state.name,
        url: this.state.url,
        twitter: this.state.twitter,
        linkedin: this.state.linkedin,
        insta: this.state.insta
      })
      .then(response => {
        this.setState({
          saved: true
        });
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  };
  render() {
    return (
      <Container>
        <Content
          contentContainerStyle={{
            flex: 1,
            margin: 10
          }}
        >
          <View style={styles.container}>
            {this.state.loaded ? (
              <View style={styles.header}>
                <ScrollView
                  scrollEnabled={false}
                  keyboardShouldPersistTaps="handled"
                >
                  <Form style={styles.headerContent}>
                    <Item>
                      <View style={{ alignItems: "Center" }}>
                        {this.state.image && (
                          <Avatar
                            rounded
                            size="xlarge"
                            showEditButton={true}
                            renderPlaceholderContent={
                              <Icon
                                type="Ionicons"
                                style={{ fontSize: 150 }}
                                name="contact"
                              />
                            }
                            activeOpacity={0.7}
                            source={{ uri: this.state.image }}
                            onPress={this._pickImage}
                          />
                        )}
                      </View>
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
                </ScrollView>
                <View style={{ alignItems: "center", paddingBottom: 10 }}>
                  {this.state.saved ? (
                    <Icon type="Ionicons" name="checkmark" />
                  ) : (
                    <Text />
                  )}
                  {this.state.exists ? (
                    <View>
                      <Button rounded info onPress={this.handleUpdate}>
                        <Text>Update</Text>
                      </Button>
                    </View>
                  ) : (
                    <View>
                      <Button rounded info onPress={this.handleSave}>
                        <Text>Save</Text>
                      </Button>
                    </View>
                  )}
                </View>
              </View>
            ) : (
              <Spinner style={{ marginTop: 40 }} color="#ff2f56" />
            )}
          </View>
        </Content>
        <View style={{ marginBottom: 0 }}>
          <Button iconLeft danger full onPress={this.showActionSheet}>
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

      if (!result.cancelled) {
        uploadUrl = await uploadImageAsync(result.uri);
        console.log("Done");
        this.setState({ image: uploadUrl });
      }
    } else {
      throw new Error("Camera roll permissions not granted");
    }
  };
}
const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 10,
    flex: 1
  },
  header: {
    marginBottom: 0,
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.8,
    borderRadius: 15
  },
  headerContent: {
    padding: 20,
    alignItems: "center"
  },
  back: {
    flex: 1,
    top: 20,
    left: 5,
    alignItems: "flex-start",
    height: 50
  }
});
