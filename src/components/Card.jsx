import { useNavigate } from 'react-router-dom'

const Card = ({anime, isRecent}) =>
{
    const navigate = useNavigate()

    return (
    <main>
        <div className='box'>
            <div key={anime.id} className='card'>
                <h1>{anime.title}</h1>
                <img src={anime.image} alt={anime.title}/>
                <h4>EPISODE N°{anime.episodeNumber}</h4>
                <button onClick={()=>navigate("/watch/"+anime.episodeId)}>watch</button>
            </div>
        </div>
    </main>
    )
}

export default Card