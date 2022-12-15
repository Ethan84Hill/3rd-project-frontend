import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  return (
    <div className="App">
    <Navbar />
      Welcome to my shop!

      <Routes>
      <Route path="/" element={ <HomePage />} /> 
      <Route path="/signup" element={ <SignupPage /> } />
      <Route path="/login" element={ <LoginPage /> } />
    </Routes>
    </div>
  );
}

export default App;
