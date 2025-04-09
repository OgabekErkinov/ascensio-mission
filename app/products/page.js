'use client'

import { useState, useContext } from 'react'
import './products.css'
import Head from 'next/head';
import Card from '../products/components/Card';
import { FaCartShopping } from 'react-icons/fa6';
import { MyContext } from '../libs/context/MyContext';
import { useRouter } from 'next/navigation';


const ProductsPage = () => {
  const router = useRouter()
  const { carts, products, inputValue, setInputValue } = useContext(MyContext)

  const [productCount, setProductCount] = useState(10)
  const filtredProducts = products?.filter((product) =>
    product?.name?.toLowerCase().includes(inputValue?.toLowerCase())
  );

  const handleClick = () => {
       if(filtredProducts?.length - 3 >= productCount){
        setProductCount(prev => prev + 3)
       }else{
          setProductCount(prev => prev + filtredProducts?.length)
        
       }
  }


  return (
    <div className='container'>
      <Head>
        <title>Our Products</title>
      </Head>
      <div className = 'header'>
         <h2 className='title'>Our Products</h2>
         <input placeholder = 'product name' className = 'search-input' 
                value = {inputValue} 
                onChange = {(e) => setInputValue(e.target.value)}/>
         <div className = 'cartIcon' onClick = {() => router.push('/carts')}>
           <FaCartShopping color='black'/>
           {carts?.length > 0 && <span> {carts?.length}</span> }
         </div>

      </div>
      
      <div className='products_container'>
        {
          filtredProducts?.slice(0, productCount)?.map((product) => {
            return (
              <Card product={product} key = {product?.id}/>
            );
          })
        }
      </div>
      {
        filtredProducts?.length > productCount && 
        <button className = 'add-button' onClick = {handleClick}>more</button>
      }
    </div>
  );
}

export default ProductsPage;
