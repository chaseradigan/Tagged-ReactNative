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
import { Ionicons } from "@expo/vector-icons";
import { Button } from "native-base";
export default class ProfilesScreen extends Component {
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
  onClickListener = viewId => {
    Alert.alert("Alert", "Button pressed " + viewId);
  };

  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam("itemId", "NO-ID");
    const title = navigation.getParam("title", "some default value");
    console.log(this.props);
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
              <Image
                style={styles.icon}
                source={{
                  uri: "https://png.icons8.com/message/win8/100/ffffff"
                }}
              />
            </TouchableHighlight>

            <TouchableHighlight
              style={[styles.button, styles.buttonLike]}
              onPress={() => this.onClickListener("like")}
            >
              <Image
                style={styles.icon}
                source={{
                  uri: "https://png.icons8.com/facebook-like/win10/100/ffffff"
                }}
              />
            </TouchableHighlight>

            <TouchableHighlight
              style={[styles.button, styles.buttonLove]}
              onPress={() => this.onClickListener("love")}
            >
              <Image
                style={styles.icon}
                source={{
                  uri: "https://png.icons8.com/heart/androidL/100/ffffff"
                }}
              />
            </TouchableHighlight>

            <TouchableHighlight
              style={[styles.button, styles.buttonCall]}
              onPress={() => this.onClickListener("phone")}
            >
              <Image
                style={styles.icon}
                source={{ uri: "https://png.icons8.com/phone/win8/100/ffffff" }}
              />
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
    marginTop: 20
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
    backgroundColor: "#00BFFF"
  },
  buttonLike: {
    backgroundColor: "#228B22"
  },
  buttonLove: {
    backgroundColor: "#FF1493"
  },
  buttonCall: {
    backgroundColor: "#40E0D0"
  },
  icon: {
    width: 35,
    height: 35
  }
});
