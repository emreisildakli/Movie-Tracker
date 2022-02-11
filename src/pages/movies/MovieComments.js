import { useState } from 'react'
import {useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import { timestamp } from '../../firebase/config'
import Avatar from '../../components/Avatar'
import formatDistance from 'date-fns/formatDistance'

//styles
import './MovieComments.css'
import Delete from '../../assets/delete.svg'

export default function MovieComments({movie}){
    const [newComment, setNewComment] = useState('')
    const {updateDocument, error} = useFirestore('movies')
    const { user } = useAuthContext()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const commentToAdd= {
            photoURL: user.photoURL,
            displayName: user.displayName,
            createdAt: timestamp.fromDate(new Date()),
            userId: user.uid,
            content: newComment, 
            id: Math.random() // to use as key prop in listing
        }
        await updateDocument(movie.id, {comments: [...movie.comments, commentToAdd] })

        if(!error){
            setNewComment('')
        }
    }
    const handleDelete = async (deletedComment)=>{
        const updatedComments = movie.comments.filter(comment=>{
            return comment !== deletedComment
        })
        await updateDocument(movie.id, {comments: [...updatedComments]})
    }   

    
  return (
    <div className='movie-comments'>
        <h3>Movie Comments</h3>
        <ul className='comment-list'>
            {movie.comments.length>0 && movie.comments.map(comment=>(
                <li key={comment.id} className='comment-item'>
                    <div className="comment-author">
                        <Avatar src={comment.photoURL}/>
                        <span>{comment.displayName}</span>
                    </div>
                    
                    {/* don't show the delete comment button if the logged in user is not the creator of that comment */}
                   {comment.userId === user.uid && 
                   <img className='delete-comment' src={Delete} alt="delete" 
                    onClick={()=>handleDelete(comment)}/> }

                    <div className="comment-content">
                        <p className='comment-date'>{formatDistance(comment.createdAt.toDate(), new Date(),{addSuffix: true})}</p>
                        <p>{comment.content}</p>
                    </div>
                </li>
            ))}
       </ul>
        {/* comment form */}
        <form onSubmit={handleSubmit}>
            <label>
                <span>Add a comment:</span>
                <textarea 
                    required
                    type="text"
                    onChange={(e)=>setNewComment(e.target.value)} 
                    value={newComment}
                />
            </label>
            <button className="btn">Add Comment</button>
        </form>
    </div>
  )
}
