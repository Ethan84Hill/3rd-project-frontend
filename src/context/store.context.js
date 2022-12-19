import { useState, useEffect, createContext } from "react";
import axios from "axios";


const API_URL='http://localhost:3001'

const StoreContext = createContext();

function StoreWrapper(props) {
    const [cartArray, setCartArray] = useState([])


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