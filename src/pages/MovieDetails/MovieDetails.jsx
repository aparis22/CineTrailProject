import axios from 'axios'
import {useContext, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
// import Genres from './../../components/Genres/Genres';
// import Ratings from './../../components/Ratings/Ratings';
import { ThemeContext } from '../../context/ThemeContext';
// import Review from './../../components/Review/Review'
import './MovieDetails.css'

function MovieDetails({baseUrl, apiKey}) {
    const {movieid} = useParams();
    const [videoLink, setVideoLink] = useState('')
    const [MovieDetails, setMovie] = useState([])

    useEffect(() => {
        axios.get(`${baseUrl}/movie/${movieid}?api_key${apiKey}`)
        .then(res => {
            setMovie(res.data.results)
        })
        .catch(err=>console.log(err))

        axios.get(`${baseUrl}/movie/${movieid}videos?api_key=${apiKey}&language=en-US`)
        .then(res => {
            console.log(res.data)
            const youtubeLink = res.data.results.filter(item => item.site === "YouTube" && item.type === "Trailer")
            setVideoLink(youtubeLink[0]?.key)
        })
        .catch(err=>console.log(err))
    }, [movieid])

  return (
    <div className={darkMode ? 'movie-details-container' : 'movie-details-container details-light'}>
    {
        videoLink ?
        <div className='trailer-container'>
            <ReactPlayer className='trailer-player' url={`youtube.com/watch?v=${videoLink}`} />
        </div>
        :
        <div className='trailer-container-blank' style={{
            backgroundImage: `url("${imageBaseUrl}${movie?.backdrop_path}")`,
            backgroundSize: 'cover',
            backgroundPosition: "center"
        }}><p>No trailers released yet!</p>
        </div>
    }
    </div>
  )
}

export default MovieDetails