import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import MovieForm from './components/MovieForm';


function App() {
  const [movie ,setmovie] =useState([])
  const [isLoading,setisLoading]=useState(false)
  const [error,seterror]=useState(null)


  
  
  const fetchHandler = useCallback(async (movie)=>{
    setisLoading(true)
    seterror(null)
    
    try{
    const response=  await fetch('https://react-project-b57c5-default-rtdb.firebaseio.com/movie.json')
      if (!response.ok) {
        throw new Error('Something went wrong ....Retrying')
        
      }
    
      const data = await response.json()
      console.log(data)

      const Loadeddata =[]

      for(const key in data){
        Loadeddata.push(
          {
            id:key,
            title:data[key].title,
            openingText:data[key].openingText,
            data: new Date(data[key].date)
          }
        )
      }
      
      
         
          setmovie(Loadeddata)
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
    
  
  async function Movieformhandler(movie){
    const response=  await fetch('https://react-project-b57c5-default-rtdb.firebaseio.com/movie.json',{
      method:'POST',
      body:JSON.stringify(movie),
      headers:{
        'Content-Type': 'application/json'
      }}
    )

    const data = await response.JSON()
  }


  const deleteMovieHandler = async (id) => {
    
    console.log({ id });
    await fetch(
      `https://react-project-b57c5-default-rtdb.firebaseio.com/movie/${id}.json`,
      {
        method: "DELETE",
        body: JSON.stringify(id),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    fetchHandler();
  };
  return (
    <React.Fragment>
      <section>
      <MoviesList deleteRequested = {deleteMovieHandler} movies = {movie}/>
      
        <MovieForm handlemovieForm ={Movieformhandler}  />
       <button onClick={deleteMovieHandler}>Delete Movie</button>
        <button onClick={fetchHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
      
    </React.Fragment>
  );
}

export default App;