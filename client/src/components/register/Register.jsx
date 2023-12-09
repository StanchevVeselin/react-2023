import { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../context/authData";
import { useForm } from "../../hooks/useForm";

import "./register.css" 

const Register = () => {
    const {registerHandler} = useContext(AuthContext)
    const {values,onChange,onSubmit} = useForm(registerHandler, {
        email: "",
        password: "",
        repassword: "",
    })



    return (
        <div className='register'> 
            <Link to='/register'
             style={{ textDecoration: "none" }}>
                <div className="login__logo">
                    <h2 className="login__logoTitle">eSHOP</h2>
                </div>
            </Link>

            <div className='login__container'>
                <h1>Create Account</h1>

                <form id="register-form" onSubmit={onSubmit}>
                    <h5>E-mail</h5>
                    <input 
                    type='text'
                    name="email" 
                    onChange={onChange}
                    value={values.email} 
                    />

                    <h5>Password</h5>
                    <input 
                    type='password'
                    name="password" 
                    onChange={onChange}
                    value={values.password}  
                     />

                    <h5>RePassword</h5>
                    <input 
                    type='password'
                    name="repassword"
                    onChange={onChange}
                    value={values.repassword} 
                     />

                    <button 
                    type='submit' 
                    className='login__signInButton' 
                    >Create Account
                    </button>
                </form>

                <p>
                    By signing-in you agree to the eShop Website Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

               
            </div>
        </div>
    )
    
}
export default Register;