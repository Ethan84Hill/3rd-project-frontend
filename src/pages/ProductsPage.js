import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AddProduct from '../components/AddProduct';
import DeleteProduct from '../components/DeleteProduct';

function ProductsPage() {

    const [productsArray, setProductsArray] = useState([])

    const storedToken = localStorage.getItem("authToken");

    useEffect(() => {
        axios.get('http://localhost:3001/products', 
        { headers: { Authorization: `Bearer ${storedToken}` } }
        )
        .then(axiosResponse => {
            console.log(axiosResponse.data)
            setProductsArray(axiosResponse.data)
        })
        .catch(err => console.log(err))
    }, [])


    return (
        <div>
        
        <h1 className='products-header'>products page</h1>
        
        <div className='product-organizer'>
            
            {productsArray.map(singleProduct => {
                return (
                    <div className='product-info-organizer' key={singleProduct._id}>
                        <img className='img-size' src={singleProduct.img} alt="pic" />
                        <h3 className='rug-name'>Name: {singleProduct.name}</h3>
                        <h3 className='rug-dimensions'>Dimensions: {singleProduct.dimensions}</h3>
                        <h3 className='rug-price'>Price: {singleProduct.price}</h3>
                        <button className='delete-btn'><DeleteProduct productId={singleProduct._id} setProductsArray={setProductsArray} productsArray={productsArray} /></button>
                    </div> 
                )
            })}

        </div>
        </div>
            
    )
}

export default ProductsPage;