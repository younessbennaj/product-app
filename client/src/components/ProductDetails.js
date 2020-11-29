import React, { useState, useEffect } from 'react';
import axios from "axios";

//Material UI
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';

//React router
import {
    useParams,
    Link
} from "react-router-dom";

//Import des composants
import Price from "./Price";
import StyledRouterLink from "./StyledRouterLink";

const ProductDetails = () => {

    let { productId } = useParams();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`/api/phones/${productId}`)
            .then(response => {
                console.log(response.data);
                setProduct(response.data);
            })
    }, [productId]);

    function handleDeleteClick() {
        axios.delete(`/api/phones/${productId}`)
            .then(response => {
                console.log(response.data);
            })
    }
    return (
        <>
            {product &&
                <Box
                    display="flex"
                    bgcolor="white"
                    p={3}
                    boxShadow={2}
                    style={{ overflow: 'hidden', margin: '0 auto' }}
                    borderRadius={8}
                    flexDirection="column"
                    width="max-content"
                >
                    <h1>Poduct Details</h1>
                    <Box borderRadius={16} mx="auto" width="max-content" style={{ overflow: 'hidden', margin: '0 auto' }}>
                        <img src="https://via.placeholder.com/450x200" alt="product image" />
                    </Box>
                    <div>
                        {/* Product information here */}
                        <div>
                            <Box fontWeight="fontWeightLight" fontSize={32}>
                                <p>{product.name}</p>
                            </Box>
                            <Box>
                                <Rating name="read-only" value={parseFloat(product.rating)} readOnly />
                            </Box>
                            {/* <span>{product.rating}</span> */}
                            <Price>{product.price}</Price>
                        </div>
                        <div>
                            <Chip
                                label="Basic"
                                variant="outlined"
                                label={product.available ? 'avaible' : 'out of stock'}
                                color={product.available ? 'primary' : 'secondary'}
                            />
                        </div>
                    </div>
                    <Box mb={2} mt={4}>
                        {/* Action button here */}
                        <Button variant="contained" color="primary" style={{ marginRight: "8px" }}><StyledRouterLink url={`/edit/${product._id}`}>Edit</StyledRouterLink></Button>
                        <Button variant="outlined" color="secondary" onClick={handleDeleteClick}>Delete</Button>
                    </Box>
                </Box>
            }
        </>

    );
}

export default ProductDetails;