import React, { useState } from 'react';

const ProductForm = ({ mode, productId }) => {

    let productModel = {
        name: "",
        price: 0,
        rating: 0,
        warranty_years: 0,
        avaible: true
    }

    const [product, setProduct] = useState(productModel);

    /*
        Si on passe un productId via les props du composant, alors on va récupérer 
        les données du produit pour pré-remplir le formulaire dans le cas de la modification
        d'un produit existant 
    */
    if (productId) {
        console.log(productId);
    }

    function handleChange() {

    }
    return (
        <div>
            <h1>{mode === "create" ? "Create a new product" : "Update your product"}</h1>
            <form>
                <div>
                    <label htmlFor="name">name</label>
                    <input onChange={handleChange} type="text" name="name" id="name" value={product.name} />
                </div>
                <div>
                    <label htmlFor="price">price</label>
                    <input onChange={handleChange} type="number" name="price" id="price" value={product.price} />
                </div>
                <div>
                    <label htmlFor="rating">rating</label>
                    <select name="rating" id="rating" defaultValue={product.rating}>
                        {[0, 1, 2, 3, 4, 5].map(rate => {
                            return <option key={rate} value={rate}>{rate}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor="warranty_years">price</label>
                    <input type="number" name="warranty_years" id="warranty_years" />
                </div>
                <fieldset>
                    <legend>Select a stock status:</legend>

                    <div>
                        <input type="radio" id="avaible" name="stock" value="true" />
                        <label htmlFor="avaible">avaible</label>
                    </div>

                    <div>
                        <input type="radio" id="out_of_stock" name="stock" value="false" />
                        <label htmlFor="out_of_stock">out of stock</label>
                    </div>

                </fieldset>
                <input type="submit" value={mode === "create" ? "add product" : "update product"} />
            </form>
        </div>
    );
}

export default ProductForm;