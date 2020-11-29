import axios from "axios";

export const getProducts = () => async dispatch => {
    axios.get("/api/phones")
        .then(response => {
            dispatch({ type: 'INITIALIZE', payload: response.data });
        })
}