'use client';

import './details.css';
import { useParams } from 'next/navigation';
import { useContext } from 'react';
import { MyContext } from '@/app/libs/context/MyContext';

const ProductDetails = () => {
    const { selectedProduct } = useContext(MyContext);
    const { slug } = useParams(); // URL-dan slug olamiz

    // Mahsulotni topish
    const product = selectedProduct;
    
    // Agar mahsulot topilmasa yoki slug mos kelmasa, xato xabarini ko'rsatish
    if (!product || product.slug !== slug) {
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
            <h1 className="product-title">{product.name}</h1>
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
                    <button className="btn-add-to-cart">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
