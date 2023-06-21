import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchResults({movie}) {
    const navigate = useNavigate()
    const [imageError, setImageError] = useState(false)

    const handleNavigation = () => {
        setQuery('')
        navigate(`/moviedetails/${movie.id}`)
    }
  return (
    <div className='search-results-item' onClick={handleNavigation}>
        <p>{movie.title}</p>
    </div>
  )
}

export default SearchResults