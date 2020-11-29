import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//Redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import store from './store';

//CSS kickstart fourni par Material UI pour une base du style
import CssBaseline from '@material-ui/core/CssBaseline';

//Provider fourni par Material UI pour passer le thème au travers de l'arbre de composant
import { ThemeProvider } from '@material-ui/core/styles';

//Material UI Theme
import theme from './theme';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
