import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from "react-native";
import { Button, Icon, Content, Spinner, Container } from "native-base";
import QRCode from "react-native-qrcode";
import firebase from "../firebase";
import "firebase/auth";
import "firebase/firestore";
import { NavigationEvents } from "react-navigation";

var db = firebase.firestore();
export default class HomeScreen extends React.Component {
  state = {
    exists: false,
    loaded: false,
    value: {
      name: "",
      url: "",
      userID: ""
    },
    visible: false
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
          <Icon name="more" style={{ color: "white" }} />
        </Button>
      ),
      headerLeft: (
        <Button
          transparent
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Icon name="menu" style={{ color: "white" }} />
        </Button>
      ),
      headerStyle: {
        backgroundColor: "#00aaff"
      },
      headerTitleStyle: {
        color: "white",
        fontWeight: "bold"
      }
    };
  };
  QRtouched = () => {
    this.setState({ visible: true });
  };
  handleCreateCard() {
    this.props.navigation.navigate({
      routeName: "Settings",
      params: {
        userID: this.state.value.userID
      }
    });
  }
  refreshCard = () => {
    var docRef = db.collection("Cards").doc(firebase.auth().currentUser.uid);
    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({
            value: {
              name: doc.data().name,
              url: doc.data().url,
              userID: docRef.id
            },
            exists: true,
            loaded: true
          });
          this.props.navigation.setParams({
            userValues: this.state.value
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
  };
  componentDidMount() {
    this.refreshCard();
  }

  render() {
    return (
      <Container>
        <NavigationEvents onWillFocus={this.refreshCard} />
        <Content>
          <View style={styles.container}>
            <View style={styles.header}>
              {this.state.exists ? (
                <View style={styles.headerContent}>
                  <Image
                    style={styles.avatar}
                    source={{
                      uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
                    }}
                  />

                  <Text style={styles.name}>{this.state.value.name} </Text>
                  <Text style={styles.userInfo}>{this.state.value.url} </Text>
                  <Text style={styles.userInfo}>More info </Text>

                  <View style={styles.qr}>
                    <QRCode
                      value={this.state.value}
                      size={250}
                      bgColor="black"
                      fgColor="white"
                    />
                  </View>
                </View>
              ) : (
                <Container>
                  <Content>
                    {this.state.loaded ? (
                      <Button
                        title="Create a card"
                        onPress={this.handleCreateCard}
                      >
                        <Text>Create a Card</Text>
                      </Button>
                    ) : (
                      <Spinner style={{ marginTop: 40 }} color="grey" />
                    )}
                  </Content>
                </Container>
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
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.8
  },
  headerContent: {
    padding: 20,
    alignItems: "center"
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "black",
    marginBottom: 20,
    marginTop: 20
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
    shadowOpacity: 0.8
  },
  name: {
    fontSize: 22,
    color: "#000000",
    fontWeight: "600"
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: "600"
  },
  body: {
    backgroundColor: "white",

    alignItems: "center"
  },
  item: {
    flexDirection: "row"
  },
  infoContent: {
    flex: 1,
    alignItems: "flex-start",
    paddingLeft: 5
  },
  iconContent: {
    flex: 1,
    alignItems: "flex-start",
    paddingRight: 20,
    paddingTop: 20,
    backgroundColor: "#DCDCDC"
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: "black"
  }
});
