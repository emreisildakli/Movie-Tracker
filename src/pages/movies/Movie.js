import { useParams } from 'react-router-dom'
import MovieSummary from './MovieSummary'
import MovieComments from './MovieComments'
import { useDocument } from '../../hooks/useDocument'
//styles
import './Movie.css'

export default function Movie(){
  const {id} = useParams()
  const {document, error} = useDocument('movies', id)
  if(error){
    return <div>{error}</div>
  }
  if(!document){
    return <div>Loading...</div>
  }
  return (
    <div className='movie-page'>
      {document && <MovieSummary movie={document} />}
      {document && <MovieComments movie={document} />}
    </div>
  )
}

