import React, { useState, useEffect } from 'react';

import axios from "axios";

import * as Yup from 'yup';

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
    //La note doit être comprise entre 0 et 5
    rating: Yup.number()
        .min(0, 'The rate must be comprised between 0 and 5')
        .max(5, 'The rate must be comprised between 0 and 5')
        .required('Required'),
    warranty_years: Yup.number()
        .required('Required'),
    avaible: Yup.boolean()
        .required('Required')
});

const ProductForm = ({ mode, productId }) => {

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
        <div>
            <h1>{mode === "create" ? "Create a new product" : "Update your product"}</h1>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    name: product.name ? product.name : "",
                    price: product.price ? product.price : 0,
                    rating: product.rating ? product.rating : 0,
                    warranty_years: product.warranty_years ? product.warranty_years : 0,
                    avaible: product.avaible ? product.avaible : true
                }}
                validationSchema={ProductSchema}
                onSubmit={product => {

                    product = { ...product, avaible: product.avaible === "true" ? true : false };

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

                    console.log(config);
                }}
            >
                {({ values }) => (
                    <Form>
                        <div>
                            <label htmlFor="name">name</label>
                            <Field type="text" name="name" id="name" />
                        </div>
                        <div>
                            <label htmlFor="price">price</label>
                            <Field type="number" name="price" id="price" />
                        </div>
                        <div>
                            <label htmlFor="rating">rating</label>
                            <Field as="select" name="rating" id="rating">
                                {[0, 1, 2, 3, 4, 5].map(rate => {
                                    return <option key={rate} value={rate}>{rate}</option>
                                })}
                            </Field>
                        </div>
                        <div>
                            <label htmlFor="warranty_years">warranty</label>
                            <Field type="number" name="warranty_years" id="warranty_years" />
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