import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function DeleteProduct({productId, setProductsArray, productsArray}) {

    const navigate = useNavigate()
    // const { productId } = useParams();

    const [name, setName] = useState('')
    const [dimensions, setDimensions] = useState('')
    const [price, setPrice] = useState('')


    const handleItemDelete = e => {
        e.preventDefault();
        const storedToken = localStorage.getItem('authToken');
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/products/${productId}`, {
            name: name,
            dimensions: dimensions,
            price: price
        }, 
        { headers: { Authorization: `Bearer ${storedToken}` } }
        )
        .then(axiosResponse => {
            let newProducts = productsArray.filter((el) => 
                el._id !== axiosResponse.data._id
            )
            setProductsArray(newProducts)
            console.log('This is the delete response', axiosResponse.data)
            // navigate('/products')
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <p onClick={handleItemDelete}>Remove</p>
        </div>
    )
}

export default DeleteProduct;