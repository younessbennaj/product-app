import React, { useState, useEffect } from 'react';
import axios from "axios";

const ProductDetails = ({ productId }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`/api/phones/${productId}`)
            .then(response => {
                console.log(response.data);
                setProduct(response.data);
            })
    }, [productId]);
    function handleEditClick() {
        console.log('edit');
    }
    function handleDeleteClick() {
        console.log('delete');
    }
    return (
        <>
            {product &&
                <div>
                    <h1>Poduct Details</h1>
                    <div>
                        <img src="https://via.placeholder.com/450x200" alt="product image" />
                    </div>
                    <div>
                        {/* Product information here */}
                        <div>
                            <p>{product.name}</p>
                            <span>{product.rating}</span>
                            <p>{product.price}</p>
                        </div>
                        <div>
                            <p>{product.available ? 'avaible' : 'out of stock'}</p>
                        </div>
                    </div>
                    <div>
                        {/* Action button here */}
                        <button onClick={handleEditClick}>Edit</button>
                        <button onClick={handleDeleteClick}>Delete</button>
                    </div>
                </div>
            }
        </>

    );
}

export default ProductDetails;