import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
 
const API_URL = "http://localhost:3001";
 
 
function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
 
  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);
  
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  
 
  
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
 
    axios.post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();  
        navigate('/');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };
 
  
  return (
    <div className="SignupPage login-background">
      <h1>Log In</h1>
 
      <form onSubmit={handleSignupSubmit} className="login-organizer">
        <label>Email:</label>
        <input 
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
          className="email-bar"
        />
 
        <label>Password:</label>
        <input 
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
          className="password-bar"
        />
 
        <button className="login-btn" type="submit">Login</button>
      </form>
 
      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
 
    
    </div>
  )
}
 
export default LoginPage;