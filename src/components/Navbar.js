import { Link, useNavigate } from "react-router-dom";
import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'
 
function Navbar() {

  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <nav className="nav-bar">
    
        <div className="left-side-nav">
        <Link to="/" className="home-link">Home</Link>
        </div>
        

        <div className="right-side-nav">
        <Link to="/login" className="login-link">Login</Link>

        <Link to="/signup" className="signup-link">Signup</Link>


        <Link onClick={logOutUser} className="logout-link">Logout</Link>
        <span className="hello-user"> Hello there, {user && user.name}!</span>
        </div>
 
    </nav>
  );
}
 
export default Navbar;