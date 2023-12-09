import * as request from "../library/request"

const baseUrl = "http://localhost:3030/users"

const isValidEmail = (email) => {
    // Регулярен израз за проверка на валидност на имейл
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

export const login = async (email, password) => {
    if (!email || !password) {
      console.error("Email and password are required.");
      return { error: "Email and password are required." };
    }
  
    try {
      const result = await request.post(`${baseUrl}/login`, {
        email,
        password,
      });
  
      return result;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };


export const register = async (email, password, repassword) => {
    if (!email || !password || !repassword) {
      console.error("Email, password, and repassword are required.");
      return { error: "Email, password, and repassword are required." };
    }

    if (!isValidEmail(email)) {
        console.error("Invalid email address.");
        return { error: "Invalid email address." };
    }
  
    if (password !== repassword) {
      console.error("Passwords do not match.");
      return { error: "Passwords do not match." };
    }
  
    try {
      const result = await request.post(`${baseUrl}/register`, {
        email,
        password,
      });
  
      return result;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  };
  

export const logout = () => request.get(`${baseUrl}/logout`)
