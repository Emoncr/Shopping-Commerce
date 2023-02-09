import React, { useState } from 'react'
import "./shop.css"
import fakeData from "../../fakeData/products.json"
import Product from '../Product/Product';
import Cart from "../Cart/Cart"


const Shop = () => {
  const dt10 = fakeData.slice(0,5);
  const[products, setProduct] = useState(dt10);
  const [cart , setCart]=useState([]);
  const addProduct = (clickedProduct)=>{
    const newCart = [...cart, clickedProduct];
    setCart(newCart)
  }

  return (
    <div className="shop-container">
        <div className="product-container">
            {
              products.map(product=><Product 
                  productData={product}
                  addproduct = {addProduct}>
                  </Product>)
            }
        </div>
        <div className='cart-container'>
          <Cart cart={cart} ></Cart>
        </div>
    </div>
  )
}

export default Shop