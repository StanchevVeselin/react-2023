import { createContext, useState } from "react";
import * as userService from "../services/userService"
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const navigate = useNavigate()
    const [auth,setAuth] = useState(() => {
      localStorage.removeItem("accessToken")
      return {};
    })

    const loginHandler = async (values) => {
    try {
      const result = await userService.login(values.email, values.password);
  
      if (result.error) {
        alert(result.error);
      } else {
        setAuth(result);
        localStorage.setItem("accessToken", result.accessToken);
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
    }

    const registerHandler = async (values) => {
      try {
        const result = await userService.register(values.email, values.password, values.repassword);
        
        if (result.error) {
          alert(result.error);
        } else {
          setAuth(result);
          localStorage.setItem("accessToken", result.accessToken);
          navigate("/");
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
     }

     const logoutHandler = () => {
      setAuth({})
      localStorage.removeItem("accessToken")
     }


    const values = {
      loginHandler,
      registerHandler,
      logoutHandler,
      username: auth.username || auth.email,
      email: auth.email,
      userId: auth._id,
      isAuthenticated: !!auth.accessToken
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;