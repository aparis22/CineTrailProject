import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { Link } from 'react-router-dom'
import './Header.css'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import axios from 'axios'
import SearchResults from '../SearchResults/SearchResults'


function Header({baseUrl, apiKey}) {
    const {darkMode, setDarkMode} = useContext(ThemeContext)
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        if(query.trim().length > 0) {
        axios.get(`${baseUrl}/search/movie?api_key=${apiKey}&query=${query}}`)
            .then(res => {
                setSearchResults(res.data.searchResults)
            })
        .catch(err=>console.log(err))
    }
    }, [])


    const handleTheme = () => {
      const newDarkMode = !darkMode;
      setDarkMode(newDarkMode);
      localStorage.setItem('darkMode', newDarkMode)  
    }

  return (
    <div className={darkMode? 'header-container' : 'header-container header-light'}>
        <Link className='logo' to='/'>CineTrail</Link>
        <div className='search-container'>
            <input value={query} onChange={(e) => setQuery(e.target.value)} 
            className={`search-input ${query && "input-active"} ${!query && !darkMode && query}`} 
            placeholder='Search movies...'/>

            {query.trim() !== "" && (
                <div className='search-results-container'>
                    {searchResults.map((movie) => {
                        return <SearchResults setQuery={setQuery} key={movie.id} movie={movie} />
                    })}
                </div>
            )}

        </div>  

        <div className='header-buttons-container'>
            <div className='theme-button-container'>

                {
                    darkMode
                    ? <div className='theme-buttons'> 
                        <MdOutlineLightMode onClick={handleTheme} className='theme-icon'/>
                        <MdOutlineDarkMode className='theme-icon theme-icon-active'/>
                    </div>
                    : <div className='theme-buttons'>
                        <MdOutlineLightMode className='theme-icon theme-icon-active'/>
                        <MdOutlineDarkMode onClick={handleTheme} className='theme-icon'/>
                    </div>
                }
            </div>
            <div>
                <button className='create-account-btn'>Create an account</button>
            </div>
        </div>
    </div>
  )
}

export default Header