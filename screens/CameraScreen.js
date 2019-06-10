import React from "react";
import firebase from "../firebase";
import "firebase/firestore";
import "firebase/auth";
import { Text, View, StyleSheet, Button } from "react-native";
import { Constants, Permissions, BarCodeScanner } from "expo";
import {
  Container,
  Content,
  Spinner,
  Header,
  Right,
  Left,
  Body,
  Title
} from "native-base";
import { Contacts } from "expo";
var db = firebase.firestore();
export default class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    hasCameraPermission: null,
    scanned: false
  };
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return (
        <Container>
          <Content>
            <Spinner color="grey" />
          </Content>
        </Container>
      );
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <Container>
        <View
          style={{
            flex: 1,
            marginTop: 0
          }}
        >
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />

          {scanned && (
            <Button
              title={"Tap to Scan Again"}
              onPress={() => this.setState({ scanned: false })}
            />
          )}
        </View>
      </Container>
    );
  }

  asynchandleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    var cardsRef = db.collection("Cards");
    cardsRef
      .doc(firebase.auth().currentUser.uid)
      .collection("Contacts")
      .doc(data.userID)
      .set({
        userID: data.userID,
        name: data.name,
        url: this.state.url,
        date: new Date(),
        insta: data.insta,
        linkedin: data.linkedin,
        twitter: data.twitter
        // image: this.state.image use userid instead in contacts
      })
      .then(response => {
        alert(
          `Bar code with type ${type} and data ${data} has been scanned and saved!`
        );
      })
      .catch(function(error) {
        alert("Bar code not scanned!");
        console.error("Error adding document: ", error);
      });
    const contact = {
      [Contacts.Fields.FirstName]: `${data.name}`,
      [Contacts.Fields.PhoneNumbers]: [{ number: data.url, label: "mobile" }]
    };
    addContact(contact);
  };
}
async function addContact(contact) {
  const contactId = await Contacts.addContactAsync(contact)
    .then(response => {
      alert("Added contact to your phone!");
      console.log(response);
    })
    .catch(function(error) {
      alert("Failed to add contact");
      console.log(error);
    });
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
