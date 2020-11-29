import React, { useState, useEffect } from 'react';

import axios from "axios";

import * as Yup from 'yup';

import {
    useParams
} from "react-router-dom";

//Material UI 
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';

//Formik
import { Formik, Form, Field } from 'formik';

//Schema du produit pour la validation de formulaire avec Formil et Yup 
const ProductSchema = Yup.object({
    //On attend un nom de produit correct
    name: Yup.string()
        .min(2, 'The name is too short')
        .max(50, 'The name is too long')
        .required('Required'),
    //Le prix ne doit pas être en dessous de 0 euros
    price: Yup.number()
        .min(0, 'The price must be greater than 0')
        .required('Required'),
    rating: Yup.number()
        .min(0, 'The rating must be between 0 and 5')
        .max(5, 'The rating must be between 0 and 5')
        .required('Required'),
    warranty_years: Yup.number()
        .required('Required'),
    available: Yup.boolean()
        .required('Required')
});

const ProductForm = ({ mode }) => {

    let { productId } = useParams();

    const [product, setProduct] = useState({});

    /*
        Si on passe un productId via les props du composant, alors on va récupérer 
        les données du produit pour pré-remplir le formulaire dans le cas de la modification
        d'un produit existant 
    */
    useEffect(() => {
        if (productId) {
            axios.get(`/api/phones/${productId}`)
                .then(response => {
                    setProduct(response.data);
                })
        }
    }, [productId]);

    return (
        <Box display="flex" flexDirection="column">
            <h1>{mode === "create" ? "Create a new product" : "Update your product"}</h1>

            <Formik
                enableReinitialize={true}
                initialValues={{
                    name: product.name ? product.name : "",
                    price: product.price ? product.price : "",
                    rating: product.rating ? product.rating : 0,
                    warranty_years: product.warranty_years ? product.warranty_years : 0,
                    available: product.available ? product.available : true
                }}
                validationSchema={ProductSchema}
                onSubmit={product => {
                    product = { ...product, rating: parseFloat(product.rating), available: product.available === "true" ? true : false };

                    var config = {
                        //changer la methode de la requête dynamiquement en fonction du mode
                        method: mode === "create" ? 'post' : 'put',
                        url: `/api/phones${mode === "create" ? '' : `/${productId}`}`,
                        data: product
                    };

                    axios(config)
                        .then(function (response) {
                            console.log(response.data);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }}
            >
                {({ values, handleChange, handleBlur }) => (
                    <Form style={{
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <Box my={3} display="flex" flexDirection="column" >
                            <label style={{ display: "none" }} htmlFor="name">name</label>
                            <TextField type="text" id="name" name="name" variant="outlined" label="Name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
                        </Box>
                        <Box my={3} display="flex" flexDirection="column">
                            <label style={{ display: "none" }} htmlFor="price">price</label>
                            <TextField type="number" id="price" name="price" variant="outlined" label="Price" value={values.price} onChange={handleChange} onBlur={handleBlur} />
                        </Box>
                        <Box my={3} display="flex" flexDirection="column">
                            <Box ml={1} my={2} color="darkgrey">
                                <label htmlFor="rating">Rating</label>
                            </Box>
                            <Rating id="rating" name="rating" value={parseFloat(values.rating)} onChange={handleChange} onBlur={handleBlur} />
                        </Box>
                        <Box my={3}>
                            <label style={{ display: "none" }} htmlFor="warranty_years">warranty</label>
                            <TextField type="number" id="warranty_years" name="warranty_years" variant="outlined" label="Warranty" value={values.warranty_years} onChange={handleChange} onBlur={handleBlur} />
                        </Box>
                        <Box as="fieldset" p={4}>
                            <Box fontWeight="fontWeightRegular" fontSize={16} pb={3}>
                                <legend>Select a stock status:</legend>
                            </Box>

                            <Box my={2}>
                                <label>
                                    <Field type="radio" name="available" value="true" />
                                    Available
                                </label>
                            </Box>

                            <Box my={2}>
                                <label >
                                    <Field type="radio" name="available" value="false" />
                                    Out of stock
                                </label>
                            </Box>

                        </Box>
                        <Button type="submit" variant="contained" color="primary">{mode === "create" ? "add product" : "update product"}</Button>
                    </Form>

                )}

            </ Formik>
        </Box>
    );
}

export default ProductForm;