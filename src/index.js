import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/auth';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/reset.css';
import { SearchProvider } from './context/search';
import { CartProvider } from './context/cart';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  // <React.StrictMode>
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>

  // </React.StrictMode>


);


