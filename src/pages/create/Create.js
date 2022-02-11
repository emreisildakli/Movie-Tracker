import './Create.css'
import { useState, useEffect} from 'react'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'
import {useCollection} from '../../hooks/useCollection'
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'

const categories = [
  {value : 'horror', label: 'Horror'},
  {value : 'action', label: 'Action'},
  {value : 'comedy', label: 'Comedy'},
  {value : 'fantasy', label: 'Fantasy'},
  {value : 'drama', label: 'Drama'},
  {value : 'romance', label: 'Romance'}
]

export default function Create(){
  const [formError, setFormError] = useState(null)

  const [movieName, setMovieName]= useState('')
  const [category, setCategory]= useState('')
  const [duration, setDuration]= useState(0)
  const [usersList, setUsersList]= useState([])
  const [assignedUsers, setAssignedUsers] = useState([])

  const { user } = useAuthContext()
  const {documents:users} = useCollection('users')
  const navigate = useNavigate()
  const {addDocument, response} = useFirestore('movies')



  useEffect(()=>{

    if(users){
      let options= []
      options = users.map((user)=>{
        return  {value: user, label: user.displayName}
      })
      setUsersList(options)
    }

  }, [users])


  const handleSubmit = async (e)=>{
    e.preventDefault()

    if(!category){
      setFormError('Please choose a category')
      return
    }
    if(assignedUsers.length<1){
      setFormError('Please choose a user to watch with')
      return
    }

    const createdBy= {
      displayName : user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    const assignedUsersList = assignedUsers.map(user=>{
      return {
        displayName : user.value.displayName,
        photoURL: user.value.photoURL,
        id: user.value.id
      }
    })

    const document = {
      movieName,
      category: category.value,
      duration,
      assignedUsersList,
      createdBy,
      comments: [],
      completed: false
    }

    await addDocument(document)
  }

  // redirect user to dashboard after adding document is completed
  
  useEffect(()=>{
    if(response.success){
      navigate('/')
    }
  }, [response.success, navigate])
  

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Movie Name:</span>
        <input 
          type="text" 
          onChange={(e)=> setMovieName(e.target.value)}
          value={movieName}
          required
        />
      </label>

      <label>
        <span>Category:</span>
        <Select 
          onChange= {(option=> setCategory(option))}
          options={categories} 
        />
      </label>

      <label>
        <span>Duration(min):</span>
        <input 
          type="number" 
          onChange={(e)=> setDuration(e.target.value)}
          value={duration}
          required
        />
      </label>

      <label>
        <span>Watch with:</span>
        <Select 
          onChange= {(option=> setAssignedUsers(option))}
          options={usersList} 
          isMulti
        />
      </label>

      <button className="btn">Add Movie</button>
      {formError &&  <p className="error">{formError}</p> } 
    </form>
  )
}
