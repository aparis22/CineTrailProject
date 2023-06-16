import { useState } from 'react'
import './Homepage.css'
import Slider from '../../components/Slider/Slider'

function Homepage({apiKey, baseUrl}) {
  const [popularMovies, setPopularMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])

  return (
    <div className='homepage-container'>
      <Slider apiKey={apiKey} baseUrl={baseUrl} />

      <div className='movies-wrapper'>
        <div className='popular-container'>
          <h3 className='popular-title'>Popular Movies</h3>
          <div className='popular-cards-wrapper'>

          </div>
        </div>

        <div className='top-rated-container'>
          <h3>Top Rated Movies</h3>
          <div className='top-rated-cards-wrapper'>

          </div>
        </div>

      </div>

    </div>
  )
}

export default Homepage