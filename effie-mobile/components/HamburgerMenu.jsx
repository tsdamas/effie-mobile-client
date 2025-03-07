import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from './HamburgerMenuStyles';

const HamburgerMenu = ({ navigation }) => {
  return (
    <TouchableOpacity 
      onPress={() => navigation.toggleDrawer()} 
      style={styles.menuButton}
    >
      <Ionicons name="menu" size={28} color="black" />
    </TouchableOpacity>
  );
};

export default HamburgerMenu;
