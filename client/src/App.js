import React, { useState, useEffect } from 'react';

import axios from "axios";

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

//React router
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


//Import des composants 
import ProductList from "./components/ProductList";
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
        <Box fontWeight="fontWeightBold" textAlign="center">
          <h1>#ProductApp</h1>
        </Box>

        <Switch>
          {/* Route principale de l'application path: "/" */}
          <Route path="/" exact>
            {/* ProductList */}
            <ProductList phones={phones} />
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
