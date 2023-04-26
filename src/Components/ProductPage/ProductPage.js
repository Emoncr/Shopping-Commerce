import React from 'react'
import { useParams } from 'react-router-dom'
import fakeData from "../../fakeData/products.json"
import Product from '../Product/Product';

const ProductPage = () => {
  const params = useParams();
  const productID= params.id;
  const data = fakeData;
  const product = data.find(item=>{ const value = item.id===productID; return value})

  
  return (
<div>
  <Product isAddToCart={false} productData={product}></Product>
</div>
  )
}

export default ProductPage