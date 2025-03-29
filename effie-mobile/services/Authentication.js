const API_URL = 'http://10.0.2.2:8000'; // This is just a localhost address. It's fine to leave


export const regularLogin = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Login Successful! Token:', data.session_id);
  
      // Store token in AsyncStorage (optional)
      // await AsyncStorage.setItem('authToken', data.access_token);
      // await AsyncStorage.setItem('refreshToken', data.refresh_token);
  
      return data.session_id;
    } catch (error) {
      console.error('Login Failed:', error.message);
      return null;
    }
  };


export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Health Check:', data);
  } catch (error) {
    console.error('Health Check Failed:', error.message);
  }
};