import { useState, useEffect, createContext } from "react";
import axios from "axios";


const API_URL='http://localhost:3001'

const StoreContext = createContext();

function StoreWrapper(props) {
    const [cartArray, setCartArray] = useState([])

    const setProducts = () => {
        if (!JSON.parse(localStorage.getItem("cart"))) {
          localStorage.setItem("cart", JSON.stringify([]));
        }
      };
      setProducts();
      let localCart = JSON.parse(localStorage.getItem("cart"));
    
      useEffect(() => {
        //turn it into js
        // localCart = JSON.parse(localCart);
        //load persisted cart into state if it exists
        if (localCart.length) {
            setCartArray(localCart)
        };
      }, []);


    // let thisCart = JSON.parse(localStorage.getItem('Cart'))


    // useEffect(() => {
    //     console.log('this is the cart', thisCart)
    //     if (!thisCart) {
    //         localStorage.setItem('Cart', JSON.stringify(cartArray))
    //     } else {
    //         setCartArray(thisCart)
    //     }
    //     // localStorage.clear()
    // }, [])


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