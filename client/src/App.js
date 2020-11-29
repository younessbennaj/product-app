import React, { useState, useEffect } from 'react';

import axios from "axios";

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

//React router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink
} from "react-router-dom";

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
    <Router>
      <Container maxWidth="sm">
        <h1>Hello World !!</h1>

        <Switch>
          {/* Route principale de l'application path: "/" */}
          <Route path="/" exact>
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
                        <button>
                          <RouterLink style={{ textDecoration: 'none' }} to={`/product/${phone._id}`}>Details</RouterLink>
                        </button>
                      </div>
                    </li>
                  )
                })}
              </ul>
              <div>
                <Button variant="contained" color="primary"><RouterLink to="/create">Create a product</RouterLink></Button>
              </div>
            </div>
          </Route>
          {/* Route pour la page de détails d'un produit en fonction de l'Id path : "/product/:id" */}
          <Route path="/product/:productId">
            {/* ProductDetails */}
            {phones.length && <ProductDetails productId={phones[2]._id} />}
          </Route>
          <Route path="/create">
            {/* ProductForm */}
            <ProductForm mode="create" />
          </Route>
          {/* ProductModal */}
          <Route path="/edit/:productId">
            <div>
              {phones.length && <ProductForm mode="edit" productId={phones[0]._id} />}
            </div>
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
