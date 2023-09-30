import { useNavigate } from 'react-router-dom'

const Card = ({anime, isRecent}) =>
{
    const navigate = useNavigate()

    return (
    <main className='box-out'>
        {
            isRecent
                ?
                <div className='box'>
                    <div key={anime.id} className='card'>
                        <h1>{anime.title}</h1>
                        <img src={anime.image} alt={anime.title}/>
                        <h4>EPISODE N°{anime.episodeNumber}</h4>
                        <footer>
                            <button onClick={()=>navigate("/watch/"+anime.episodeId)}>watch</button>
                        </footer>
                    </div>
                </div>
                :
                <div className='box'>
                    <div key={anime.id} className='card'>
                        <h1>{anime.title}</h1>
                        <img src={anime.image} alt={anime.title}/>
                        <h4>{anime.releaseDate}</h4>
                        <p>{anime.subOrDub}</p>
                        <footer>
                            <button onClick={()=>navigate("/info/"+anime.id)}>info</button>
                        </footer>
                    </div>
                </div>
        }
    </main>
    )
}

export default Card