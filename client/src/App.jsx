import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import Header from './components/header/Header';
import Home from './components/home/Home';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Catalog from './components/catalog/Catalog';
import Details from "./components/Details/Details";
import AddToCard from "./components/addToCard/AddToCard";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import {AuthProvider} from "./context/authData";
import { CartProvider } from "./context/cartContext";
import Logout from "./components/logout/Logout";
import AuthGuard from "./components/guards/AuthGuard";
// import EditCommentModal from "./components/editComments/EditComment";



function App() {


  return (

    <AuthProvider>
      <CartProvider>
    <section id='project-2023'>
      <Header />


    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/catalog' element={<Catalog/>}/>
      <Route path="/products/:productId" element={<Details/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="/comments/:commentId" element={<EditCommentModal/>}/> */}

      <Route element={<AuthGuard/>}> 
            <Route path="/add-to-card/:productId" element={ <AddToCard/>}/>
            <Route path="/logout" element={<Logout />} />
      </Route>

    </Routes>

    </section>
    </CartProvider>
    </AuthProvider>
  )
}

export default App
