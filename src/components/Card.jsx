import { useNavigate } from 'react-router-dom'
import results from '../mocks/search.json'

const Card = () =>
{
    const navigate = useNavigate()
    return (
        <main>
        <div className='box'>
        {
            results.results.map(result => 
            <div key={result.id} className='card'>
                <h1>{result.title}</h1>
                <p>{result.releaseDate}</p>
                <img src={result.image} alt={result.title}/>
                <p>{result.genres + ' '}</p>
                <button onClick={()=>navigate("/info")}>watch</button>
            </div>)
        }
        </div>
    </main>
    )
}

export default Card