import { useState, useEffect, createContext } from "react";
import axios from "axios";
import useLocalStorage from "react-use-localstorage";


const API_URL='http://localhost:3001'

const StoreContext = createContext();

function StoreWrapper(props) {
    
    const [cartArray, setCartArray] = useState(JSON.parse(localStorage.getItem("cart")) || [])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartArray));

        console.log("These are the items in localStorage:", cartArray);
    }, [cartArray])


    return (
        <StoreContext.Provider value={{ cartArray, setCartArray }} >
            {props.children}
        </StoreContext.Provider>
    )

}

export {
    StoreContext,
    StoreWrapper
}