import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom";


import DeleteProduct from '../components/DeleteProduct';
import EditProduct from '../components/EditProduct';
import { StoreContext } from '../context/store.context';
import { AuthContext } from '../context/auth.context';
import EditProductPage from './EditProductPage';

function ProductsPage() {

    const { user } = useContext(AuthContext)

    const [productsArray, setProductsArray] = useState([])
    // const [cartQuantity, setCartQuantity] = useState(1)

   

    const {cartArray, setCartArray} = useContext(StoreContext)

    const storedToken = localStorage.getItem("authToken");

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/products`, 
        { headers: { Authorization: `Bearer ${storedToken}` } }
        )
        .then(axiosResponse => {
            console.log(axiosResponse.data)
            setProductsArray(axiosResponse.data.map((element) => ({
                product: element,
                quantity: 1
            })))
            
        })
        .catch(err => console.log(err))
    }, [])
    

    function IncreaseQuantity(index) {
        const productsArrCopy = [...productsArray]
        productsArrCopy[index].quantity ++;
        setProductsArray(productsArrCopy)
    }

    function DecreaseQuantity(index) {
        const productsArrCopy = [...productsArray]
        if(productsArrCopy[index].quantity > 0) {
            productsArrCopy[index].quantity --;
        }
        
        setProductsArray(productsArrCopy)
    }


    function AddToCart(index) {

        let newItem =  {
            product: productsArray[index].product,
            quantity: productsArray[index].quantity
        }

        setCartArray([...cartArray, newItem])

        console.log("NEW CART", cartArray)
        console.log("This is productsArray", productsArray[index])
    }
   

    return (
        <div>
        
        
        <div className='product-organizer'>
            
            {productsArray.map((singleProduct, index) => {
                return (
                    <div className='product-info-organizer product-background' key={singleProduct._id}>
                        <img className='img-size' src={singleProduct.product.img} alt="pic" />
                        <h3 className='rug-name'>{singleProduct.product.name}</h3>
                        <h3 className='rug-dimensions'>Dimensions: {singleProduct.product.dimensions}</h3>
                        <h3 className='rug-price'>Price: ${singleProduct.product.price}</h3>
                        { user && user.email === "asdf@asdf.com" ? <button className='delete-btn'><DeleteProduct productId={singleProduct.product._id} setProductsArray={setProductsArray} productsArray={productsArray} /></button> : null }
                        { user && user.email === "asdf@asdf.com" ? <Link to={`/products/${singleProduct.product._id}`} className="edit-btn">Edit Price</Link> : null }
                        <button onClick={() => AddToCart(index)} className='add-btn'>Add to cart</button>
                        <div className='btn-quantity-organizer'>
                        <h3 className='quantity-number'>Quantity: {singleProduct.quantity}</h3>
                        <div className='button-organizer'>
                        <button className='btn-increase' onClick={() => IncreaseQuantity(index)}>+</button>
                        <button className='btn-decrease' onClick={() => DecreaseQuantity(index)}>-</button>
                        </div>
                        </div>
                    </div> 
                )
            })}

        </div>
        </div>
            
    )
}

export default ProductsPage;