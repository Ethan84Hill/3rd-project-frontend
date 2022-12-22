import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import AddProductPage from './pages/AddProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import EditProductPage from './pages/EditProductPage';
import IsAnon from './components/IsAnon';
import IsPrivate from './components/IsPrivate';

import './App.css';
import './Cart.css'

function App() {
  return (
    <div>
    <Navbar />

    <Routes>
      <Route path="/" element={ <HomePage />} /> 
      <Route path="/signup" element={ <IsAnon> <SignupPage /> </IsAnon> } />
      <Route path="/login" element={ <IsAnon> <LoginPage /> </IsAnon> } />
      {/* <Route path="/products" element={ <ProductsPage /> } /> */}
      <Route path="/products/add" element={ <AddProductPage /> } />
      <Route path="/products/:productId" element={ <EditProductPage /> } />
      <Route path="/cart" element={ <CartPage /> } />
      <Route path="/checkout" element={ <CheckoutPage /> } />
    </Routes>
    </div>
  );
}

export default App;
