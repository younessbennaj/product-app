import React, { useEffect } from 'react';

//Redux 
import { connect } from 'react-redux';

//Action
import { getProducts } from "../actions";

//Material UI
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

//Components
import Price from "./Price";
import StyledRouterLink from "./StyledRouterLink";

const ProductList = ({ getProducts, data }) => {
    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div>
            <ul style={{ listStyle: 'none' }}>
                {data.length && data.map(phone => {
                    return (
                        <li key={phone._id}>
                            <Box display="flex" bgcolor="white" p={3} boxShadow={2} my={3} borderRadius={8}>
                                <Box borderRadius={16} style={{ overflow: 'hidden' }}>
                                    <img src="https://via.placeholder.com/150x150" alt={`image of ${phone.name}`} />
                                </Box>
                                <Box display="flex" flexDirection="column" px={4}>
                                    <Box fontWeight="fontWeightMedium" fontSize={22} py={1} lineHeight="normal">
                                        <p style={{ margin: '0' }}>{phone.name}</p>
                                    </Box>
                                    <Price>{phone.price}</Price>
                                    <Button variant="contained" color="primary" style={{ width: 'max-content' }}>
                                        <StyledRouterLink url={`/product/${phone._id}`}>Details</StyledRouterLink>
                                    </Button>
                                </Box>
                            </ Box>
                        </li>
                    )
                })}
            </ul>
            <Box textAlign="center">
                <Button variant="contained" color="primary"><StyledRouterLink url="/create">Create a product</StyledRouterLink></Button>
            </Box>
        </div>
    );
}

const mapStateToProps = (state) => {
    const { data } = state;
    return { data };
}

// export default ProductList;

export default connect(mapStateToProps, {
    getProducts
})(ProductList);