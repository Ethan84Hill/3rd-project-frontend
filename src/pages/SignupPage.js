import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
 
const API_URL = "http://localhost:3001";
 
 
function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
 
  const navigate = useNavigate();
  
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
 
  
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };
 
    axios.post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };
 
  
  return (
    <div className="SignupPage signin-background">
      <h1>Sign Up</h1>
 
      <form onSubmit={handleSignupSubmit} className="signin-form" >
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
 
        <label>Name:</label>
        <input 
          type="text"
          name="name"
          value={name}
          onChange={handleName}
          className="name-bar"
        />
 
        <button className="signup-btn" type="submit">Sign Up</button>
      </form>
 
      { errorMessage && <p className="error-message">{errorMessage}</p> }
 
      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  )
}
 
export default SignupPage;