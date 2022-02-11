import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import Avatar from './Avatar'
//styles
import './Sidebar.css'
import dashboardLogo from '../assets/dashboardLogo.svg'
import createLogo from '../assets/createLogo.svg'


export default function Sidebar(){
    const { user }= useAuthContext()
  return (
    <div className='sidebar'>
      <div className="sidebar-content">
          <div className='user'>
              <Avatar src={user.photoURL}/>
              <p>Hey {user.displayName}</p>
          </div>

          <ul className='sidebar-links'>
              <li> 
                <NavLink to='/'>
                  <img src={dashboardLogo} alt="dashboard logo" />
                  <span>Dashboard</span>
                </NavLink> 
              </li>
              <li> 
                <NavLink to='/create'>
                  <img src={createLogo} alt="create logo" />
                  <span>Create</span>
                </NavLink> 
              </li>
          </ul>
        </div>
    </div>
  )
}
