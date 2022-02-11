import Avatar from '../../components/Avatar'
import { useAuthContext} from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useNavigate } from 'react-router-dom'
//styles
import './MovieSummary.css'
import Delete from '../../assets/delete.svg'

export default function MovieSummary({movie}){
  const { user } = useAuthContext()
  const {updateDocument, deleteDocument} = useFirestore('movies')
  const navigate= useNavigate()

  const handleClick = (watched)=>{
    if(watched){
      updateDocument(movie.id, {completed:true})
    }
    else{
      updateDocument(movie.id, {completed:false})
    }
    navigate('/')

  }
  const handleDelete = ()=>{
      deleteDocument(movie.id)
      navigate('/')
  }

  return (
    <div className='movie-summary'>
      <div className='movie-summary-content'>
          <h1 className="title">{movie.movieName}</h1>  
          {/* only the creator of that document can see the delete button */}
          {user.uid===movie.createdBy.id && 
          <img className='delete' src={Delete} alt="checkbox" onClick={handleDelete} />}
          <span>Created By: {movie.createdBy.displayName}</span>
          <p>Duration: {movie.duration} minutes</p>
          <p>Category: {movie.category}</p>
          <div className='assigned-to'>
                <h2 className='title'>To watch with</h2>
                <ul>
                    {movie.assignedUsersList.map((user)=>(
                        <li key={user.id}><Avatar src={user.photoURL} /></li>
                    ))}
                </ul>
              </div>
      </div> 

      {/* Show the button if user that's currently logged in is the creator of the document. Change the button depending on the completed attribute*/}
      
      {user.uid===movie.createdBy.id &&
      <>
        {movie.completed ? 
          (<button  
              onClick={()=>handleClick(false)}
              className="btn">Mark as not watched
            </button>): 
          (<button  
            onClick={()=>handleClick(true)}
            className="btn">Mark as watched
          </button>)}

      </>}
      
    </div>
   
  )
}
