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
var db = firebase.firestore();
export default class ContactsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          id: 1,
          name: "Mark Doe",
          position: "CEO",
          image: "https://bootdey.com/img/Content/avatar/avatar7.png"
        },
        {
          id: 1,
          name: "John Doe",
          position: "CTO",
          image: "https://bootdey.com/img/Content/avatar/avatar1.png"
        },
        {
          id: 2,
          name: "Clark Man",
          position: "Creative designer",
          image: "https://bootdey.com/img/Content/avatar/avatar6.png"
        },
        {
          id: 3,
          name: "Jaden Boor",
          position: "Front-end dev",
          image: "https://bootdey.com/img/Content/avatar/avatar5.png"
        },
        {
          id: 4,
          name: "Srick Tree",
          position: "Backend-end dev",
          image: "https://bootdey.com/img/Content/avatar/avatar4.png"
        },
        {
          id: 5,
          name: "John Doe",
          position: "Creative designer",
          image: "https://bootdey.com/img/Content/avatar/avatar3.png"
        },
        {
          id: 6,
          name: "John Doe",
          position: "Manager",
          image: "https://bootdey.com/img/Content/avatar/avatar2.png"
        },
        {
          id: 8,
          name: "John Doe",
          position: "IOS dev",
          image: "https://bootdey.com/img/Content/avatar/avatar1.png"
        },
        {
          id: 9,
          name: "John Doe",
          position: "Web dev",
          image: "https://bootdey.com/img/Content/avatar/avatar4.png"
        },
        {
          id: 9,
          name: "John Doe",
          position: "Analyst",
          image: "https://bootdey.com/img/Content/avatar/avatar7.png"
        }
      ]
    };
  }
  componentDidMount() {
    db.collection("Cards")
      .doc(firebase.auth().currentUser.uid)
      .collection("Contacts")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  }
  clickEventListener(item) {
    this.props.navigation.navigate({
      routeName: "Profiles",
      params: {
        itemId: item.id,
        title: item.name
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header style={{ backgroundColor: "white" }} searchBar rounded>
          <Item>
            <Icon style={{ color: "#2A363b" }} name="ios-search" />
            <Input style={{ color: "#2A363b" }} placeholder="Search" />
            <Icon style={{ color: "#E84A5f" }} name="ios-people" />
          </Item>
          <Button transparent>
            <Text style={{ color: "#2A363b" }}>Search</Text>
          </Button>
        </Header>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.state.data}
          horizontal={false}
          numColumns={2}
          keyExtractor={item => {
            return item.id;
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
                  <Image
                    style={styles.icon}
                    source={{
                      uri:
                        "https://img.icons8.com/flat_round/64/000000/hearts.png"
                    }}
                  />
                </View>
                <Image style={styles.userImage} source={{ uri: item.image }} />
                <View style={styles.cardFooter}>
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.position}>{item.position}</Text>
                    <TouchableOpacity
                      style={styles.followButton}
                      onPress={() => this.clickEventListener(item)}
                    >
                      <Text style={styles.followButtonText}>Contact</Text>
                      <Icon style={{ color: "white" }} name="add" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: "#2A363b"
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
    shadowOpacity: 0.5,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 5,
    backgroundColor: "white",
    flexBasis: "46%",
    marginHorizontal: 5
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
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1
  },
  userImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
    alignSelf: "center",
    borderColor: "#DCDCDC",
    borderWidth: 3
  },
  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: "center",
    color: "#008080",
    fontWeight: "bold"
  },
  position: {
    fontSize: 14,
    flex: 1,
    alignSelf: "center",
    color: "#696969"
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
  },
  icon: {
    height: 20,
    width: 20
  }
});
