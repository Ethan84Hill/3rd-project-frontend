import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct(props) {
  const [price, setPrice] = useState("");
  

  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {           
    const storedToken = localStorage.getItem('authToken');                       
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products/${productId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        const oneProduct = response.data;
        setPrice(oneProduct.price);
      })
      .catch((error) => console.log(error));
    
  }, [productId]);

  const handleFormSubmit = (e) => {                    
    e.preventDefault();
    const storedToken = localStorage.getItem('authToken');
    const requestBody = { price };
 
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/products/${productId}`, requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        
        navigate('/')
      });
  };
  
  return (
    <div className='form-background'>
      <h3>Edit Price</h3>

      <form onSubmit={handleFormSubmit} className="form-organizer">
        <label>Price: </label>
        <input
          type="text"
          name="title"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="price-bar"
        />
        
        

        <button className='add-btn'>Confirm</button>
      </form>
    </div>
  );
}

export default EditProduct;