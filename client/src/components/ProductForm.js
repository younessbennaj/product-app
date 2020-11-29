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
    avaible: Yup.boolean()
        .required('Required')
});

const ProductForm = ({ mode }) => {

    let { productId } = useParams();

    const [product, setProduct] = useState({});

    const [rating, setRating] = useState(0);

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
                    setRating(response.dat.rating);
                })
        }
    }, [productId]);

    return (
        <div>
            <h1>{mode === "create" ? "Create a new product" : "Update your product"}</h1>
            <Formik
                // enableReinitialize={true} 
                initialValues={{
                    name: product.name ? product.name : "",
                    price: product.price ? product.price : 0,
                    rating: product.rating ? product.rating : 0,
                    warranty_years: product.warranty_years ? product.warranty_years : 0,
                    avaible: product.avaible ? product.avaible : true
                }}
                validationSchema={ProductSchema}
                onSubmit={product => {

                    product = { ...product, rating, avaible: product.avaible === "true" ? true : false };
                    console.log(product);
                    // var config = {
                    //     //changer la methode de la requête dynamiquement en fonction du mode
                    //     method: mode === "create" ? 'post' : 'put',
                    //     url: `/api/phones${mode === "create" ? '' : `/${productId}`}`,
                    //     data: product
                    // };

                    // axios(config)
                    //     .then(function (response) {
                    //         console.log(response.data);
                    //     })
                    //     .catch(function (error) {
                    //         console.log(error);
                    //     });

                    // console.log(config);
                }}
            >
                {({ values, handleChange, handleBlur }) => (
                    <Form>
                        <Box my={3}>
                            <label style={{ display: "none" }} htmlFor="name">name</label>
                            <Field component={() => <TextField variant="outlined" label="Name" />} type="text" name="name" id="name" />
                        </Box>
                        <Box my={3}>
                            <label style={{ display: "none" }} htmlFor="price">price</label>
                            <Field component={() => <TextField variant="outlined" label="Price" />} type="number" name="price" id="price" />
                        </Box>
                        <div>
                            <label style={{ display: "none" }} htmlFor="rating">rating</label>
                            <Field as="select" name="rating" id="rating">
                                {[0, 1, 2, 3, 4, 5].map(rate => {
                                    return <option key={rate} value={rate}>{rate}</option>
                                })}
                            </Field>
                            {/* <Rating name="rating" value={rating} onChange={(e, newValue) => setRating(newValue)} /> */}
                        </div>
                        <div>
                            <label style={{ display: "none" }} htmlFor="warranty_years">warranty</label>
                            <Field component={() => <TextField variant="outlined" label="Warranty" />} type="number" name="warranty_years" id="warranty_years" />
                        </div>
                        <fieldset>
                            <legend>Select a stock status:</legend>

                            <div>
                                <label >
                                    avaible
                                    <Field type="radio" name="avaible" value="true" />
                                </label>
                            </div>

                            <div>
                                <label >
                                    out of stock
                                    <Field type="radio" name="avaible" value="false" />
                                </label>
                            </div>

                        </fieldset>
                        <input type="submit" value={mode === "create" ? "add product" : "update product"} />
                    </Form>

                )}

            </ Formik>
        </div>
    );
}

export default ProductForm;