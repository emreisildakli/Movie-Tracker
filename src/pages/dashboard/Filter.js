//styles
import './Filter.css'

const filterList = ['all', 'mine', 'horror', 'action', 'comedy', 'fantasy', 'drama', 'romance']

export default function Filter({currentFilter, changeFilter}){

    const handleClick = (newFilter)=>{
        changeFilter(newFilter)
    }
  return (
    <div className="movie-filter">
        <span>Filter by:</span>
        <nav className='filter-nav'>
            {filterList.map(filter =>(
                <button 
                    key={filter} 
                    onClick={()=>handleClick(filter)}
                    className={currentFilter === filter ? 'active' : ''}
                >
                    {filter}
                </button>
            ))}

            

        </nav>
    </div>
  )
}
