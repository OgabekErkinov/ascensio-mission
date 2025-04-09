'use client';

import './details.css';
import { useParams, useRouter } from 'next/navigation';
import { useContext } from 'react';
import { MyContext } from '@/app/libs/context/MyContext';

const ProductDetails = () => {
    const { selectedProduct, setCarts, carts } = useContext(MyContext);
    const { slug } = useParams(); 
    const router = useRouter();

    const product = selectedProduct;

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

        router.push('/carts');
    };
    
    if (!product) {
        return (
            <div className="error-container">
                <h1>Product Not Found</h1>
                <p>The product you're looking for with slug: <strong>{slug}</strong> does not exist.</p>
                <p>Please check the URL or <a href="/">go back to the homepage</a>.</p>
            </div>
        );
    }

    return (
        <div className="product-detail-container">
            <h1 className="product-title">{product?.name}</h1>
            <div className="product-info">
                <div className="product-image">
                    <img src={product?.image} alt={product?.name} />
                </div>
                <div className="product-description">
                    <h2>Details</h2>
                    <p><strong>Color:</strong> {product?.properties?.color}</p>
                    <p><strong>Storage:</strong> {product?.properties?.storage}</p>
                    <p><strong>Battery:</strong> {product?.properties?.battery}</p>
                    <p><strong>Price:</strong> {product.price}$</p>
                    <p><strong>Description:</strong> {product.description}</p>
                    <button className="btn-add-to-cart" onClick={() => handleAddCart(product)}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
