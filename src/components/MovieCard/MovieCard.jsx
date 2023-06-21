import { useState } from 'react'
import './MovieCard.css'
import { Link } from 'react-router-dom'
import Ratings from '../Ratings/Ratings'


function MovieCard({data, imageUrl, radius, height, width, cardStyle}) {

  const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL
  const [rating, setRating] = useState()

  const imageStyle ={
    backgroundImage: `url(${imageBaseUrl}${imageUrl})`,
    width: width,
    height: height,
    backgroundSize: 'cover',
    backgroundPosition: "center",
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    borderRadius: radius,
    boxShadow: 'none'
  }

  return (
      <Link to={data.id ? `/moviedetails/${data.id}` : `/moviedetails${data?.tmdb_id}`} className={cardStyle}>
        <div style={imageStyle}>
          <div className='movie-info-top'>
            <Ratings movieRating = {rating}/>
          </div>

        <div className='movie-info-bottom'>
            <p>{data?.title}</p>
            <p>Rating: {rating}</p>
          </div>
          </div>

          {
            cardStyle === "top-rated-card"
            ? <p>{data?.title}</p>
            : null
          }

      </Link>
  )
}

export default MovieCard