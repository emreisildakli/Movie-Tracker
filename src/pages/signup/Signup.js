import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
//styles
import './Signup.css'

export default function Signup(){
  const [email, setEmail]= useState('')
  const [password, setPassword]= useState('')
  const [displayName, setDisplayName]= useState('')
  const [thumbnail, setThumbnail]= useState(null)
  const [thumbnailError, setThumbnailError]= useState(null)
  const { signup, error}=  useSignup()
  
  const handleSubmit= (e)=>{
    e.preventDefault()
    signup(email, password, displayName, thumbnail)
   
  }

  const handleFileChange= (e)=>{
    setThumbnail(null)
    let selected = e.target.files[0]

    if(!selected){
      setThumbnailError('You must select a file')
      return
    }
    if(!selected.type.includes('image')){
      setThumbnailError('You must select an image type file')
      return
    }
    if(selected.size>100000){
      setThumbnailError('File size is too big! Pick a smaller sized file')
      return
    }
    setThumbnailError(null)
    setThumbnail(selected)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>

      <label>
        <span>email:</span>
        <input 
          required
          type="email" 
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input 
          required
          type="password" 
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>display name:</span>
        <input 
          required
          type="text" 
          onChange={(e)=>setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>profile thumbnail</span>
        <input 
          required
          type="file"
          onChange={handleFileChange}
        />
        {thumbnailError && <p className='error'>{thumbnailError}</p> }
      </label>
      <button className="btn">Signup</button>
      {error && <p>{error}</p> }
    </form>
  )
}
