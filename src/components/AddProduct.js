import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AddProduct() {

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [dimensions, setDimensions] = useState('')
    const [price, setPrice] = useState('')
    const [img, setImg] = useState('')

    const updateName = e => setName(e.target.value)
    const updateDimensions = e => setDimensions(e.target.value)
    const updatePrice = e => setPrice(e.target.value)
    const updateImg = e => setImg(e.target.value)

    const handleFormSubmit = e => {
        e.preventDefault();
        const storedToken = localStorage.getItem('authToken');
        axios.post('http://localhost:3001/products/add', {
            img: img,
            name: name,
            dimensions: dimensions,
            price: price
        }, 
        { headers: { Authorization: `Bearer ${storedToken}` } }
        )
        .then(axiosResponse => {
            console.log(axiosResponse.data)
            navigate('/products')
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            
            <form onSubmit={handleFormSubmit}>

                <label>Image: </label>
                <input value={img} onChange={updateImg} />

                <label>Name: </label>
                <input value={name} onChange={updateName} />

                <label>Dimensions: </label>
                <input value={dimensions} onChange={updateDimensions} />

                <label>Price: </label>
                <input value={price} onChange={updatePrice} />

                <button>Add Product</button>
            </form>
        </div>
    )
}

export default AddProduct;