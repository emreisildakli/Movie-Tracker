import { useCollection} from '../hooks/useCollection'
import Avatar from './Avatar'
// styles
import './OnlineUsers.css'

export default function OnlineUsers(){
  const { documents, error} = useCollection('users')
  return (
    <div className='online-users'>
      <h3>All Users</h3>
      {error && <p className='error'>{error}</p>}
      <ul className='online-users-list'>
        {documents && documents.map(user => (
          <li key={user.id}>
            <div className="user-item">
              {user.online && <div className='online-status'></div> }
              <span>{user.displayName}</span>
              <Avatar src={user.photoURL}/>
            </div>
          </li>

        ))}
      </ul>
    </div>
  )
}
