import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HamburgerMenu = ({ navigation }) => {
  return (
    <TouchableOpacity 
      onPress={() => navigation.toggleDrawer()} 
      style={{ marginLeft: 15 }}
    >
      <Ionicons name="menu" size={28} color="black" />
    </TouchableOpacity>
  );
};

export default HamburgerMenu;
