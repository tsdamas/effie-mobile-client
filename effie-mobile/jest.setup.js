jest.mock('expo-router', () => ({
    useRouter: jest.fn(() => ({ push: jest.fn() })),
  }));
  
  jest.mock('expo-secure-store', () => ({
    setItemAsync: jest.fn(),
  }));
  
  jest.mock('@expo/vector-icons', () => {
    const { View } = require('react-native');
    return {
      Ionicons: View,  // Mock Ionicons
      MaterialIcons: View,  // Mock MaterialIcons if used
    };
  });
  