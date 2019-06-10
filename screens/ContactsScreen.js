import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList
} from "react-native";
import firebase from "../firebase";
import "firebase/auth";
import { Container, Header, Item, Input, Icon, Button } from "native-base";
import { RefreshControl } from "react-native";
var db = firebase.firestore();
export default class ContactsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      data2: [],
      data: [
        {
          userID: "1",
          name: "Mark Doe",
          position: "CEO",
          image: "https://bootdey.com/img/Content/avatar/avatar7.png"
        },
        {
          userID: "1",
          name: "John Doe",
          position: "CTO",
          image: "https://bootdey.com/img/Content/avatar/avatar1.png"
        },
        {
          userID: "2",
          name: "Clark Man",
          position: "Creative designer",
          image: "https://bootdey.com/img/Content/avatar/avatar6.png"
        },
        {
          userID: "3",
          name: "Jaden Boor",
          position: "Front-end dev",
          image: "https://bootdey.com/img/Content/avatar/avatar5.png"
        },
        {
          userID: "4",
          name: "Srick Tree",
          position: "Backend-end dev",
          image: "https://bootdey.com/img/Content/avatar/avatar4.png"
        },
        {
          userID: "5",
          name: "John Doe",
          position: "Creative designer",
          image: "https://bootdey.com/img/Content/avatar/avatar3.png"
        },
        {
          userID: "6",
          name: "John Doe",
          position: "Manager",
          image: "https://bootdey.com/img/Content/avatar/avatar2.png"
        },
        {
          userID: "8",
          name: "John Doe",
          position: "IOS dev",
          image: "https://bootdey.com/img/Content/avatar/avatar1.png"
        },
        {
          userID: "9",
          name: "John Doe",
          position: "Web dev",
          image: "https://bootdey.com/img/Content/avatar/avatar4.png"
        }
      ],
      displayData: [],
      displayData2: []
    };
  }
  getUsersContacts = () => {
    let contacts = [];
    db.collection("Cards")
      .doc(firebase.auth().currentUser.uid)
      .collection("Contacts")
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          console.log("doc.data =>", doc.data());
          contacts.push(doc.data());
          this.state.data2.push(doc.data());
          this.state.displayData2.push(doc.data());
          console.log("contacts =>", contacts);
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  };
  componentDidMount() {
    this.getUsersContacts();
    this.setState({ displayData: this.state.data });
  }
  clickEventListener(item) {
    this.props.navigation.navigate({
      routeName: "Profiles",
      params: {
        itemId: item.userID,
        title: item.name
      }
    });
  }
  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.getUsersContacts();
    this.setState({ refreshing: false });
  };
  handleSearch = text => {
    if (this.state.data2.length > 0) {
      const newData = this.state.data2.filter(function(item) {
        const textData = text.toUpperCase();
        const itemData = item.name.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({ data2: newData });
    } else {
      const newData = this.state.data.filter(function(item) {
        const textData = text.toUpperCase();
        const itemData = item.name.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({ displayData: newData });
    }
  };
  //https://docs.expo.io/versions/v32.0.0/react-native/refreshcontrol/ refresh control
  render() {
    return (
      <Container style={{ backgroundColor: "white" }}>
        <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled">
          <Header style={{ height: 70 }} noShadow searchBar rounded transparent>
            <Item style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
              <Icon style={{ color: "#ff2f56" }} name="ios-search" />
              <Input
                onChangeText={text => this.handleSearch(text)}
                style={{ color: "#2a363b" }}
                placeholder="Search"
              />
              <Icon style={{ color: "#2a363b" }} name="ios-people" />
            </Item>
            <Button transparent>
              <Text style={{ color: "#2a363b" }}>Search</Text>
            </Button>
          </Header>
        </ScrollView>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
              tintColor="#ff2f56"
              indicatorStyle="#ff2f56"
              bounces={true}
            />
          }
        >
          {this.state.data2.length < 1 ? (
            <FlatList
              style={styles.list}
              contentContainerStyle={styles.listContainer}
              data={this.state.displayData}
              horizontal={false}
              numColumns={2}
              keyExtractor={item => {
                return item.userID;
              }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() => {
                      this.clickEventListener(item);
                    }}
                  >
                    <View style={styles.cardHeader}>
                      <Icon style={{ color: "#2A363B" }} name="more" />
                    </View>
                    <Image
                      style={styles.userImage}
                      source={{ uri: item.image }}
                    />
                    <View style={styles.cardFooter}>
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.position}>{item.position}</Text>
                        <TouchableOpacity
                          style={styles.followButton}
                          onPress={() => this.clickEventListener(item)}
                        >
                          <Icon style={{ color: "white" }} name="add" />
                          <Text style={styles.followButtonText}>Contact</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <FlatList
              style={styles.list}
              contentContainerStyle={styles.listContainer}
              data={this.state.displayData2}
              horizontal={false}
              numColumns={2}
              keyExtractor={item => {
                return item.userID;
              }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() => {
                      this.clickEventListener(item);
                    }}
                  >
                    <View style={styles.cardHeader}>
                      <Icon style={{ color: "#2A363B" }} name="more" />
                    </View>
                    <View style={styles.cardFooter}>
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.position}>{item.url}</Text>
                        <TouchableOpacity
                          style={styles.followButton}
                          onPress={() => this.clickEventListener(item)}
                        >
                          <Icon style={{ color: "white" }} name="add" />
                          <Text style={styles.followButtonText}>Contact</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  list: {
    paddingTop: 5,
    paddingHorizontal: 5,
    backgroundColor: "white"
  },
  listContainer: {
    alignItems: "center"
  },
  /******** card **************/
  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 12,
    borderRadius: 15,
    marginVertical: 5,
    backgroundColor: "rgb(242,242,247)",
    flexBasis: "46%",
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)"
  },
  cardFooter: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 15,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1
  },
  userImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
    alignSelf: "center",
    borderColor: "#2A363B",
    borderWidth: 2
  },
  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: "center",
    color: "#2A363B",
    fontWeight: "bold"
  },
  position: {
    fontSize: 14,
    flex: 1,
    alignSelf: "center",
    color: "#2A363B"
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#00BFFF"
  },
  followButtonText: {
    color: "#FFFFFF",
    fontSize: 20
  }
});
