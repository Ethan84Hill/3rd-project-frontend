
import { StoreContext } from "../context/store.context";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function CartPage() {

    const {cartArray, setCartArray} = useContext(StoreContext)

    const removeFromCart = (productToRemove) => {
        setCartArray(cartArray.filter(product => product !== productToRemove))
    }

    let totalPrice = 0

    
    return (
        <main>
            <h1 className="cart-header">Here's what's in your cart!</h1>
            <div className='product-organizer'>
            {cartArray.map((singleProduct) => {
                totalPrice += singleProduct.product.price * singleProduct.quantity;
                return (
                    <div className='product-info-organizer product-background' key={singleProduct._id}>
                        <img className='img-size' src={singleProduct.product.img} alt="pic" />
                        <h3 className='rug-name'>Name: {singleProduct.product.name}</h3>
                        <h3 className='rug-dimensions'>Dimensions: {singleProduct.product.dimensions}</h3>
                        <h3 className='rug-price'>Price: ${singleProduct.product.price}</h3>
                        <h3>Quantity: {singleProduct.quantity}</h3>
                        <button onClick={() => removeFromCart(singleProduct)}>Remove</button>
                    </div> 
                )
            })}
            </div>
            <h2>Sub Total: {totalPrice}</h2>
            <Link to='/checkout' >Proceed To Checkout</Link>
        </main>
    )
}

export default CartPage;