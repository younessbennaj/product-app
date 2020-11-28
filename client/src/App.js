import React, { useState, useEffect } from 'react';

import axios from "axios";

//Import des composants 
import ProductDetails from "./components/ProductDetails";
import ProductForm from "./components/ProductForm";

function App() {

  const [phones, setPhones] = useState([]);

  useEffect(() => {
    axios.get("/api/phones")
      .then(response => {
        setPhones(response.data);
      })
  }, []);
  return (
    <div>
      <h1>Hello World !!</h1>
      {/* ProductList */}
      <div>
        <ul>
          {phones.map(phone => {
            return (
              <li key={phone._id}>
                <div>
                  <img src="https://via.placeholder.com/150x150" alt={`image of ${phone.name}`} />
                </div>
                <div>
                  <h2>{phone.name}</h2>
                  <p>${phone.price}</p>
                  <button>Details</button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      {/* ProductDetails */}
      {phones.length && <ProductDetails productId={phones[2]._id} />}
      {/* ProductForm */}
      <ProductForm mode="create" />
      {/* ProductModal */}
      <div>
        {phones.length && <ProductForm mode="edit" productId={phones[0]._id} />}
      </div>
    </div>
  );
}

export default App;
