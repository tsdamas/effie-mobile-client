const API_URL = 'http://127.0.0.1:8000'; // This is just a localhost address. It's fine to leave



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
  
      const userData = await response.json();
      
      return userData;
    } catch (error) {
      console.error('Login Failed:', error.message);
      return null;
    }
  };

export const registerUser = async (fname, lName, email, password) => {
  try {
      const response = await fetch(`${API_URL}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ first_name: fname, last_name: lName, email: email, password: password, auth_method:"email_password" }),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
          throw new Error(data.detail || "Registration failed");
      }

      return data;
  } catch (error) {
      console.error("Error:", error.message);
      return false;
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