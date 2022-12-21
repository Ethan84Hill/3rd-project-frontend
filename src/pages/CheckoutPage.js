import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { StoreContext } from "../context/store.context";
 
const API_URL = "http://localhost:3001";


function CheckoutPage() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");
    const {cartArray, setCartArray} = useContext(StoreContext)

    const navigate = useNavigate();

    const { storedToken, authenticateUser } = useContext(AuthContext);
    // console.log(storedToken)


    const handleEmail = (e) => setEmail(e.target.value);
    const handleName = (e) => setName(e.target.value);
    const handlePhoneNumber = (e) => setPhoneNumber(e.target.value);
    const handleAddress = (e) => setAddress(e.target.value);
    const handleCity = (e) => setCity(e.target.value);
    const handleState= (e) => setState(e.target.value);
    const handleZipcode = (e) => setZipcode(e.target.value);

    const handleOrderConfirm = (e) => {
        e.preventDefault();
        const requestBody = { email, name, phoneNumber, address, city, state, zipcode };
     
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/checkout`, {requestBody, cartArray}, {
            headers: {
            Authorization: `Bearer ${storedToken}`
          }})
          .then((response) => {
            console.log(response)
            console.log('hi')
            // storedToken(response.data.authToken); 
            navigate('/');
          })
          .catch((err) => {
            console.log(err)
          })
      };


    return (
        <main className="SignupPage login-background">
            <h1>Enter Your Shipping Information Here</h1>
            <form onSubmit={handleOrderConfirm} className="login-organizer">
                <label>Email:</label>
                <input 
                type="email"
                name="email"
                value={email}
                onChange={handleEmail}
                className="email-bar"
                />
 
                <label>Name:</label>
                <input 
                type="name"
                name="name"
                value={name}
                onChange={handleName}
                className="password-bar"
                />

                <label>Phone Number:</label>
                <input 
                type="number"
                name="number"
                value={phoneNumber}
                onChange={handlePhoneNumber}
                className="password-bar"
                />

                <label>Address:</label>
                <input 
                type="address"
                name="address"
                value={address}
                onChange={handleAddress}
                className="password-bar"
                />

                <label>City:</label>
                <input 
                type="name"
                name="name"
                value={city}
                onChange={handleCity}
                className="password-bar"
                />

                <label>State:</label>
                <input 
                type="name"
                name="name"
                value={state}
                onChange={handleState}
                className="password-bar"
                />

                <label>Zip Code:</label>
                <input 
                type="name"
                name="name"
                value={zipcode}
                onChange={handleZipcode}
                className="password-bar"
                />
 
                <button className="login-btn" type="submit">Confirm Order</button>
            </form>
        </main>
    )
}

export default CheckoutPage;