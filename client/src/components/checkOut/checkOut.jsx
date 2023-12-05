import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

const CheckOut = () => {

  return (
    <div>
      <h2>Checkout</h2>
      <ul>
        
          <li >
            <p>aaa</p>
            <p>asdasd</p>
          </li>
    
      </ul>
      <Link to="/checkout" className="checkout-button">Checkout</Link>
    </div>
  );
};

export default CheckOut;