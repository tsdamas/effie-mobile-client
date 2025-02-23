import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface HamburgerMenuProps {
  navigation: any;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginLeft: 15 }}>
      <Ionicons name="menu" size={28} color="black" />
    </TouchableOpacity>
  );
};

export default HamburgerMenu;
