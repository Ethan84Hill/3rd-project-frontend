import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import AddProductPage from './pages/AddProductPage';
import CartPage from './pages/CartPage';

import './App.css';

function App() {
  return (
    <div>
    <Navbar />

    <Routes>
      <Route path="/" element={ <HomePage />} /> 
      <Route path="/signup" element={ <SignupPage /> } />
      <Route path="/login" element={ <LoginPage /> } />
      <Route path="/products" element={ <ProductsPage /> } />
      <Route path="/products/add" element={ <AddProductPage /> } />
      <Route path="/cart" element={ <CartPage /> } />
    </Routes>
    </div>
  );
}

export default App;
