import React, { useEffect, useState } from 'react'
import fakeData from '../../fakeData/products.json'
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from "../Cart/Cart"
import "./review.css"
import { deleteShoppingCart } from '../../utilities/fakedb';
import happyimage from "../../images/giphy.gif"





const Review = () => {
  const [reviewCart, setReviewCart] = useState([]);
  const [placed, setPlacedOrder] = useState(false);


  //get data from localStorage
  useEffect(() => {
    const cartItems = localStorage.getItem("shopping-cart")
    let parseItem = JSON.parse(cartItems)
    if (parseItem === null) {
      parseItem = {};
    }
    setReviewCart(parseItem)
  }, [])
  const productKyes = Object.keys(reviewCart)
  const products = productKyes.map(pdkey => {
    const matchPd = fakeData.find((allPd) => allPd.id === pdkey)
    matchPd.quantity = reviewCart[pdkey]
    return matchPd

  })

  const placedOrder = () => {
    deleteShoppingCart()
    setPlacedOrder(true)
    setReviewCart([])
  }
  
  let productItem;
  let noProductBtn;
  let thankYou;

  if (placed) {
    thankYou = <img src={happyimage} />
    noProductBtn = ""
  }
  if (productKyes.length === 0 && placed === false) {
    productItem = <div><h1>No Product is added on cart...!!!</h1></div>
    noProductBtn = <button className="btn btn-danger mt-4">Add Your Product Frist</button>
  }
  else {
    noProductBtn = <button onClick={placedOrder} className="btn btn-success mt-4">Place Order</button>
  }


  return (
    <div className="custom_card_container shop-container">
      <div className='product-container'>
        {
          products.map(product => <ReviewItem itemSetFunction={setReviewCart} cartPds={reviewCart} key={product.id} product={product} />)
        }
        {thankYou}
        {productItem}
      </div>

      <div className='cart-container'>
        <Cart cart={products}>
          {noProductBtn}
        </Cart> :

      </div>
    </div>
  )
}

export default Review