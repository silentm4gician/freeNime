import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import useEpisode from '../hooks/useEpisode'
import ReactPlayer from 'react-player'
import Search from './Search'
import Loading from './Loading'
import useLoad from '../hooks/useLoad'

const Watch = () =>
{
    const {epID} = useParams()
    const episode = useEpisode(epID)
    const link = 'watch/'+epID
    const list = useFetch(link)
    const ep = list?.sources.find(obj=>obj.quality.includes('1080'))
    const loading = useLoad()

    const prev =()=>
    {
        window.location.replace('/watch/'+episode.prev)
    }
    const info =()=>
    {
        window.location.replace('/info/'+localStorage.getItem('watching'))
    }
    const download =()=>
    {
        window.location.href = list.download
    }
    const next =()=>
    {
        window.location.replace('/watch/'+episode.next)
    }
    
    return (
        <>
        {loading && <Loading/>}
        <main>
            <Search/>
            <div className='caption'>
                <h3>{epID.toUpperCase()}</h3>
            </div>
            <div className='videoBox'>
                <ReactPlayer 
                className = 'video'
                url={ep?.url}
                playing
                controls
                width={720}
                height={480}
                ></ReactPlayer>
            </div>
        </main>
            <div className='underVid'>
                <div className='underVidButtons'>
                <button style={episode.prev.includes('0')?{display:'none'}:null} onClick={prev}>⬅️ previous</button>
                <button onClick={info}>anime info</button>
                <button onClick={download}>download episode</button>
                <button style={episode.next.includes(episode.episodes + 1)?{display:'none'}:null} onClick={next}>next ➡️</button>
                </div>
            </div>
        </>
    )
}

export default Watch