import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import AddProduct from '../components/AddProduct';
import DeleteProduct from '../components/DeleteProduct';
import { StoreContext } from '../context/store.context';

function ProductsPage() {

    const [productsArray, setProductsArray] = useState([])
    const [cartQuantity, setCartQuantity] = useState(1)
    const {cartArray, setCartArray} = useContext(StoreContext)

    const storedToken = localStorage.getItem("authToken");

    useEffect(() => {
        axios.get('http://localhost:3001/products', 
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
                        <h3 className='rug-name'>Name: {singleProduct.product.name}</h3>
                        <h3 className='rug-dimensions'>Dimensions: {singleProduct.product.dimensions}</h3>
                        <h3 className='rug-price'>Price: ${singleProduct.product.price}</h3>
                        <button className='delete-btn'><DeleteProduct productId={singleProduct.product._id} setProductsArray={setProductsArray} productsArray={productsArray} /></button>
                        <button onClick={() => AddToCart(index)} className='add-btn'>Add to cart</button>
                        <p>Quantity: {singleProduct.quantity}</p>
                        <button onClick={() => IncreaseQuantity(index)}>+</button>
                        <button onClick={() => DecreaseQuantity(index)}>-</button>
                    </div> 
                )
            })}

        </div>
        </div>
            
    )
}

export default ProductsPage;