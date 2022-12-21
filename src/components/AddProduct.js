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
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/products/add`, {
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
        <div className='form-background'>

            <h1 className="add-header">Add products</h1>
            
            <form onSubmit={handleFormSubmit} className="form-organizer">

                <label>Image: </label>
                <input value={img} onChange={updateImg} className="img-bar" />

                <label>Name: </label>
                <input value={name} onChange={updateName} className="name-bar" />

                <label>Dimensions: </label>
                <input value={dimensions} onChange={updateDimensions} className="dim-bar" />

                <label>Price: </label>
                <input value={price} onChange={updatePrice} className="price-bar" />

                <button className='add-btn'>Add Product</button>

            </form>
        </div>
    )
}

export default AddProduct;