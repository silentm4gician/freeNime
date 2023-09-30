import { Link, useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Search from './Search'

const AnimeInfo = () => 
{
  const {id} = useParams()
  const anime = useFetch('info/'+id)

  return (
    <>
      <Search/>
      <main className='i-container'>
        <div className='info'>
          <h3>{anime?.title}</h3>
          <img src={anime?.image} alt={anime?.title}/>
          <p>{anime?.description}</p>
            <ul>
              {anime?.episodes?.map(ep=>
              <li key={ep.id}>episode nr° {ep.number} || <Link to={"/watch/"+ep.id}>watch now</Link></li>)}
            </ul>
        </div>
      </main>
    </>
  )
}

export default AnimeInfo