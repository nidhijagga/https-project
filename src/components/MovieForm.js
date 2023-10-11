import React, { useState } from 'react'

function MovieForm() {
    const [title,settitle]=useState('')
    const [openingText,setopeningText]=useState('')
    const [date,setdate]=useState('')
    
    const handleform =(e)=>{
        e.preventDefault()

        const data = {
            title:title,
            openingText:openingText,
            date:new Date(date)
        }

        console.log(data)
        settitle('')
        setdate('')
        setopeningText('')
    }
  return (
    <div style={{margin
    :'30px',padding:'10px'}}>
    <form onSubmit={handleform}>
    
      <label style={{marginBottom:'10px'}}>Title</label>
      <input type='text' value={title} onChange={(e)=>{settitle(e.target.value)}}/>
      <label>Opening Text</label>
      <input type='text' value={openingText} onChange = {(e)=>{setopeningText(e.target.value)}}/>
      <label>Release Date</label>
      <input type='date' value={date} onChange = {(e)=>{setdate(e.target.value)}} />
      <button type='submit'>Add movie</button>
    </form>
    </div>
  )
}

export default MovieForm;