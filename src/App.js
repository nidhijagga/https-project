import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import MovieForm from './components/MovieForm';


function App() {
  const [movie ,setmovie] =useState([])
  const [isLoading,setisLoading]=useState(false)
  const [error,seterror]=useState(null)


  
  
  const fetchHandler = useCallback(async ()=>{
    setisLoading(true)
    seterror(null)
    
    try{
    const response=  await fetch('https://swapi.py4e.com/api/films/')
      if (!response.ok) {
        throw new Error('Something went wrong ....Retrying')
        
      }
    
      const data = await response.json()
      
          const maindata = data.results.map(item=>{
            return{
              id:item.episode_id,
              title:item.title,
              openingText:item.opening_crawl,
              releaseDate:item.release_date
    
            }
          })
          setmovie(maindata)
          setisLoading(false)

    }catch(error){
      seterror(error.message)
      setisLoading(false)
    }
    },[])
    useEffect(()=>{fetchHandler()},[fetchHandler])

    let content =<p>No Movie Found</p>

    if (movie.length>0) {
      content=<MoviesList movies={movie} />
    }

    if (error) {
      content = <p>{error}</p>
    }

    if (isLoading) {
      content = <p>Loading....</p>
    }
    
  
  
  
  return (
    <React.Fragment>
      <section>
        <MovieForm />
        <button onClick={fetchHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;