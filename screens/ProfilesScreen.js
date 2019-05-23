import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView
} from "react-native";
import firebase from "../firebase";
import "firebase/auth";
import "firebase/firestore";
import { Button, Icon } from "native-base";
export default class ProfilesScreen extends Component {
  constructor(props) {
    super(props);
  }
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
          <Icon name="arrow-back" />
          <Text>Back</Text>
        </Button>
      )
    };
  };

  onClickListener = viewId => {
    Alert.alert("Alert", "Button pressed " + viewId);
  };

  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam("itemId", "NO-ID");
    const title = navigation.getParam("title", "some default value");
    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.box}>
            <Image
              style={styles.profileImage}
              source={{
                uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
              }}
            />
            <Text style={styles.name}>{title}</Text>
          </View>
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

            <TouchableHighlight
              style={[styles.button, styles.buttonInstagram]}
              onPress={() => this.onClickListener("instagram")}
            >
              <Icon name="logo-instagram" />
            </TouchableHighlight>

            <TouchableHighlight
              style={[styles.button, styles.buttonTwitter]}
              onPress={() => this.onClickListener("phone")}
            >
              <Icon name="logo-twitter" />
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1
  },
  container: {
    padding: 20
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
  profileImage: {
    width: 300,
    height: 300,
    marginBottom: 20
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
