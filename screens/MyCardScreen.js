import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";

import QRCode from "react-native-qrcode";
import firebase from "../firebase";
import "firebase/auth";
import "firebase/firestore";
var db = firebase.firestore();
export default class HomeScreen extends React.Component {
  state = {
    exists: false,
    loaded: false,
    value: {
      name: "",
      url: ""
    }
  };
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Card",
      headerRight: (
        <Button
          title="Edit"
          onPress={() => {
            navigation.navigate("Settings");
          }}
        />
      )
    };
  };
  componentDidMount() {
    var docRef = db.collection("Cards").doc(firebase.auth().currentUser.uid);
    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({
            value: {
              name: doc.data().name,
              url: doc.data().url
            },
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
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              style={styles.avatar}
              source={{
                uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
              }}
            />

            <Text style={styles.name}>John Doe </Text>
            <Text style={styles.userInfo}>jhonnydoe@mal.com </Text>
            <Text style={styles.userInfo}>Florida </Text>
            <View style={styles.qr}>
              <QRCode
                value={this.state.value}
                size={250}
                bgColor="black"
                fgColor="white"
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 0,
    backgroundColor: "#DCDCDC"
  },
  headerContent: {
    padding: 30,
    alignItems: "center"
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 20,
    marginTop: 20
  },
  qr: {
    padding: 30,
    paddingBottom: 60
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
