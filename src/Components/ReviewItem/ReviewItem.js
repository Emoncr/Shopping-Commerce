import React from 'react'
import './reviewitem.css'
const ReviewItem = (props) => {

    const { id, img, name, seller, quantity } = props.product;
    const setItemFunction = props.itemSetFunction;
    //reviwe item removed function
    const removeFromDb = id => {
        let shoppingCart = JSON.parse(localStorage.getItem('shopping-cart')) || {};
        if (id in shoppingCart) {
            if (shoppingCart[id] > 1) {
                const newValue = shoppingCart[id] - 1;
                shoppingCart[id] = newValue;
                localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
            } else {
                delete shoppingCart[id];
                localStorage.removeItem(id);
                localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
            }
        }
        setItemFunction(shoppingCart)
    }

    return (
        <div className="card">
            <img src={img} alt="" />
            <div className="card-content">
                <h2>{name}</h2>
                <p>Seller: {seller}</p>
                <p>Quantity: {quantity}</p>
                <button onClick={() => {removeFromDb(id) }} className='btn btn-danger'>Remove Item</button>
            </div>
        </div>
    )
}

export default ReviewItem