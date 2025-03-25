import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Colors } from "./colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  titleContainer: {
    padding: hp(2),
    alignItems: "center",
  },

  drawerTitle: {
    fontSize: hp(3.5),
    fontWeight: "bold",
    color: Colors.primaryPurple,
  },

  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(4),
    marginBottom: hp(1.5),
  },

  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    height: hp(6),
    paddingHorizontal: wp(3),
  },

  searchText: {
    marginLeft: wp(2),
    color: Colors.darkGray,
    fontSize: hp(2),
  },

  newChatButton: {
    marginLeft: wp(2),
    height: hp(6), 
    width: hp(6),  
    backgroundColor: Colors.primaryPurple,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  chatList: {
    marginTop: hp(1),
    paddingHorizontal: wp(5),
    paddingBottom: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  sectionTitle: {
    fontSize: hp(2.2),
    fontWeight: "bold",
    marginBottom: hp(1),
    color: Colors.darkGray,
  },

  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    color: Colors.darkGray,
  },

  avatar: {
    width: hp(5),
    height: hp(5),
    borderRadius: hp(2.5),
    marginRight: wp(2),
  },

  userNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  userName: {
    fontSize: hp(2.1),
    fontWeight: "bold",
    color: Colors.darkGray,
    marginRight: wp(2),
  },
  
  settingsButton: {
    paddingHorizontal: wp(2),
  },
  menuItem: {
    flexDirection: 'row', // Ensure the items are aligned horizontally
    alignItems: 'center', // Align items vertically centered
    paddingVertical: hp(1),
  },

  logoutButton: {
    marginTop: hp(2),
    marginHorizontal: wp(5),
    backgroundColor: Colors.primaryPurple,
    borderRadius: 16,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default styles;