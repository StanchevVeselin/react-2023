import { useContext } from "react";
import "./header.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import AuthContext from "../../context/authData";
import {useCart} from "../../context/cartContext"

const Header = () => {
  const{username,isAuthenticated} = useContext(AuthContext)
  const {getCartItemCount} = useCart()
    return (
      <div className="hero_area">
        

<Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container className="header__navbar">
        <Link to="/" className="home-link">
             Home page
            <i className="bi bi-windows"></i>
        </Link> 
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link to="/about" className="about-link">About</Link>
            <Link to="/catalog" className="catalog-link">Catalog</Link>
            <Link to="/blog" className="blog-link">Blog</Link>

          </Nav>
          <Nav className="ml-auto">
          {!isAuthenticated && (
            <div id="guest">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
            </div>
          )}
            {isAuthenticated && (
            <div id="user">
              <Link to="/logout">Logout</Link>
              <span>{username}</span>
            </div>
            )}

            <Link 
                    to="/add-to-card"
                    className="nav-basket-count"
                    >
                        <i className="bi bi-cart-fill" >{getCartItemCount()}</i>
                        Basket
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  
    </div>
    )
}

export default Header