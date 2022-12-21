import { useState, useEffect, createContext } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";


const API_URL='http://localhost:3001'

const AuthContext = createContext();

function AuthProviderWrapper(props){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const storeToken = (token) => {       
        localStorage.setItem('authToken', token);
      }
      
      const storedToken = localStorage.getItem('authToken');

      const authenticateUser = () => {           
        const storedToken = localStorage.getItem('authToken');
        
        
        if (storedToken) {
          axios.get(
            `${API_URL}/auth/verify`, 
            { headers: { Authorization: `Bearer ${storedToken}`} }
          )
          .then((response) => {
            const user = response.data;    
            setIsLoggedIn(true);
            setIsLoading(false);
            setUser(user);        
          })
          .catch((error) => {        
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);        
          });      
        } else {
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);      
        }   
      }


      const removeToken = () => {                    // <== ADD
        // Upon logout, remove the token from the localStorage
        localStorage.removeItem("authToken");
      }
     
     
      const logOutUser = () => {                   // <== ADD    
        // To log out the user, remove the token
        removeToken();
        // and update the state variables    
        authenticateUser();
      }  


      useEffect(() => {                 
        authenticateUser(); 
      }, []);


    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken, storedToken, authenticateUser, logOutUser  }} >
            {props.children}
        </AuthContext.Provider>
    )

}

export {
    AuthContext,
    AuthProviderWrapper
}
