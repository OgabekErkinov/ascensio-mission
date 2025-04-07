'use client'
import { useEffect, useState } from 'react'

import './products.css'


const ProductsPage = () => {
  const [products, setProducts] = useState([])
    useEffect(() => {
      fetch('/products.json').then((response) => response.json())
                             .then((data) => setProducts(data));
    },[])
  return (
    <div className = 'container' >
      <h2 className = 'title'>Our Products</h2>
      <div className = 'products_container'>

      </div>
      
    </div>
  )
}

export default ProductsPage
