import React from 'react'
import { Link,NavLink } from 'react-router-dom';
import "./cart.css"
const cart = (props) => {
    const cart = props.cart;
    const totalPrice = cart.reduce((total, pd)=>{return((total + pd.price) * pd.quantity )},0)

    let shipping = 0;
        if(totalPrice > 200){
            shipping = 30
        }
        if(totalPrice > 300){
            shipping = 0
        }
        let tax = totalPrice * (1/100)

        let grandTotal = totalPrice + shipping + tax;
  return (   
    <div>
        <h2 className='cart_heading'>Order Summary</h2>
        <div className="cart_details">
            <p>Selected Items: {cart.length}</p>
            <p>product Price: ${totalPrice}</p>
            <p>Shipping Charge: ${shipping}</p>
            <p>Tax/ VAT: ${tax}</p>
            <h2>Grand Total: <strong>${grandTotal}</strong></h2>
            {
                props.children
            }
        </div>
    </div>
  )
}

export default cart