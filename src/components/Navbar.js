import { Link } from "react-router-dom";
import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import IsPrivate from "./IsPrivate";
 
function Navbar() {

  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <nav className="nav-bar">
    
        <div className="left-side-nav">
        <Link to="/" className="home-link">Home</Link>
        </div>
        

        <div className="right-side-nav">

        <Link to="/cart" className="login-link">Cart</Link>

        {/* <Link to="/products" className="login-link">Products</Link> */}

        { user && user.email === "asdf@asdf.com" ? <Link to="/products/add" className="login-link">Add Products</Link> : null }

        { !isLoggedIn ? <Link to="/login" className="login-link">Login</Link> : null }

        { !isLoggedIn ? <Link to="/signup" className="signup-link">Signup</Link> : null }

        { isLoggedIn ? <Link onClick={logOutUser} className="logout-link">Logout</Link> : null }
        { isLoggedIn ? <span className="hello-user"> Hello there, {user && user.name}!</span> : null }
        </div>
 
    </nav>
  );
}
 
export default Navbar;