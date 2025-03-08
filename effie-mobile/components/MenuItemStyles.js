import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  menu_item: {
    flexDirection: "row",        // Aligns the icon and text horizontally
    alignItems: "center",       // Vertically centers the items
    paddingVertical: 10,       // Adds vertical padding for spacing
  },

  textContainer: {
    flexShrink: 1,             // Allows shrinking if needed
    flexGrow: 1,              // Allows expansion if needed
    marginLeft: 10,          // Adds space between the icon and the text
  },
  
  text_label: {
    fontSize: 14,     
    color: "#000",         // Text color set to black
  },
});

export default styles;