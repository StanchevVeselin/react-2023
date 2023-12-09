import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as userService from "../../services/userService"
import AuthContext from "../../context/authData";


const Logout = () => {
    const navigate = useNavigate()
    const{logoutHandler} = useContext(AuthContext)
    useEffect(() => {
        userService.logout()
            .then(() => {
                logoutHandler()
                navigate("/")    
            })
        .catch(() => {
            logoutHandler()

            navigate("/login")}
            )
    },[])
}

export default Logout;