
import { StoreContext } from "../context/store.context";
import { useContext } from "react";
import { Link } from "react-router-dom";


function CartPage() {

    const {cartArray, setCartArray} = useContext(StoreContext)

    const removeFromCart = (productToRemove) => {
        setCartArray(cartArray.filter(product => product !== productToRemove))
    }

    let totalPrice = 0

    return (
        <main>
            <h1 className="cart-header">Here's what's in your cart!</h1>
            <div className='cart-organizer'>
            {cartArray.length && cartArray.map((singleProduct) => {
                totalPrice += singleProduct.product.price * singleProduct.quantity;
                return (
                    <div className='cart-info-organizer cart-background' key={singleProduct._id}>
                        <img className='cart-img-size' src={singleProduct.product.img} alt="pic" />
                    <div className="cart-item-info">
                        <h3 className='cart-rug-name'>Name: {singleProduct.product.name}</h3>
                        <h3 className='cart-rug-dimensions'>Dimensions: {singleProduct.product.dimensions}</h3>
                        <h3 className='cart-rug-price'>Price: ${singleProduct.product.price}</h3>
                        <h3 className="cart-qty">Quantity: {singleProduct.quantity}</h3>
                        <button className="cart-remove-btn" onClick={() => removeFromCart(singleProduct)}>Remove</button>
                    </div>
                    </div> 
                )
            })}
            </div>
            <div className="cart-total-checkout-background">
            <h2 className="cart-total">Sub Total: ${totalPrice}</h2>
            <Link to='/checkout' className="cart-checkout">Proceed To Checkout</Link>
            </div>
        </main>
    )
}

export default CartPage;