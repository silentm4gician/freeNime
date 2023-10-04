import { useNavigate } from 'react-router-dom'

const Card = ({anime, isRecent}) =>
{
    const navigate = useNavigate()
    
    const watch =(e)=>
    {
        localStorage.removeItem('watching')
        localStorage.setItem('watching',e.target.value)
        navigate("/watch/"+anime.episodeId)
    }

    const info =(e)=>
    {
        localStorage.removeItem('watching')
        localStorage.setItem('watching',e.target.value)
        navigate("/info/"+anime.id)
    }

    return (
    <main className='box-out'>
        {
            isRecent
                ?
                <div className='boxRecents'>
                    <div key={anime.id} className='cardRecents'>
                        <h1>{anime.title}</h1>
                        <img src={anime.image} alt={anime.title}/>
                        <h4>EPISODE {anime.episodeNumber}</h4>
                        <footer>
                            <button value={anime.id} onClick={watch}>watch</button>
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
                            <button value={anime.id} onClick={info}>info</button>
                        </footer>
                    </div>
                </div>
        }
    </main>
    )
}

export default Card