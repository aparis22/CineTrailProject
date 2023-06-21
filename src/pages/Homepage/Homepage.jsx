import { useEffect, useState } from 'react'
import './Homepage.css'
import Slider from '../../components/Slider/Slider'
import axios from 'axios'
import MovieCard from '../../components/MovieCard/MovieCard'


function Homepage({apiKey, baseUrl}) {
  const [popularMovies, setPopularMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])

  useEffect(()=>{
    axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}`)
     .then(res=>{
      //  console.log(res.data.results)
       setPopularMovies(res.data.results)
     })
     .catch(err=>console.log(err))
  }, [])

  useEffect(()=>{
    axios.get(`${baseUrl}/movie/top_rated?api_key=${apiKey}&page=1`)
     .then(res=>{
      //  console.log(res.data.results)
       setTopRatedMovies(res.data.results.slice(0,10))
     })
     .catch(err=>console.log(err))
  }, [])

  return (
    <div className='homepage-container'>
      <Slider apiKey={apiKey} baseUrl={baseUrl} />

      <div className='movies-wrapper'>
        <div className='popular-container'>

          <h3 className='popular-title'>Popular Movies</h3>
          <div className='popular-cards-wrapper'>
            {
              popularMovies?.map(movie=>{
                return <MovieCard radius={"16px"} cardStyle={"popular-card"} width={"200px"} height={"300px"} 
                imageUrl={movie.poster_path} key={movie.id} data={movie} />
              })
            }
          </div>
        </div>

        <div className='top-rated-container'>
          <h3>Top Rated Movies</h3>
          <div className='top-rated-cards-wrapper'>
            {
              topRatedMovies?.map(movie=>{
                return <MovieCard radius={"8px"} cardStyle={"top-rated-card"} width={"200px"} height={"100px"} 
                imageUrl={movie.backdrop_path} key={movie.id} data={movie} />
              })
            }
          </div>
        </div>

      </div>

    </div>
  )
}

export default Homepage