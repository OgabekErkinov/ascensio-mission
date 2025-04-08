'use client'; 
import React, { useContext } from 'react';
import { FaCartShopping } from "react-icons/fa6";
import Image from 'next/image';
import './card.css';
import { useRouter } from "next/navigation"; 
import { MyContext } from '@/app/libs/context/MyContext';

const Card = ({ product }) => {
  const { setSelectedProduct, setCarts, carts } = useContext(MyContext);
  const router = useRouter();

  const handleProductClick = (product) => {
    setSelectedProduct(product);  
    router.push(`/products/${product?.slug}`);
  };

  const handleAddCart = (product) => {
    const existing = carts?.find(cart => cart?.product?.id === product?.id);
  
    if (existing) {
      const updatedCarts = carts.map(cart =>
        cart.product.id === product.id
          ? { ...cart, quantity: cart.quantity + 1 }
          : cart
      );
      setCarts(updatedCarts);
    } else {
      setCarts([...carts, { product, quantity: 1 }]);
    }
  };

  const handleRemoveCart = (product) => {
    const existing = carts?.find(cart => cart?.product?.id === product?.id);
  
    if (existing) {
      if (existing.quantity > 1) {
        const updatedCarts = carts.map(cart =>
          cart.product.id === product.id
            ? { ...cart, quantity: cart.quantity - 1 }
            : cart
        );
        setCarts(updatedCarts);
      } else {
        
        setCarts(carts.filter(cart => cart.product.id !== product.id));
      }
    }
  };
  
  


  return (
    <div className='product' onClick={() => handleProductClick(product)}>
      <div className='product_image'>
        <Image src={product?.image} alt={product?.name} height={150} width={200} />
      </div>
      <div className='product_info'>
        <h4>{product?.name}</h4>
        <h6 className='product_name'>COLOR : {product?.properties?.color}</h6>
        <h6 className='product_price'>PRICE : {product?.price}$</h6>
      </div>
      <div className = 'btn-group'>
        <button className = 'btn-action' onClick = {(e) =>{e.stopPropagation(); handleRemoveCart(product)}}>-</button>
      <button 
        className='btn_toCart' 
      >
        <FaCartShopping /> 
        {
          carts?.find(cartProduct => cartProduct?.product?.id === product?.id)?.quantity || 0
        }
      </button>
      <button className = 'btn-action' onClick = {(e) =>{e.stopPropagation(); handleAddCart(product)}}>+</button>
      </div>
    </div>
  );
};

export default Card;
