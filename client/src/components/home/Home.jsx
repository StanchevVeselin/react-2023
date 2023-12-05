import Product from "../productCard/Product"
import { useState,useEffect } from "react"
import * as productsService from "../../services/productsService"

const Home = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        productsService.getAll()
        .then(result => { 
          setProducts(result)
          })
    },[])

    return (
        <div>
                <div className="home">
                    <div className="container">

                        <img src="https://vision-shop.bg/image/cache/data/bb4008698290b4fb239850ec4b4c49ce-600x600.jpeg"
                        alt="" className="home_image"/>
                        
                        {/* <div className="home_row">
                            <Product />
                            <Product />
                            <Product />
                        </div>

                        <div className="home_row">
                            <Product />
                            <Product />
                            <Product />
                        </div> */}

            <section id="home-section1" className="product-container">
            {/* Първите 5 продукта */}
            {products.slice(0, 3).map((product) => (
              <Product key={product._id} {...product} />
            ))}
          </section>

            <section id="home-section2" className="product-container">
            {/* Следващите 5 продукта */}
            {products.slice(3, 6).map((product) => (
              <Product key={product._id} {...product} />
            ))}
            </section>

                    </div>
                </div>
        </div>
    )
}

export default Home;