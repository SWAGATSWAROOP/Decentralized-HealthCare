import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './style.css';
import Home from './views/home';
import NotFound from './views/not-found';
import LoginPage from './views/Login';
import RegisterPage from './views/Register';

import './assets/assets/css/font-awesome.min.css';
import './assets/assets/css/style.css';

// Importing store
import { store } from './store/store.js';
// importing Provider from react redux
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </Router>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
