import React, { useState, useEffect } from 'react';

import axios from "axios";

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
                  <img src="https://via.placeholder.com/150x150" alt="product image" />
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
      <div>
        <h1>Poduct Details</h1>
        <div>
          <img src="https://via.placeholder.com/450x200" alt="product image" />
        </div>
        <div>
          {/* Product information here */}
          <div>
            <p>Name here</p>
            <span>Note here</span>
            <p>$Price here</p>
          </div>
          <div>
            <p>Avaible</p>
          </div>
        </div>
        <div>
          {/* Action button here */}
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
      {/* ProductForm */}
      <div>
        <h1>Poduct Form</h1>

        <form>
          <div>
            <label htmlFor="name">name</label>
            <input type="text" name="name" id="name" />
          </div>
          <div>
            <label htmlFor="price">price</label>
            <input type="number" name="price" id="price" />
          </div>
          <div>
            <label htmlFor="rating">rating</label>
            <select name="rating" id="rating">
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
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
          <input type="submit" value="submit" />
        </form>

      </div>
      {/* ProductModal */}
      <div>
        <h1>Poduct Modal</h1>
      </div>
    </div>
  );
}

export default App;
