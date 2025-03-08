import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titleContainer: {
    padding: 15,
    alignItems: "center",
  },

  drawerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },

  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 10,
  },

  searchText: {
    marginLeft: 10,
    color: "#999",
    fontSize: 16,
  },

  newChatButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },

  chatList: {
    marginTop: 10,
    paddingHorizontal: 15,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },

  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

  userNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  userName: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  
  settingsButton: {
    padding: 5,
  },
});

export default styles;