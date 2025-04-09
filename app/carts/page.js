'use client'
import { useContext } from 'react';
import { MyContext } from '@/app/libs/context/MyContext';
import './carts.css';
import { useRouter } from 'next/navigation';

const Carts = () => {
    const router = useRouter()
  const { carts, setCarts, setSelectedProduct} = useContext(MyContext);

  const handleClick = (product) => {
    setSelectedProduct(product)
    router.push(`/products/${product?.slug}`);
  }

  const handleIncrease = (product) => {
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

  const handleDecrease = (product) => {
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

  const handleRemove = (id) => {
    const filteredCarts = carts.filter(item => item.product.id !== id);
    setCarts(filteredCarts);
  };

  const totalPrice = carts?.reduce(
    (total, item) => total + item?.product?.price * item?.product?.quantity,
    0
  );

  return (
    <div className='container'>
      <h2 className='heading'>Shopping Cart </h2>
      

      {carts.length === 0 && <p className="empty">Your cart is empty.</p>}

      {carts?.map(item => (
        <div key={item?.product?.id} className='card' onClick = {()=>handleClick(item?.product)}>
          <img src={item?.product?.image} alt={item?.product?.name} className='card-image' />
          <div className='details'>
            <h3>{item?.product?.name}</h3>
            <p>${item?.product?.price} x {item?.product?.quantity}</p>
            <div className="quantity-controls">
              <button onClick={() => handleDecrease(item.product)}>-</button>
              <span>{item?.quantity}</span>
              <button onClick={() => handleIncrease(item.product)}>+</button>
            </div>
            <button onClick={() => handleRemove(item.product.id)} className="remove-btn">Remove</button>
          </div>
          <div className='price'>
            ${(item?.product?.price * item?.quantity).toFixed(2)}
          </div>
        </div>
      ))}

      {carts.length > 0 && (
        <>
          <div className='total'>
            <h3>Total:</h3>
            <p>${totalPrice.toFixed(2)}</p>
          </div>

          <button className='checkout-btn'>Checkout</button>
        </>
      )}
    </div>
  );
};

export default Carts;
