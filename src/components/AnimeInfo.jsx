import { Link } from 'react-router-dom'
import info from '../mocks/info.json'
const AnimeInfo = () => 
{
  return (
    <div>
      <h3>{info.title}</h3>
      <img src={info.cover} alt={info.title}/>
      <p>{info.description}</p>
      <ul>
        {info.episodes.map(ep=>
        <li key={ep.id}>{ep.number} || {ep.title} || 
        <Link
        to={'/watch'}>watch now</Link></li>)}
      </ul>
    </div>
  )
}

export default AnimeInfo