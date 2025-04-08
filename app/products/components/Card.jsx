'use client'; 
import React, { useContext } from 'react';
import { FaCartShopping } from "react-icons/fa6";
import Image from 'next/image';
import './card.css';
import { useRouter } from "next/navigation"; 
import { MyContext } from '@/app/libs/context/MyContext';  // Contextni import qilish

const Card = ({ product }) => {
  const { setSelectedProduct, setCarts } = useContext(MyContext);  // Contextdan funksiyalarni olish
  const router = useRouter();

  const handleProductClick = (product) => {
    setSelectedProduct(product);  // Mahsulotni contextda saqlash
    router.push(`/products/${product?.slug}`);  // Mahsulot sahifasiga o'tish
  };

  const handleAddToCart = (product) => {
    setCarts(prevCarts => [...prevCarts, product]);  // Cartga mahsulot qo'shish
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
      <button 
        className='btn_toCart' 
        onClick={(e) => {
          e.stopPropagation();  
          handleAddToCart(product);  
        }}
      >
        <FaCartShopping />
      </button>
    </div>
  );
};

export default Card;
