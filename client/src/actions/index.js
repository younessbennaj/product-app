import axios from "axios";

export const getProducts = () => async dispatch => {
    axios.get("/api/phones")
        .then(response => {
            dispatch({ type: 'INITIALIZE', payload: response.data });
        })
}

export const addProduct = (product, mode, productId) => async dispatch => {

    product = { ...product, rating: parseFloat(product.rating), available: product.available === "true" ? true : false };

    var config = {
        //changer la methode de la requête dynamiquement en fonction du mode
        method: mode === "create" ? 'post' : 'put',
        url: `/api/phones${mode === "create" ? '' : `/${productId}`}`,
        data: product
    };

    axios(config)
        .then(function (response) {
            dispatch({ type: mode === "create" ? 'ADD_PRODUCT' : 'EDIT_PRODUCT', payload: response.data });
        })
        .catch(function (error) {
            console.log(error);
        });
}