import { useContext } from "react"
import Context from "../context/Context"
import { useNavigate } from "react-router-dom"

const Search = () => 
{
    const {setSearch, search} = useContext(Context)
    const navigate = useNavigate()

    const find =(e)=>
    {
        e.preventDefault()
        navigate('/results/'+search)
    }

    return (
        <header className="search">
            <form onSubmit={find}>
                <input type="text" onChange={(e)=>setSearch(e.target.value)}/>
                <button type='submit'>search</button>
            </form>
        </header>
    )
}

export default Search