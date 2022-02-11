import { useState } from 'react'
import './Dashboard.css'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import MovieList from '../../components/MovieList'
import Filter from './Filter'

export default function Dashboard(){
  const {user} = useAuthContext()
  const {documents: movies, error} = useCollection('movies', undefined, ['createdAt', 'desc'])
  const [currentFilter, setCurrentFilter]= useState('all')

  const changeFilter = (filter)=>{
    setCurrentFilter(filter)
  }

  const filteredMovies = movies ? movies.filter((movie)=>{
      switch(currentFilter){
        case 'all':
          return true
        case 'mine':
          return movie.createdBy.id === user.uid
        case 'drama':
        case 'horror':
        case 'action':
        case 'comedy':
        case 'fantasy':
        case 'romance':
          return movie.category === currentFilter
        default:
          return true
      }
  }): null


  

  return (
    <div>
      <h2 className="title">Dashboard</h2>
      {error && <p>{error}</p> }
      {movies && <Filter changeFilter={changeFilter} currentFilter={currentFilter}/>}
      {filteredMovies && <MovieList movies={filteredMovies} />}

    </div>
  )
}
