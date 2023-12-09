import { useNavigate } from "react-router-dom";
import * as request from "../library/request"
const baseUrl = "http://localhost:3030/users"


const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

export const login = async (email, password) => {
    if (!email || !password) {
        alert("All fields are required.");  
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
        alert("All fields are required.");
        console.error("Email, password, and repassword are required.");
        return { error: "Email, password, and repassword are required." };
    }

    if (!isValidEmail(email)) {
        alert("Invalid email address.");
        console.error("Invalid email address.");
        return { error: "Invalid email address." };
    }
  
    if (password !== repassword) {
        alert("Passwords do not match.");
        console.error("Passwords do not match.");
        return { error: "Passwords do not match." };
    }
  
    try {
      const result = await request.post(`${baseUrl}/register`, {
        email,
        password,
      });

      if (result.error) {
        alert(result.error);
        // Останете на текущата страница при грешка
      } else {
        // Навигирайте към друга страница при успешна регистрация
      }
  
      return result;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  };
  

export const logout = () => request.get(`${baseUrl}/logout`)
