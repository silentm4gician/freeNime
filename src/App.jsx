import { useState } from 'react'
import results from './mocks/search.json'
import './App.css'

function App() {
  
  const [search,setSearch] = useState()

  const find =()=>
  {
    
  }

  

  return (
    <>
        <header>
          <form onSubmit={find}>
            <input type="text" onChange={(e)=>setSearch(e.target.value)}/>
            <button type='submit'>search</button>
          </form>
        </header>

        <main>
          <div className='box'>
            {
              results.results.map(result => 
                <div key={result.id} className='card'>
                  <h1>{result.title}</h1>
                  <p>{result.releaseDate}</p>
                  <img src={result.image} alt={result.title}/>
                  <p>{result.genres + ''}</p>
                </div>)
            }
          </div>
        </main>
    </>
  )
}

export default App
