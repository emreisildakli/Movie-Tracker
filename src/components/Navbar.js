import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

//styles
import './Navbar.css'
import logo from '../assets/logo.png'

export default function Navbar(){
  const { user } = useAuthContext()
  const { logout, isPending} = useLogout()
  return (
    <div className="navbar">
        <ul>
            <li className="logo">
                <img src={logo} alt="" />
                <span>Movie Tracker</span>
             </li> 
          
            {!user && (
              <>
                <li><Link to='/login'>Login</Link></li> 
                <li><Link to='/signup'>Signup</Link></li> 
              </>
            )}

          {user && (
            <li>
             {!isPending &&  <button className="btn" onClick={logout}>Logout</button> }
              {isPending &&  <button className="btn" disabled>Logging Out</button> }
            </li>
           )}
        </ul>

    </div>
  )
}
