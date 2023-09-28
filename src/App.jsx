import './App.css'
import Card from './components/Card'
import { useState } from "react"

function App()
{
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
      <Card/>
    </>
  )
}

export default App
