import Avatar from './Avatar'
import { Link } from 'react-router-dom'
//styles
import './MovieList.css'
import Checkbox from '../assets/checkbox.svg' 

export default function MovieList({movies}){
  return (
    <div className='movie-list'>
      {movies.length<1 && <p>There is no movie to show</p>}
      {movies && movies.map(movie => (
          <Link 
            to={`/movies/${movie.id}`} 
            key={movie.id} 
            className="movie-item"
          >
            {movie.completed && <img className='checkbox' src={Checkbox} alt="checkbox" />}
            <h1 className="title">{movie.movieName}</h1>  
            <p>Duration: {movie.duration} minutes</p>
            <div className='assigned-to'>
              <ul>
                  {movie.assignedUsersList.map((user)=>(
                      <li key={user.id}><Avatar src={user.photoURL} /></li>
                  ))}
              </ul>
            </div>

          </Link>
      ))}
    </div>
  )
}
