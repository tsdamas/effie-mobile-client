import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: "100%", 
    marginBottom: 16,            // Adds spacing between input fields
  },

  label: {
    fontSize: 16,              
    fontWeight: "bold", 
    marginBottom: 6,            // Adds space between the label and input field
    color: "#333",              // Dark grey color for the label text
  },

  input: {
    height: 50, 
    borderWidth: 1, 
    borderColor: "#ccc",        // Light grey border color
    borderRadius: 8,            // Rounded corners for the input field
    paddingHorizontal: 12, 
    fontSize: 16, 
    backgroundColor: "#fff",     // White background color for the input field
    width: "100%",              // Makes sure the input field stretches across full width
    alignSelf: "stretch",      // Ensures the input field stretches according to parent container
  }
});

export default styles;
