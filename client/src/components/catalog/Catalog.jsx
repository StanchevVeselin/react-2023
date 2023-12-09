import Product from "../productCard/Product";
import { useState,useEffect } from "react";
import * as productsService from "../../services/productsService"
import "./Catalog.css"

const Catalog = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        productsService.getAll()
        .then(result => { 
          setProducts(result)
          })
    },[])
    console.log(products);

    return (
        <>
          <h1 className="page-title">All Products</h1>
          <section id="catalog-section" className="product-container">
            {products.slice(0, 3).map((product) => (
              <Product key={product._id} {...product} />
            ))}
          </section>
          <section id="catalog-section" className="product-container">
            {products.slice(3, 6).map((product) => (
              <Product key={product._id} {...product} />
            ))}
          </section>
          <section id="catalog-section" className="product-container">
            {products.slice(6, 9).map((product) => (
              <Product key={product._id} {...product} />
            ))}
          </section>
        </>
      );
    
}

export default Catalog;