import "./product.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { useCart } from "../../context/cartContext";

const Product = ({_id,title,price,description}) => {
    const {addToCart} = useCart()

    const addToCartHandle = () => {
      addToCart({_id,title,price,description})
    }
    return (
        <Card style={{ width: '18rem' }} className="product">
        <Card.Img variant="top" src="https://vision-shop.bg/image/cache/data/photo_2020-03-22_01-36-11-600x600.jpg" 
        className="product_img"/>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
          {description}
          </Card.Text>
          <p className="product__price">${price}</p>
          <div className="product__rating"></div>
          {/* <Button variant="primary">Add to card</Button> */}
          <Link 
          // to={`/add-to-cart/${_id}` } 
          to="#"
          onClick={addToCartHandle} 
          className="add-to-cart-button">
            Add to Cart
          </Link>
          {/* <Button variant="primary">Details</Button> */}
          <Link to={`/products/${_id}`} className="details-button" >Details</Link>
        </Card.Body>
        </Card>
    )
}

export default Product;