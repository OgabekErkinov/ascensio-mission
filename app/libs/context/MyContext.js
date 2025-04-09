'use client'
import React, { createContext, useState, useEffect } from 'react';

const MyContext = createContext();

const MyProvider = ({ children }) => {

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [carts, setCarts] = useState([]);
  const [inputValue, setInputValue] = useState('')
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('/products.json')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

useEffect(() => {
  const savedCarts = localStorage.getItem('carts');
  if (savedCarts) {
    setCarts(JSON.parse(savedCarts));
  }
}, []);

useEffect(() => {
  localStorage.setItem('carts', JSON.stringify(carts));
}, [carts]);



  const store = {
    selectedProduct,
    setSelectedProduct,

    carts,
    setCarts,

    inputValue,
    setInputValue,

    products

  };

  return (
    <MyContext.Provider value={store}>
      {children}
    </MyContext.Provider>
  );
};

export { MyProvider, MyContext };
