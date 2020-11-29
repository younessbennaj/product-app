import React, { useState, useEffect } from 'react';

import axios from "axios";

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
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
import Price from "./components/Price";
import StyledRouterLink from "./components/StyledRouterLink";

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
            <div>
              <ul style={{ listStyle: 'none' }}>
                {phones.map(phone => {
                  return (
                    <li key={phone._id}>
                      <Box display="flex" bgcolor="white" p={3} boxShadow={2} my={3} borderRadius={8}>
                        <Box borderRadius={16} style={{ overflow: 'hidden' }}>
                          <img src="https://via.placeholder.com/150x150" alt={`image of ${phone.name}`} />
                        </Box>
                        <Box display="flex" flexDirection="column" px={4}>
                          <Box fontWeight="fontWeightMedium" fontSize={22} py={1} lineHeight="normal">
                            <p style={{ margin: '0' }}>{phone.name}</p>
                          </Box>
                          <Price>{phone.price}</Price>
                          <Button variant="contained" color="primary" style={{ width: 'max-content' }}>
                            <StyledRouterLink url={`/product/${phone._id}`}>Details</StyledRouterLink>
                          </Button>
                        </Box>
                      </ Box>
                    </li>
                  )
                })}
              </ul>
              <Box textAlign="center">
                <Button variant="contained" color="primary"><StyledRouterLink url="/create">Create a product</StyledRouterLink></Button>
              </Box>
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
