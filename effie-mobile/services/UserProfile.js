const API_URL = 'http://127.0.0.1:8000'; // This is just a localhost address. It's fine to leave

//Get email and password
export const getAuthInfo = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/auth/credentials`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userId
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const userCredentials = await response.json();

        console.log(userCredentials)        
        return userCredentials;
    } catch (error) {
        console.error('Login Failed:', error.message);
        return null;
    }
};

//check if user password is correct
export const checkPassword = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/auth/check_password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const isCorrect = await response.json();
        return isCorrect;
    } catch (error) {
        console.error('Login Failed:', error.message);
        return null;
    }
};

//update user info
export const updateUserInfo = async (userInfo) => {
    try {
        const response = await fetch(`${API_URL}/auth/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const updatedUser = await response.json();
        return updatedUser;
    } catch (error) {
        console.error('Update Failed:', error.message);
        return null;
    }
};
