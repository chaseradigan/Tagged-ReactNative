import React from "react";
import { StyleSheet, View, Image, TouchableHighlight } from "react-native";
import Modal from "react-native-modal";
import {
  Button,
  Icon,
  Content,
  Spinner,
  Container,
  Text,
  Header,
  Left
} from "native-base";
import QRCode from "react-native-qrcode";
import firebase from "../firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { NavigationEvents } from "react-navigation";
import { Avatar } from "react-native-elements";

var db = firebase.firestore();
var st = firebase.storage();
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    exists: false,
    loaded: false,
    value: {
      userID: "",
      name: "",
      url: "",
      insta: "",
      twitter: "",
      linkedin: ""
    },
    visible: false,
    image: null,
    modalVisible: false
  };
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Profile",
      headerRight: (
        <Button
          transparent
          onPress={() => {
            navigation.navigate("Settings");
          }}
        >
          <Icon name="more" style={{ color: "#ff2f56" }} />
        </Button>
      ),
      headerLeft: (
        <Button
          transparent
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Icon name="menu" style={{ color: "#ff2f56" }} />
        </Button>
      ),
      headerStyle: {
        backgroundColor: "white"
      },
      headerTitleStyle: {
        color: "#2A363B",
        fontWeight: "bold"
      }
    };
  };

  QRtouched = () => {
    this.setState({ visible: true });
  };

  refreshCard = () => {
    this.setState({
      exists: false,
      loaded: false,
      notification: {}
    });
    var docRef = db.collection("Cards").doc(firebase.auth().currentUser.uid);
    docRef
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
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
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
  };

  componentWillMount() {
    this.setState({
      exists: false,
      loaded: false,
      notification: {}
    });
    var docRef = db.collection("Cards").doc(firebase.auth().currentUser.uid);
    docRef
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

  // componentDidMount() {
  //   registerForPushNotificationsAsync();
  //   this._notificationSubscription = Notifications.addListener(
  //     this._handleNotification
  //   );
  // }

  // _handleNotification = notification => {
  //   this.setState({ notification: notification });
  // };

  // sendPushNotification = async () => {
  //   const message = {
  //     to: YOUR_PUSH_TOKEN,
  //     sound: "default",
  //     title: "Original Title",
  //     body: "And here is the body!",
  //     data: { data: "goes here" }
  //   };
  //   const response = await fetch("https://exp.host/--/api/v2/push/send", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Accept-encoding": "gzip, deflate",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(message)
  //   });
  //   const data = response._bodyInit;
  //   console.log(`Status & Response ID-> ${data}`);
  // };
  openModal() {
    this.setState({ modalVisible: true });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }
  render() {
    return (
      <Container>
        <NavigationEvents onWillFocus={this.refreshCard} />
        <Content>
          <View style={styles.container}>
            {this.state.exists ? (
              <View style={styles.header}>
                <View style={styles.headerContent}>
                  <Avatar
                    rounded
                    size={200}
                    source={{
                      uri: this.state.image
                    }}
                    renderPlaceholderContent={
                      <Icon
                        style={{ fontSize: 150 }}
                        type="Ionicons"
                        name="contact"
                      />
                    }
                  />

                  <Text style={styles.name}>{this.state.value.name} </Text>
                  <Text style={styles.info}>{this.state.value.url} </Text>

                  <View style={styles.qr}>
                    <TouchableHighlight
                      activeOpacity={0.9}
                      onPress={() => this.openModal()}
                    >
                      <QRCode
                        value={this.state.value}
                        size={200}
                        bgColor="#2A363b"
                        fgColor="white"
                      />
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            ) : (
              <View>
                {this.state.loaded ? (
                  <View
                    style={{
                      alignSelf: "center",
                      marginBottom: 100,
                      marginTop: 100
                    }}
                  >
                    <Button
                      large
                      transparent
                      light
                      iconLeft
                      title="Create a card"
                      onPress={() => this.props.navigation.navigate("Settings")}
                    >
                      <Icon name="add-circle" />
                      <Text>Create a Card</Text>
                    </Button>
                  </View>
                ) : (
                  <Spinner
                    style={{ marginTop: 40, marginBottom: 40 }}
                    color="#ff2f56"
                  />
                )}
              </View>
            )}
          </View>
        </Content>
        <Modal
          isVisible={this.state.modalVisible}
          onSwipeComplete={() => this.closeModal()}
          swipeDirection={["left", "right", "up"]}
          swipeThreshold={40}
          animationIn={"zoomIn"}
          animationOut={"zoomOut"}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableHighlight onPress={() => this.closeModal()}>
              <View style={{ padding: 30, backgroundColor: "white" }}>
                <QRCode
                  value={this.state.value}
                  size={300}
                  bgColor="#2A363b"
                  fgColor="white"
                />
              </View>
            </TouchableHighlight>
          </View>
        </Modal>
      </Container>
    );
  }
}

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== "granted") {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== "granted") {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  coonsole.log(token);
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginBottom: 0,
    flex: 1
  },
  header: {
    marginBottom: 0,
    backgroundColor: "rgb(242,242,247)",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.7,
    borderRadius: 15,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)"
  },
  headerContent: {
    padding: 20,
    alignItems: "center"
  },
  qr: {
    padding: 10,
    paddingBottom: 30,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.7
  },
  name: {
    fontSize: 26,
    color: "#2A363B",
    fontWeight: "600"
  },
  userInfo: {
    fontSize: 20,
    color: "#2A363B",
    fontWeight: "600"
  },
  body: {
    backgroundColor: "white",

    alignItems: "center"
  },
  info: {
    fontSize: 22,
    marginTop: 10,
    color: "black"
  }
});
