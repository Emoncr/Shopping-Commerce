import React, { useEffect, useState } from 'react'
import "./shop.css"
import fakeData from "../../fakeData/products.json"
import Product from '../Product/Product';
import Cart from "../Cart/Cart"
import { Link, NavLink } from 'react-router-dom';
import { addToDb } from '../../utilities/fakedb';


const Shop = () => {
  const dt10 = fakeData.slice(0, 10);
  const [products, setProduct] = useState(dt10);
  const [cart, setCart] = useState([]);


  //=======PRODUCT ADDED FUNCTION=======//
  products.map(product=>product.quantity = 1)
  useEffect(() => {
    const storedItems = localStorage.getItem("shopping-cart");
    if (storedItems) {
      const parseItem = JSON.parse(storedItems);
      const storedItemKeys = Object.keys(parseItem);
      const storedProducts = storedItemKeys.map((key) =>
        products.find((product) => product.id === key)
      );
      storedItemKeys.map(key => {
        products.find(product => {
          if (key === product.id) {
            product.quantity = parseItem[key]
          }
        })
      })
      setCart(storedProducts);
    }
  }, []);


  const addProduct = (clickedProduct) => {
    setCart([...cart, clickedProduct]);
    addToDb(clickedProduct.id);
  };

  return (
    <div className="shop-container">
      <div className="product-container">
        {
          products.map(product => <Product
            key={product.id}
            isAddToCart={true}
            productData={product}
            addproduct={addProduct}>
          </Product>)
        }
      </div>
      <div className='cart-container'>
        <Cart cart={cart} >
          <NavLink to="/review"><button type="button" className="btn btn-success mt-4">Order Review</button></NavLink>
        </Cart>
      </div>
    </div>
  )
}

export default Shop