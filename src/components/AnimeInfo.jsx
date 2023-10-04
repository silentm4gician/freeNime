import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Search from './Search'
import Loading from './Loading'
import useLoad from '../hooks/useLoad'

const AnimeInfo = () => 
{
  const {id} = useParams()
  const anime = useFetch('info/'+id)
  const navigate = useNavigate()
  const loading = useLoad()

  return (
    <>
    {loading && <Loading/>}
      <Search/>
      <main className='i-container'>
        <div className='info'>
          <div className='desc'>
            <h3>{anime?.title} ({anime?.releaseDate})</h3>
            <img src={anime?.image} alt={anime?.title}/>
            <h6>{anime?.genres.map(gen=><p className='genres' key={gen}>{gen+' '}</p>)}</h6>
            <h5>{anime?.type} - {anime?.status} - {anime?.totalEpisodes} Episodes</h5>
            <p>{anime?.description}</p>
          </div>
          <div className='underInfo'>
              <h4>EPISODES</h4>
            <ul>
              {anime?.episodes?.map(ep=>
              <li key={ep.id}>Episode {ep.number} ➡️ <button onClick={()=>navigate('/watch/'+ep.id)}>watch now</button></li>)}
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}

export default AnimeInfo