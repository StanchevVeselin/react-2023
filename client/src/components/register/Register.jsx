import { Link } from "react-router-dom";
import "./register.css" 
import { useContext } from "react";
import AuthContext from "../../context/authData";
import { useForm } from "../../hooks/useForm";

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
                    {/* <StorefrontIcon className="login__logoImage" fontSize="large" /> */}
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
                    // onChange={e => setEmail(e.target.value)} 
                    />

                    <h5>Password</h5>
                    <input 
                    type='password'
                    name="password" 
                    onChange={onChange}
                    value={values.password}  
                    // onChange={e => setPassword(e.target.value)}
                     />

                    <h5>RePassword</h5>
                    <input 
                    type='repassword'
                    name="repassword"
                    onChange={onChange}
                    value={values.repassword} 
                    // onChange={e => setPassword(e.target.value)}
                     />

                    <button 
                    type='submit' 
                    className='login__signInButton' 
                    // onClick={signIn}
                    >Create Account
                    </button>
                </form>

                <p>
                    By signing-in you agree to the eShop Website Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button 
                className='login__registerButton' 
                // onClick={register}
                >Create your eShop Account</button>
            </div>
        </div>
    )
    
}
export default Register;