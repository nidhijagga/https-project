import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';


function App() {
  const [movie ,setmovie] =useState([])
  const [isLoading,setisLoading]=useState(false)
  async function fectchhandler(){
    setisLoading(true)
  const response=  await fetch('https://swapi.py4e.com/api/films/')
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
    }
  
  
  return (
    <React.Fragment>
      <section>
        <button onClick={fectchhandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading&&<MoviesList movies={movie} />}
        {isLoading&&<p>Loading.......</p>}
      </section>
    </React.Fragment>
  );
}

export default App;