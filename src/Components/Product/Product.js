import React from 'react'
import "./product.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Product = (props) => {

  const { img, ratings, shipping, price, seller, name, stock, id } = props.productData;

  return (
    <div className="card-container">
      <div className="product_image">
        <img src={img} alt="" />
      </div>
      <div className="product-details">
        <h3><Link to={'/product/' + id}>{name}</Link></h3>
        <p>Brand Name :{seller}</p>
        <p>rating :{ratings}</p>
        <p>shipping cost :{shipping}</p>
        <p>available :{stock}</p>
        <p className='price'>price :${price}<span></span></p>
      </div>
      <div className="buy_now_btn">
        {props.isAddToCart === true && <button onClick={() => { props.addproduct(props.productData) }}>
          Add to Cart<FontAwesomeIcon className='cart' icon={faCartShopping} />
        </button>}
      </div>
    </div>
  )
}

export default Product